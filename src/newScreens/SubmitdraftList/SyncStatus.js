import {StyleSheet, View} from 'react-native';
import React from 'react';
import st from '../../global/styles';
import {ENUM} from '../../utils/enum/checklistEnum';
import Icons from 'react-native-vector-icons/Entypo';
import {colors} from 'react-native-elements';

const SyncStatus = ({SyncStatus}) => {
  const getcolor = SyncStatus => {
    if (ENUM.SERVERSTATUS.COMPLETED == SyncStatus) {
      return st.SyncStatusTextColor.completed;
    }
    if (ENUM.SERVERSTATUS.INPROGRESS == SyncStatus) {
      return st.SyncStatusTextColor.inprogess;
    }
    if (ENUM.SERVERSTATUS.NOTSTARTED == SyncStatus) {
      return st.SyncStatusTextColor.error;
    }
    if (ENUM.SERVERSTATUS.FAILED == SyncStatus) {
      return st.SyncStatusTextColor.error;
    }
  };

  const getIconName = SyncStatus => {
    if (ENUM.SERVERSTATUS.COMPLETED == SyncStatus) {
      return 'check';
    } else if (ENUM.SERVERSTATUS.INPROGRESS == SyncStatus) {
      return 'cw';
    } else if (ENUM.SERVERSTATUS.NOTSTARTED == SyncStatus) {
      return 'clock';
    } else if (ENUM.SERVERSTATUS.FAILED == SyncStatus) {
      return 'cross';
    }
  };

  return (
    <View style={styles.floatContainer}>
      <Icons
        color={getcolor(SyncStatus)}
        name={getIconName(SyncStatus)}
        size={12}
        style={[st.justify_A]}
      />
    </View>
  );
};
export default SyncStatus;
const styles = StyleSheet.create({
  floatContainer: {
    position: 'absolute',
    bottom: 12,
    right: 8,
  },
});
