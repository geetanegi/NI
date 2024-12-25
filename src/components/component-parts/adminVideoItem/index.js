import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import st from '../../../global/styles';
import {images, colors} from '../../../global/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {deleteAlert} from '../../../utils/helperfunctions/functions';
import {Thumbnail} from 'react-native-thumbnail-video';

const AdminVideoItem = ({
  item,
  gotoedit,
  openDeletePopup,
  gotoView,
  title,
  subtitle,
  onPressDelete,
  onPress
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View style={[st.row, st.mt_B]}>
      <View style={st.wdh40}>
        <Thumbnail url={item?.url?.trim()} 
          imageWidth={120} imageHeight={100} 
          containerStyle={{
            backgroundColor:'#000',
            width:120,
            height : 100
          }}
          iconStyle={{
            width:20,height:24,tintColor:colors.lightFrozy
          }}
          onError={(e)=>console.log('error')}
          onPress={onPress}
          />
      </View>
      <View style={st.wdh50}>
        <View>
          <Text style={[st.tx14, {color: colors.black}]}>{item.videoType}</Text>
          <Text style={[st.tx12, {opacity: 0.5, color: colors.black}]} numberOfLines={4} >
            {item.description}
          </Text>
        </View>
      </View>

      <View style={[st.wdh10, st.align_E]}>
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <Icon name={'dots-three-vertical'} size={20} />
            </TouchableOpacity>
          }
          onBlur={() => hideMenu()}
          onRequestClose={() => hideMenu()}>
          {/* <MenuItem
            onPress={() => {
              hideMenu();
              // gotoView();
            }}
            textStyle={[st.tx14, {color: colors.black}]}>
            View
          </MenuItem>
          <MenuDivider color={colors.lightText} /> */}
          <MenuItem
            onPress={() => {
              hideMenu();
              gotoedit();
            }}
            textStyle={[st.tx14, {color: colors.black}]}>
            Edit
          </MenuItem>
          <MenuDivider color={colors.lightText} />
          <MenuItem
            onPress={() => {
              hideMenu();
              if (Platform.OS == 'android') {
                openDeletePopup();
              } else {
                deleteAlert(title, subtitle, onPressDelete);
              }
            }}
            textStyle={[st.tx14, {color: colors.black}]}>
            Delete
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
};

export default AdminVideoItem;

const styles = StyleSheet.create({});
