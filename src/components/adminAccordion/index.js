import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {colors} from '../../global/theme';
import Icon from 'react-native-vector-icons/Feather';
import st from '../../global/styles';

export default class AdminAccordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View style={styles.accordian_box}>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}
          >
          <Text style={[st.tx14, {color: colors.black}]}>
            {this.props.title}
          </Text>
          <Icon
            name={!this.state.expanded ? 'plus' : 'minus'}
            size={20}
            color={colors.danger}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.child}>
            <Text style={[st.tx14, {color: colors.lightText}]}>
              {this.props.data}
            </Text>
          </View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 40,
    // paddingLeft: 25,
    // paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.CGRAY,
  },
  parentHr: {
    height: 1,
    color: colors.WHITE,
    width: '100%',
  },
  child: {
    backgroundColor: colors.LIGHTGRAY,
    marginTop:10
  },
  accordian_box: {
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 0.7,
    marginBottom:20,
    paddingHorizontal:15,
    elevation:1,
    paddingVertical:10
  },
});
