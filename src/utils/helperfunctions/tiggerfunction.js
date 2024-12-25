import {syncTaskName} from '../../utils/services/backgroundTaskEnum';
import {reStartBackgroundService} from '../../utils/services/backgroundService';

const onLogin = async () => {
  console.log('---------tiggered function called--after login----------------');
  reStartBackgroundService(syncTaskName.all);
};

const onApplicationOpen = () => {
  reStartBackgroundService(syncTaskName.all);
  console.log(
    '------tiggerd function called----on Application Open--------------',
  );
};

const onApplicationForeground = () => {
  console.log(
    '-------tiggerd function called----on Application Foreground----------------',
  );
};

export {onLogin, onApplicationOpen, onApplicationForeground};
