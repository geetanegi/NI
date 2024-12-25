import {StyleSheet, Text, Clipboard, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {colors} from '../../../global/theme';
import {Thumbnail} from 'react-native-thumbnail-video';
import {View} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import {checkSessionState} from '../../../utils/apicalls/tokenApi';
import SessionCheck from '../../../route/SessionCheck';

const VideoItem = ({item, index, onPress}) => {
  const [sessionPopup, setSessionPopup] = useState(false);

  const copyToClipboard = async () => {
    const isSessionActive = await checkSessionState();
    if (isSessionActive == false) {
      setSessionPopup(true);
    } else {
      setSessionPopup(false);
      Clipboard.setString(item?.Url);
      Toast.show('URL copied to clipboard!');
    }
  };

  return (
    <View
      key={index}
      animation={'fadeInRight'}
      delay={500}
      style={[styles.cardMags]}>
      {sessionPopup == true && <SessionCheck />}
      <View style={[st.row]}>
        <View style={st.wdh30}>
          <Thumbnail
            url={item?.Url}
            imageWidth={80}
            imageHeight={80}
            imageStyle={{borderRadius: 10}}
            containerStyle={{
              backgroundColor: '#000',
              width: 80,
              height: 80,
              borderRadius: 10,
            }}
            iconStyle={{
              width: 20,
              height: 24,
              tintColor: colors.danger,
            }}
            onError={e => console.log(e)}
            onPress={onPress}
          />
        </View>
        <View style={st.wdh70}>
          <View>
            <Text style={st.tx14} numberOfLines={1}>
              {item.Title}
            </Text>
            <Text style={[st.tx12, {opacity: 0.5}]} numberOfLines={2}>
              {item.Description}
            </Text>
          </View>
          <View style={st.align_E}>
            <TouchableOpacity style={[st.row]} onPress={copyToClipboard}>
              <Text style={[st.tx12, st.txDecor, {color: colors.green}]}>
                {'Copy Url'}
              </Text>
              <Icon
                name={'copy'}
                size={20}
                color={colors.green}
                style={st.ml_15}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  cardMags: {
    padding: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
  },
});
