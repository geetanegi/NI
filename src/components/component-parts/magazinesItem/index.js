import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {historyDownload} from '../../../utils/helperfunctions/functions';
import Loader from '../../loader';
import PopUpMessage from '../../popup';
import {View} from 'react-native-animatable';
import useNetworkStatus from '../../../hooks/networkStatus';
import {checkSessionState} from '../../../utils/apicalls/tokenApi';
import SessionCheck from '../../../route/SessionCheck';

const MagazinesItem = ({item, onClickPdf}) => {
  const isConnected = useNetworkStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionPopup, setSessionPopup] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const getpdfFile = async (title, url) => {
    if (!isConnected) {
      onPopupMessageModalClick(true);
      setTitle('No Internet Connection');
      setSubtitle(
        'Please check your Wi-Fi or mobile network connection and try again.',
      );
    } else {
      const isSessionActive = await checkSessionState();
      if (isSessionActive == false) {
        setSessionPopup(true);
      } else {
        setSessionPopup(false);
        try {
          setIsLoading(true);
          const result = await historyDownload(title, url);
          if (result) {
            setIsLoading(false);
            onPopupMessageModalClick(true);
            setTitle('Congratulations');
            setSubtitle('Pdf has been downloaded successfully');
          } else {
            setIsLoading(false);
          }
        } catch (e) {
          setIsLoading(false);
        }
      }
    }
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

  return (
    <View animation={'fadeInRight'} delay={500}>
      {sessionPopup == true && <SessionCheck />}
      <View style={[styles.cardMags]}>
        <View style={[st.row]}>
          <View style={st.wdh30}>
            <View style={styles.iconContainer}>
              <FontAwesome5
                color={colors.indian_red}
                style={{backgroundColor: colors.white}}
                name={'file-pdf-o'}
                size={25}
              />
            </View>

            <Image source={{uri: item.ThumbnailUrl}} style={st.thumbnailSty} />
          </View>
          <View style={st.wdh70}>
            <View>
              <Text style={st.tx14} numberOfLines={1}>
                {item.Title}
              </Text>
              <Text style={st.tx12} numberOfLines={2}>
                {item.Discription}
              </Text>
            </View>
            <View style={st.align_E}>
              <View style={[st.row, st.mt_t10]}>
                <TouchableOpacity
                  onPress={() => onClickPdf()}
                  style={styles.pdf_read}>
                  <Text style={[st.tx12, {color: colors.green}]}>Read Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => getpdfFile(item.Title, item.Url)}
                  style={[st.row]}>
                  <Text style={[st.tx12, st.txDecor, {color: colors.green}]}>
                    {'Download'}
                  </Text>
                  <Icon
                    name={'download'}
                    size={20}
                    color={colors.green}
                    style={st.ml_15}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default MagazinesItem;

const styles = StyleSheet.create({
  cardMags: {
    padding: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
  },
  pdf_read: {
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 3,
    marginRight: 10,
  },
  iconContainer: {position: 'absolute', top: 0, left: 1, zIndex: 999},
});
