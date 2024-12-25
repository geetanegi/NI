import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet, Text, Pressable, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {colors, images} from '../global/theme';
import styles from '../global/styles';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/button';
import {cleanLogindata} from '../redux/reducers/Logindata';
import {clearLogin} from '../redux/reducers/Login';
import {API} from '../utils/endpoints';
import Loader from '../components/loader';
import DeviceInfo from 'react-native-device-info';
import {postAuth} from '../utils/apicalls/postApi';
import {getNoAuth} from '../utils/apicalls/getApi';
import {stopAllBackgroundServices} from '../utils/services/backgroundService';
import useNetworkStatus from '../hooks/networkStatus';
import PopUpMessage from '../components/popup';
import {getSavedChecklistbyNotStartedAndFailed} from '../redux/store/getState';
import PrivacyPolicy from '../components/PrivacyPolicy';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {environment} from '../utils/constant';

const CustomSidebarMenu = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [appVer, setAppVer] = useState();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState('');
  const [twoButton, setTwoButton] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);

  const Logindata = useSelector(state => state.profile?.data?.RoleEnum);
  const isConnected = useNetworkStatus();

  const dispatch = useDispatch();

  const LogoutHandle = () => {
    props.navigation.closeDrawer();
    let message = '';
    const checkSync = getSavedChecklistbyNotStartedAndFailed(true);
    if (checkSync?.length > 0) {
      message =
        'There are few un synced checklists in Drafts, Please review before logging out,';
    }
    openPopupMessage(
      'Logout?',
      `${message}\n Are you sure you want to logout?`,
      true,
    );
  };

  const openPopupMessage = (title, subtitle, isTwoButton) => {
    setTitle(title);
    setSubtitle(subtitle);
    setTwoButton(isTwoButton);
    setPopupMessageVisibility(true);
  };

  const logoutApiHandle = async () => {
    try {
      setIsLoading(true);
      postAuth(API.LOGOUT)
        .then(data => {
          console.log('Logout successful from server');
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          dispatch(cleanLogindata());
          dispatch(clearLogin());
          setIsLoading(false);
        });
    } catch (err) {
      console.log('Logout api catch', err);
      setIsLoading(false);
    }
  };

  const versionHandle = async () => {
    try {
      setIsLoading(true);
      getNoAuth(API.VERSION)
        .then(data => {
          setData(data);
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log('versionHandle catch', err);
      setIsLoading(false);
    }
  };

  const fetchAppVersion = async () => {
    try {
      const version = await DeviceInfo.getVersion();
      setAppVer(version);
    } catch (error) {
      console.error('Error getting app version:', error);
    }
  };

  useEffect(() => {
    versionHandle();
    fetchAppVersion();
  }, []);

  const onPopupMessageModalClick = value => {
    stopAllBackgroundServices();
    logoutApiHandle();
    setPopupMessageVisibility(value);
    setTitle('');
    setSubtitle('');
  };

  const show_alert_msg = () => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        twoButton={twoButton}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        onPressNoBtn={() => {
          setPopupMessageVisibility(false);
        }}
      />
    );
  };

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {Logindata !== 'BENEFICIARY' && (
          <DrawerItem
            key={'Feedback'}
            label={'Training Assesment'}
            labelStyle={styles.tx14}
            icon={({color}) => (
              <LinearGradient
                colors={[colors.indian_red, '#7776B6']}
                style={[styles.circle]}>
                <MaterialIcons name="feedback" size={22} color={'#fff'} />
              </LinearGradient>
            )}
            onPress={() => {
              const url = environment.feedbackUrl;
              Linking.openURL(url);
            }}
          />
        )}
      </DrawerContentScrollView>

      <View>
        <View style={[styles.align_C]}>
          <PrivacyPolicy />
          <Button
            disabled={!isConnected}
            title={'Logout'}
            backgroundColor={!isConnected ? colors.grey : colors.indian_red}
            color={colors.white}
            onPress={() => LogoutHandle()}
          />
        </View>
        <View style={[styles.mt_t10, {backgroundColor: colors.indian_red}]}>
          <View style={[styles.row, styles.justify_C]}>
            <Text style={[styles.tx14, {color: colors.white}]}>
              {' '}
              Version: {data?.env} {appVer}
              {'.'}
              {data?.apiVersion}
            </Text>
          </View>
        </View>
      </View>

      {isLoading && <Loader />}
      {show_alert_msg()}
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  imgsty: {
    width: 35,
    height: 35,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#ccc',
  },
});
