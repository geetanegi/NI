import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../screens/Auth/splash';
import NetworkStatus from '../components/networkInfo';

const Route = () => {
  const login_data = useSelector(state => state.login?.data);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer fallback={<ActivityIndicator />}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      {isLoading ? <Splash /> : login_data ? <HomeStack /> : <AuthStack />}
      <NetworkStatus />
    </NavigationContainer>
  );
};

export default Route;
