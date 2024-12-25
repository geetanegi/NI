import {ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {colors} from '../../../global/theme';
import Button from '../../../components/button';
import AuthHeader from '../../../components/Auth_Header';
import {useSelector} from 'react-redux';
import {View} from 'react-native-animatable';
import ProfileInput from '../../../components/profileInput';
import {syncTaskName} from '../../../utils/services/backgroundTaskEnum';
import {startBackgroundService} from '../../../utils/services/backgroundService';
import {ENUM} from '../../../utils/enum/checklistEnum';
const Profile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const profileData = useSelector(state => state.profile?.data);

  let tempLocation = '';
  if (profileData?.Location) {
    tempLocation = `${profileData?.Location?.StateData?.state}, ${profileData?.Location?.DistrictData?.district}, ${profileData?.Location?.BlockData?.block}`;
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onRefresh = React.useCallback(() => {
    console.log('on refresh called');
    startBackgroundService(syncTaskName.syncProfile);
  }, []);
  return (
    <View style={st.container}>
      <AuthHeader title={'Profile'} onBack={() => navigation.navigate('Main')} />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={st.pd20}>
          <View animation={'fadeInRight'} delay={500}>
            <ProfileInput
              label={ENUM.STATICKEYWORDS.NAME}
              // placeholder={ENUM.STATICKEYWORDS.ENTER_NAME}
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              iconName={'user'}
              value={profileData?.Name}
              editable={false}
            />
          </View>
          <View animation={'fadeInRight'} delay={1000}>
            <ProfileInput
              label={ENUM.STATICKEYWORDS.EMAIL}
              // placeholder={ENUM.STATICKEYWORDS.ENTER_EMAIL}
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              iconName={'mail'}
              value={profileData?.EmailId}
              editable={false}
            />
          </View>
          <View animation={'fadeInRight'} delay={1500}>
            <ProfileInput
              label={ENUM.STATICKEYWORDS.MOBILE_NUMBER}
              // placeholder={ENUM.STATICKEYWORDS.ENTER_MOBILE_NUMBER}
              onChangeText={text => handleOnchange(text, 'userNumber')}
              onFocus={() => handleError(null, 'userNumber')}
              iconName={'smartphone'}
              value={profileData?.PhoneNumber}
              editable={false}
            />
          </View>
          <View animation={'fadeInRight'} delay={2000}>
            <ProfileInput
              label={ENUM.STATICKEYWORDS.ROLE}
              // placeholder={ENUM.STATICKEYWORDS.ENTER_ROLE}
              onChangeText={text => handleOnchange(text, 'role')}
              onFocus={() => handleError(null, 'role')}
              iconName={'crosshair'}
              value={profileData?.Role}
              editable={false}
            />
          </View>
          {profileData?.Location && (
            <View animation={'fadeInRight'} delay={2000}>
              <ProfileInput
                label={ENUM.STATICKEYWORDS.LOCATION}
                // placeholder={ENUM.STATICKEYWORDS.ENTER_LOCATION}
                onChangeText={text => handleOnchange(text, 'location')}
                onFocus={() => handleError(null, 'location')}
                iconName={'map-pin'}
                value={tempLocation}
                editable={false}
                multiline
                inputsty={{height: 60}}
              />
            </View>
          )}
          <View style={st.pd20} animation={'fadeInRight'} delay={3000}>
            <Button
              title={ENUM.STATICKEYWORDS.CLICK_TO_CHANGE_PASSWORD}
              backgroundColor={colors.indian_red}
              color={colors.white}
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
