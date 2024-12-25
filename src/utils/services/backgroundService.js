import BackgroundService from 'react-native-background-actions';
import {syncTaskName} from './backgroundTaskEnum';
import {
  checkIfPendingSavedChecklistExists,
  checkIfImageDataExits,
  syncGetSavedChecklist,
  syncMasterChecklist,
  syncPostSavedChecklist,
  syncProfile,
  syncImage
} from './syncTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {getMasterChecklist, isUserLoggedIn} from '../../redux/store/getState';

/* ***************************/
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
const defaultDelay = 1 * 60 * 1000;
const isNotToday = date => {
  const today = new Date();
  const iDate = new Date(date);

  return (
    iDate.getDate() !== today.getDate() ||
    iDate.getMonth() !== today.getMonth() ||
    iDate.getFullYear() !== today.getFullYear()
  );
};
const checkIfTaskNotSyncedToday = async taskName => {
  let taskNameStatus = await AsyncStorage.getItem(taskName + 'Status');
  taskNameStatus = JSON.parse(taskNameStatus);
  console.log(
    'taskNameStatus?.lastSyncOn',
    taskNameStatus?.lastSyncOn,
    taskName,
  );

  if (!taskNameStatus?.lastSyncOn) return true;
  else return isNotToday(taskNameStatus?.lastSyncOn);
};
const checkIfSyncPending = async () => {
  const isSyncProfile = await checkIfTaskNotSyncedToday(
    syncTaskName.syncProfile,
  );
  const isSyncGetSavedChecklist = await checkIfTaskNotSyncedToday(
    syncTaskName.syncGetSavedChecklist,
  );
  const isSyncPostSavedChecklist = await checkIfPendingSavedChecklistExists();

  const isSyncImage =await checkIfImageDataExits();
  const isSyncPending =
    isSyncProfile || isSyncGetSavedChecklist || isSyncPostSavedChecklist || isSyncImage;
  /// check record is in redux or not-- image
  console.log('isSyncProfile', isSyncProfile);
  console.log('isSyncGetSavedChecklist', isSyncGetSavedChecklist);
  console.log('isSyncPostSavedChecklist', isSyncPostSavedChecklist);
  console.log('isSyncImage', isSyncImage);

  return isSyncPending;
};
/* ***************************/
const stopAllBackgroundServices = async () => {
  console.log('stopAllBackgroundServices Invoked');
  await BackgroundService.stop();
};

const executeTask = async taskDataArguments => {
  const {taskName} = taskDataArguments;
  console.log('taskname', taskName);
  const syncAll = taskName == syncTaskName.all;

  console.log(
    'executeTask Invoked: taskName ' + taskName == undefined ? taskName : 'ALL',
  );

  await new Promise(async resolve => {
    let isAnythingPendingForSync = false;
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log('iterating: ' + i);
      if (!isUserLoggedIn()) {
        console.log('Exit background service as user is not logged in');
        stopAllBackgroundServices();
        resolve();
        break;
      }
      const netInfoState = await NetInfo.fetch();
      if (netInfoState.isConnected) {
        try {
          let isSyncProfile = taskName == syncTaskName.syncProfile || syncAll;
          let isSyncMasterChecklist =
            taskName == syncTaskName.syncMasterChecklist || syncAll;
          let isSyncGetSavedChecklist =
            taskName == syncTaskName.syncGetSavedChecklist || syncAll;
          let isSyncPostSavedChecklist =
            taskName == syncTaskName.syncPostSavedChecklist ||
            taskName == syncTaskName.syncGetSavedChecklist ||
            syncAll;
          let isSyncImage = taskName == syncTaskName.syncImage || syncAll;
          console.log('syncnall', syncAll);
          if (isAnythingPendingForSync) {
            isSyncProfile = await checkIfTaskNotSyncedToday(
              syncTaskName.syncProfile,
            );
            isSyncGetSavedChecklist = await checkIfTaskNotSyncedToday(
              syncTaskName.syncGetSavedChecklist,
            );

            let masterChecklistCount = getMasterChecklist().length;
            if (!masterChecklistCount) isSyncMasterChecklist = true;
            else
              isSyncMasterChecklist = await checkIfTaskNotSyncedToday(
                syncTaskName.syncMasterChecklist,
              );
            isSyncPostSavedChecklist =
              await checkIfPendingSavedChecklistExists();
              let imagelistCoust = checkIfImageDataExits();
              if (!imagelistCoust) isSyncImage = true;
              else
              isSyncImage = await checkIfTaskNotSyncedToday(
                  syncTaskName.syncImage,
                );
          }
          if (isSyncMasterChecklist) {
            console.log('executing sync MasterChecklist');
            await syncMasterChecklist();
          }

          if (isSyncProfile) {
            console.log('executing sync profile');
            await syncProfile();
          }

          if (isSyncImage) {
            console.log('executing sync image');
            await syncImage();
          }

          if (isSyncPostSavedChecklist || syncAll) {
            console.log('executing sync PostSavedChecklist');
            const isSyncInProgress =
              taskName != syncTaskName.syncPostSavedChecklist ||
              isAnythingPendingForSync;
            await syncPostSavedChecklist(isSyncInProgress);
            console.log('completed sync PostSavedChecklist');
          }

          if (isSyncGetSavedChecklist) {
            console.log('executing sync GetSavedChecklist');
            await syncGetSavedChecklist();
          }

          if (await checkIfSyncPending()) {
            console.log('sync pending--------------');
            // syncAll = true;
            // taskName = syncTaskName.all;
            isAnythingPendingForSync = true;
            await sleep(defaultDelay);
          } else {
            isAnythingPendingForSync = false;
            console.log('sync completed');
            await stopAllBackgroundServices();
            resolve();
          }
        } catch (err) {
          console.log(err);
          await stopAllBackgroundServices();
          resolve();
        }
      } else {
        console.log('Internet not available');
        await sleep(defaultDelay);
      }
    }
  });
};

const startBackgroundService = async taskName => {
  console.log('startBackgroundService Invoked: taks ' + taskName);
  if (!isUserLoggedIn()) {
    console.log('Do not start background service as user is not logged in');
    stopAllBackgroundServices();
    return;
  }

  const options = {
    taskName: 'NiApp',
    taskTitle: 'NI application background sync process',
    taskDesc: 'NI application background sync process',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    // color: '#ff00ff',
    //  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      taskName: taskName,
    },
  };
  console.log('BackgroundService.isRunning()', BackgroundService.isRunning());
  if (!BackgroundService.isRunning()) {
    console.log('Starting the background service: task');
    await BackgroundService.start(executeTask, options);
  }
};

const reStartBackgroundService = async taskName => {
  console.log('reStartBackgroundService invoked');
  await stopAllBackgroundServices();
  await startBackgroundService(taskName);
};

const IsBackgroundSyncRunning = () => {
  console.log('BackgroundService.isRunning()', BackgroundService.isRunning());
  return BackgroundService.isRunning();
};

export {
  startBackgroundService,
  stopAllBackgroundServices,
  reStartBackgroundService,
  IsBackgroundSyncRunning,
};
