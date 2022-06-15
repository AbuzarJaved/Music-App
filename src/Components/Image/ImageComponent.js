import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import defaultImage from '../../assests/images/image_placeholder.png';
import {DEFAULT_IMAGE_URI} from '../../utils/ImagePicker';

const ImageComponent = (props) => {
  return (
    <View
      style={[
        styles.ImageBox,
        props.width ? {width: props.width} : null,
        props.height ? {height: props.height} : null,
        props.radius ? {borderRadius: props.radius} : null,
        props.round ? {borderRadius: (props.width + props.height) / 2} : null,
        props.noRadius ? {borderRadius: 0} : null,
      ]}>
      <Image
        // source={props.image ? {uri: props.image} : defaultImage}
        source={{uri: props.image ? props.image : DEFAULT_IMAGE_URI}}
        style={[
          styles.image,
          props.round ? {borderRadius: (props.width + props.height) / 2} : null,
          props.radius ? {borderRadius: props.radius} : null,
          props.noRadius ? {borderRadius: 0} : null,
          props.bc ? {borderColor: props.bc} : null,
          props.bw ? {borderWidth: props.bw} : null,
        ]}
      />
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  ImageBox: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50 / 2,
  },
});
