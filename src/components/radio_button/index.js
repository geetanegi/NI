import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import st from '../../global/styles';
import {colors} from '../../global/theme';
export default class RadioButton extends Component {
  state = {
    value: '',
  };
  render() {
    const {PROP, onSelect, t, initialValue} = this.props;
    const {value} = this.state;
    return (
      <View
        style={[
          st.row,
          st.align_C,
          styles.inputsty,
          {padding: 10, marginTop: 15, marginBottom: 10},
        ]}>
        {PROP.map(res => {
          return (
            <View key={res.id} style={styles.container}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.setState({
                    value: res.id,
                  });
                  onSelect(res.id);
                }}>
                {initialValue
                  ? initialValue === res.id && (
                      <View style={styles.selectedRb} />
                    )
                  : value === res.id && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Text style={[st.txradio, st.txCap, {marginRight: 40}]}>
                {res.option}
              </Text>
            </View>
          );
        })}
        {/* <Text> Selected: {this.state.value} </Text> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   //  alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderWidth: 1.5,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 7,
    height: 7,
     borderRadius: 50,
    backgroundColor: colors.black,
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
  inputsty: {
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: 7,
  },
});
