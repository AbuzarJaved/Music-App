import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import EllipsisIcon from '../../../Components/Button/EllipisisVeticalIcon';

const {width, height} = Dimensions.get('window');

const Header = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#f68128" />
      </TouchableOpacity>

      <EllipsisIcon color="#f68128" onPress={() => onPress.current.snapTo(0)} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    top: 20,
    zIndex: 100,
  },
});
