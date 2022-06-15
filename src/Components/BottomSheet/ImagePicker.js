import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  takeProfileImageFromCamera,
  takeProfileImageFromGallery,
} from '../../utils/ImagePicker';

const ImagePicker = React.forwardRef((props, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Icon color="#fff" size={21} name="camera" />,
      onPress: async () => {
        props.closeImagePicker();
        const image = await takeProfileImageFromCamera();
        props.chooseImagePicture(image?.path);
        props.choosePicType(image?.mime);
       
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon name="image" color="#fff" size={21} />,
      onPress: async () => {
        props.closeImagePicker();
        const image = await takeProfileImageFromGallery();
        props.chooseImagePicture(image?.path);
        props.choosePicType(image?.mime);
      
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={150}
      openDuration={0}
      animationType="slide"
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: '#222',
        },
        draggableIcon: {
          backgroundColor: '#F68128',
          width: 100,
          height: 5,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, onPress, icon}) => (
          <TouchableOpacity
            onPress={onPress}
            style={styles.pickerOption}
            key={name}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;

const styles = StyleSheet.create({
  pickerOption: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom:10
  },

  optionsWrapper: {
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 17,
    paddingLeft: 17,
    color: '#fff',
  },
});
