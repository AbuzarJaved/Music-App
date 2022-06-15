import React from 'react';
import {
  StyleSheet,
  
  View,
  Dimensions,
  SafeAreaView,
  
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import TabView from './component/TabView';

import CustomHeader from '../../Components/CustomHeader/CommonHeader';

const {width, height} = Dimensions.get('window');

const Analytic = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomHeader title="Analytics" />
        <View style={styles.content}>
          <TabView />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Analytic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    
  },
  content: {
    flex: 1,
    width,
    height,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
