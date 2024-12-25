import React from 'react';
import {Dimensions, StyleSheet, View, Button, Text} from 'react-native';
import st from '../../global/styles';
import {colors} from '../../global/theme';
import PopUpMessage from '../popup';
import {stopAllBackgroundServices} from '../../utils/services/backgroundService';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      popupMessageVisibility: false,
    };
  }

  static getDerivedStateFromError(error) {
    stopAllBackgroundServices();
    return {hasError: true, popupMessageVisibility: true};
  }

  componentDidCatch(error, errorInfo) {}

  onPopupMessageModalClick = value => {
    this.setState({popupMessageVisibility: value});
  };

  show_alert_msg = value => {
    return (
      <PopUpMessage
        display={this.state.popupMessageVisibility}
        titleMsg={'Oops'}
        subTitle={'Some Error Occured! Please try again'}
        onModalClick={value => {
          this.onPopupMessageModalClick(value);
          this.setState({
            hasError: false,
          });
        }}
      />
    );
  };

  renderFallbackUI = () => {
    return (
      <>
        {/* <View style={styles.cont}>
          <Text style={[st.tx16, {color: colors.black}]}>
            Some Error Occured! Please try again
          </Text>
          <View style={styles.btnCont}>
            <Button
              onPress={() =>
                this.setState({
                  hasError: false,
                })
              }
              title={'Retry'}
            />
          </View>
        </View> */}
        {this.show_alert_msg()}
      </>
    );
  };

  render() {
    const RenderFallbackUI = this.renderFallbackUI;
    if (this.state.hasError) {
      return <RenderFallbackUI />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    resizeMode: 'contain',
  },
  btnCont: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
