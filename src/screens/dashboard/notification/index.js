import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import AuthHeader from '../../../components/Auth_Header';
import Footer from '../../../components/footer';
import st from '../../../global/styles';

import {colors, images} from '../../../global/theme';

const Notification = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={[st.row, st.mt_B, st.align_C]}>
        <View style={st.wdh20}>
          <Image style={styles.imgsty} source={images.vdo_thumbnail} />
        </View>
        <View style={st.wdh80}>
          <Text style={[st.tx14, {color: colors.black}]}>{item.title}</Text>
          <Text style={[st.tx12, {color: colors.lightText}]}>
            {item.subtitle}
          </Text>
          <Text style={[st.tx10, {color: colors.lightText}]}>{item.ago}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={st.flex}>
      <AuthHeader title={'Notifications'} onBack={() => navigation.goBack()} />
      <ScrollView>
        <FlatList
          data={magData}
          contentContainerStyle={st.pd20}
          renderItem={renderItem}
        />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  imgsty: {width: 50, height: 50, borderRadius: 50},
});

const magData = [
  {
    title: 'Anxiety Happens',
    subtitle:
      'Mental illnesses are health conditions involving change in thinking, behaviour.',
    ago: '2 day ago',
  },
  {
    title: 'Anxiety Happens',
    subtitle:
      'Mental illnesses are health conditions involving change in thinking, behaviour.',
    ago: '20 day ago',
  },
  {
    title: 'Anxiety Happens',
    subtitle:
      'Mental illnesses are health conditions involving change in thinking, behaviour.',
    ago: '2 day ago',
  },
];
