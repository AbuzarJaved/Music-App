import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import UploadIcon from '../../Components/Icons/UploadIcon';
import EditUserIcon from '../../Components/Icons/EditUserIcon';

const ProfileBottomSheet = (props) => {
  const navigation = useNavigation();
  const options = [
    {
      name: 'Upload Song',
      icon: <UploadIcon color="#fff" />,
      onPress: () => {
        props.closeBottomSheet();
        navigation.navigate('Upload');
      },
    },
    {
      name: 'Edit Profile',
      icon: <EditUserIcon color="#fff" width={20} height={20} />,
      onPress: () => {
        props.closeBottomSheet();
        navigation.navigate('Edit_Profile');
      },
    },
  ];
  return (
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
  );
};

export default ProfileBottomSheet;

const styles = StyleSheet.create({
  pickerOption: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
  },

  optionsWrapper: {
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 17,
    paddingLeft: 17,
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
  },
});
