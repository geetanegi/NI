// import React, { Component, useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
//  import { Icon } from 'react-native-paper';
// export default class CheckBoxButton extends Component {
//   state = {
//     value: '',
//   };
//   render() {
//     const { options = [], onChange, multiple = false } = this.props;
//     const { value } = this.state;

//     const [selected, setSelected] = useState([]);
//     function toggle(id) {
//       let index = selected.findIndex(i => i === id);
//       let arrSelecteds = [...selected];
//       if (index !== -1) {
//         arrSelecteds.splice(index, 1);

//       }
//       else {
//         arrSelecteds.push(id);

//       }
//       setSelected(arrSelecteds);
//     }
//     useEffect(() => onChange(selected), [selected])


//     return (
//       <View style={styles.container}>
//         {options.map((op, index) => (
//           <View style={styles.optionContainer}>
//             <TouchableOpacity
//               style={[styles.touchable, {
//                 backgroundColor:
//                   selected.findIndex(i => i === op.id) !== -1
//                     ? '#3EBD93' : '#fff'

//               }]}
//               onPress={() => toggle(op?.id)}>
//               {
//                 selected.findIndex(i => i === op.id) !== -1 ? (
//                   <Icon name="check-bold" color={'#3EBD93'} size={16} />
//                 ) : null}
//             </TouchableOpacity>
//             <Text style={styles.optext}>{op?.text}</Text>
//           </View>
//         ))}


//       </View>

//     );
//   }
// }
// const styles = StyleSheet.create({

//   container: {
//     marginLeft: 12
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   touchable: {
//     height: 20,
//     width: 20,
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#3EBD93',
//     borderWidth: 2
//   },
//   optext: {
//     marginLeft: 12,
//     color: '#555',
//     fontSize: 16,
//     fontWeight: '600'
//   }
// });
