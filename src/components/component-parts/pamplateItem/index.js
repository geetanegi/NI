import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {images, colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Foundation';
import {historyDownload} from '../../../utils/helperfunctions/functions';
import Loader from '../../loader';
import PopUpMessage from '../../popup';

const PamplateItem = ({item, onClickPdf}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessageVisibility, setPopupMessageVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');



  const getpdfFile = async (title, url) => {
    try {
      setIsLoading(true);
      const result = await historyDownload(title, url);
      console.log({magazine_screendata: result?.data});
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
    <View style={[st.mt_B, {marginRight: 15, maxWidth: '45%'}]}>
      <View style={[st.row]}>
        <View style={st.wdh40}>
          <Image source={{uri: item.thumbnail}} style={st.pamphlateSty} />
        </View>
        <View style={[st.ml_15, st.wdh60]}>
          <Text style={st.tx14} numberOfLines={2}>{item.title}</Text>
          <View style={[st.mt_t10]}>
            <TouchableOpacity
              onPress={() => {
                onClickPdf();
              }}
              style={styles.pdf_read}>
              <Text style={[st.tx12, {color: colors.blue}]}>Read Now</Text>
            </TouchableOpacity>
          </View>

          <View style={[st.mt_t10]}>
            <TouchableOpacity
              onPress={() => getpdfFile(item?.title, item?.url)}
              style={[styles.pdf_download]}>
              <Icon name={'download'} size={20} color={colors.footer_bg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {show_alert_msg()}
      {isLoading && <Loader />}
    </View>
  );
};

export default PamplateItem;

const styles = StyleSheet.create({
  cardMags: {
    padding: 10,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
  },
  pdf_read: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 3,
    width: 90,
    ...st.align_C,
    ...st.justify_C,
  },
  pdf_download: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    borderRadius: 50,
    paddingVertical: 3,
    width: 30,
    height: 30,
    ...st.align_C,
    ...st.justify_C,
  },
});
