import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {colors} from '../../../global/theme';
import AuthHeader from '../../../components/Auth_Header';
import st from '../../../global/styles';
import {checkSessionState} from '../../../utils/apicalls/tokenApi';
import useNetworkStatus from '../../../hooks/networkStatus';
import PopUpMessage from '../../../components/popup';

const ViewVdo = ({navigation, route}) => {
  const [playing, setPlaying] = useState(true);
  const [sessionPopup, setSessionPopup] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [vdoId, setVdoId] = useState();
  const data = route?.params?.item;
  const isConnected = useNetworkStatus();

  const getVideoId = async data => {
    const result = data?.Url?.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const videoIdWithParams = result[2];

    if (!isConnected) {
      onPopupMessageModalClick(true);
      setTitle('No Internet Connection');
      setSubtitle(
        'Please check your Wi-Fi or mobile network connection and try again.',
      );
    } else {
      const val = await checkSessionState();
      if (val == false) {
        setSessionPopup(true);
      } else {
        setSessionPopup(false);
        if (videoIdWithParams !== undefined) {
          const cleanVideoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0];
          console.log({cleanVideoId});
          setVdoId(cleanVideoId);
        }
      }
    }
    return null;
  };

  const onPopupMessageModalClick = value => {
    setPopupMessageVisibility(value);
  };

  const show_alert_msg = value => {
    return (
      <PopUpMessage
        display={popupMessageVisibility}
        titleMsg={title}
        subTitle={subtitle}
        onModalClick={value => {
          onPopupMessageModalClick(value);
        }}
        gotoSuggestion={() => {
          setPopupMessageVisibility(false);
        }}
        twoButton={false}
        box={false}
      />
    );
  };

  useEffect(() => {
    getVideoId(data);
  }, []);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={st.flex}>
      <AuthHeader title={''} onBack={() => navigation.goBack()} />
      {sessionPopup == true && <SessionCheck />}
      <ScrollView>
        <YoutubePlayer
          height={250}
          play={playing}
          videoId={vdoId}
          onChangeState={onStateChange}
        />
        <View style={st.pd20}>
          <Text style={[st.tx18, st.mt_B, {color: colors.black}]}>
            {data?.Title}
          </Text>
          <Text style={[st.tx14, st.txAlignJ, {color: colors.black}]}>
            {data?.Description}
          </Text>
        </View>
      </ScrollView>
      {show_alert_msg()}
    </View>
  );
};

export default ViewVdo;

const styles = StyleSheet.create({});
