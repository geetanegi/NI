import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SelectButton = ({options = [], onChange, multiple = false}) => {
  const [selected, setSelected] = useState([]);

  function toggle(id) {
    let index = selected.findIndex(i => i === id);
    let arrSelecteds = [...selected];
    if (index !== -1) {
      arrSelecteds.splice(index, 1);
      onChange(arrSelecteds);
    } else {
      
      multiple ? arrSelecteds.push(id) : (arrSelecteds = [id]);
      onChange(arrSelecteds);
    }

    setSelected(arrSelecteds);
    console.log("selected")
    console.log({arrSelecteds})
  }

  return (
    <View style={styles.container}>
      {options.map((op, index) => (
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.touchable,
              {
                backgroundColor:
                  selected.findIndex(i => i === op.id) !== -1
                    ? '#3EBD93'
                    : '#fff',
              },
            ]}
            onPress={() => {
              // onChange(op?.id)
              toggle(op?.id);
            }}>
            {selected.findIndex(i => i === op.id) !== -1 ? (
              <Icon name="check-bold" color={'#fff'} size={16} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.optext}>{op?.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -3,
    flexDirection: 'row',
    //marginLeft:20,
    height: 40,
    justifyContent: 'space-around',
    //  justifyContent: 'space-between',
  },
  optionContainer: {
    marginTop: 1,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    height: 20,
    width: 20,
    borderRadius: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: '#3EBD93',
    borderWidth: 2,
  },
  optext: {
    marginLeft: 12,
    color: '#555',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default SelectButton;
