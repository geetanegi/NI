import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../screens/dashboard/notification';
import CustomSidebarMenu from './CustomSidebarMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Main from '../screens/dashboard/home/Main';
import Home from '../screens/dashboard/home/Main';
import {colors} from '../global/theme';
import EditProfile from '../screens/dashboard/editProfile';

import {useSelector} from 'react-redux';
import ChangePassword from '../screens/dashboard/changePassword';
import EditChecklist from '../newScreens/EditChecklist';
import SubmitdraftList from '../newScreens/SubmitdraftList/SubmitdraftList';
import {ENUM} from '../utils/enum/checklistEnum';
import SessionCheck from './SessionCheck';
import ViewVdo from '../screens/dashboard/awearnessVdo/ViewVdo';
import ViewPdf from '../screens/dashboard/IEC/ViewPdf';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AwarenessVdo from '../screens/dashboard/awearnessVdo';
import IEC from '../screens/dashboard/IEC';
import AuthHeader from '../components/Auth_Header';
import ArchiveList from '../newScreens/SubmitdraftList/ArchiveList';
import MyDashboard from '../screens/dashboard/mydashboard';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeStack = () => {
  const tour_data = useSelector(state => state.tour?.data);

  return (
    <>
      <SessionCheck />
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={tour_data ? Main : Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="editChecklist"
          component={EditChecklist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubmitdraftList"
          component={SubmitdraftList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name="Profile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SubmitdraftListStack = () => {
  const statusCheck = ENUM.Status;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SubmitdraftList"
        component={SubmitdraftList}
        options={{headerShown: false}}
        initialParams={{
          checkListStaus: statusCheck.DRAFT,
          header: statusCheck.DRAFT,
          showheader: true,
        }}
      />
      <Stack.Screen
        name="editChecklist"
        component={EditChecklist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const SubmitListStack = () => {
  const statusCheck = ENUM.Status;
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SubmitdraftList"
        component={SubmitdraftList}
        options={{headerShown: false}}
        initialParams={{
          checkListStaus: statusCheck.SUBMIT,
          header: statusCheck.HEADERSUBMIT,
          showheader: true,
        }}
      />
      <Stack.Screen
        name="editChecklist"
        component={EditChecklist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ArchiveStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ArchiveStack"
        component={ArchiveList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="editChecklist"
        component={EditChecklist}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const InformationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BCITab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BCI Products"
        component={BCITab}
        options={({route, navigation}) => ({
          headerShown: true,
          header: props => (
            <AuthHeader
              title={'BCI Products'}
              onBack={() => navigation.navigate('Main')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ViewVdo"
        component={ViewVdo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewPdf"
        component={ViewPdf}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const BCITab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: colors.indian_red,
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: colors.indian_red},
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Videos" component={AwarenessVdo} />
      <Tab.Screen name="Magazines" component={IEC} />
    </Tab.Navigator>
  );
};

const DrawerStack = () => {
  const statusCheck = ENUM.Status;
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: '#333',
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: 'Home',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="home" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={HomeStack}
      />
      {/* <Drawer.Screen
        name="MyDashboard"
        options={{
          drawerLabel: 'Dashboard',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="view-grid-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={MyDashboard}
      /> */}

      <Drawer.Screen
        name="EditProfile"
        options={{
          drawerLabel: 'Profile',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="account-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={ProfileStack}
      />
    
      <Drawer.Screen
        name="CheckList"
        initialParams={{
          checkListStaus: statusCheck.SUBMIT,
          header: statusCheck.HEADERSUBMIT,
          showheader: true,
        }}
        options={{
          drawerLabel: 'Submitted',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="wallet-outline" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={SubmitListStack}
      />

      <Drawer.Screen
        name="Draft"
        initialParams={{
          checkListStaus: statusCheck.DRAFT,
          header: statusCheck.DRAFT,
          showheader: true,
        }}
        options={{
          drawerLabel: 'Draft',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <MaterialIcons name="drafts" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={SubmitdraftListStack}
      />
        <Drawer.Screen
        name="Archive"
        options={{
          drawerLabel: 'Archive',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="archive" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={ArchiveStack}
      />

      <Drawer.Screen
        name="Information"
        options={{
          drawerLabel: 'BCI Products',
          headerShown: false,
          drawerIcon: ({color}) => (
            <LinearGradient
              colors={[colors.indian_red, '#7776B6']}
              style={styles.circle}>
              <Icon name="billiards" size={22} color={'#fff'} />
            </LinearGradient>
          ),
        }}
        component={InformationStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({
  circle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
