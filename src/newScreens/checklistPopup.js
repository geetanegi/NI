import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getEditChecklistState} from '../redux/store/getState';
import PopUpMessage from '../components/popup';

const ChecklistPopup = () => {
  console.log('rendering ChecklistPopup');
  const [popup, setPopup] = useState({
    title: '',
    subtitle: '',
    showPopup: false,
  });

  const openPopup = (title, subtitle) => {
    setPopup({
      title,
      subtitle,
      showPopup: true,
    });
  };
  const hidePopup = () => {
    setPopup({
      title: '',
      subtitle: '',
      showPopup: false,
    });
  };

  useEffect(() => {
    const errorMessage = getEditChecklistState()?.ErrorMessage;
    if (errorMessage) {
      openPopup('Sync error', errorMessage);
    }
  },[]);

  return (
    <PopUpMessage
      display={popup.showPopup}
      titleMsg={popup.title}
      subTitle={popup.subtitle}
      onModalClick={hidePopup}
      onPressNoBtn={hidePopup}
    />
  );
};

export default ChecklistPopup;

const styles = StyleSheet.create({});
