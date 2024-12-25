import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
const ImageOption = imageData => {
  const getImageData = item => {
    const findbyimageid = useSelector(state =>
      state.image?.data?.find(items => items.Enum === item.imageData),
    );
    if (findbyimageid) {
      return `${findbyimageid?.ImageBinary}`;
    } else {
      return item.imageData;
    }
    // return `data:image/jpg;base64,${findbyimageid?.ImageBinary}`;
  };

  return (
    <Image
      source={{
        uri: getImageData(imageData),
      }}
      style={{
        width: 136,
        height: 121,
      }}
    />
  );
};
export default ImageOption;

const styles = StyleSheet.create({});
