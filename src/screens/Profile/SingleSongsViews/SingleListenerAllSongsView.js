import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CommonHeader from '../../../Components/CustomHeader/CommonHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {alphaBets} from '../../../data5';
import CustomAlphaFilter from '../../../Components/Button/CustomAlphabetFilterView';

const {height, width} = Dimensions.get('window');

const SingleListenerAllSongsView = () => {
  const [filterValue, setFilterValue] = useState('All');

  const chooseFilterVal = (val) => {
    setFilterValue(val);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <CommonHeader title="Songs" />
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 10,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={alphaBets}
            keyExtractor={(item) => item.title}
            renderItem={({item, index}) => (
              <CustomAlphaFilter
                {...item}
                value={filterValue}
                onPress={() => chooseFilterVal(item.title)}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SingleListenerAllSongsView;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    height: '100%',
  },
});
