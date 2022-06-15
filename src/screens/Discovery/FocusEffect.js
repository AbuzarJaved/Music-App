import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {get_Trailer_Media} from '../../redux/actions/MediaActions/getMediaActions';
import {useDispatch} from 'react-redux';

const FocusEffect = (props) => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(get_Trailer_Media(props.page, props.size));
    }, []),
  );
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FocusEffect;

const styles = StyleSheet.create({});
