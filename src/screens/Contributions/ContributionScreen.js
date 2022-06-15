import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import TabView from './component/TabView';
import Total from './component/TotalContribution';

const {width, height} = Dimensions.get('window');

const ContributionScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.container}>
        <CustomHeader title="Contributions" />
        <View style={styles.content}>
          {/* TOTAL CONTRIBUTIONS */}
          <View style={{width: '100%', marginBottom: 30}}>
            <Total price="3210" />
          </View>
          <TabView />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContributionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingBottom: 20,
  },
  content: {
    flex: 1,
    height,
    width,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
