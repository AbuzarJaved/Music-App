import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Image,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity} from 'react-native-gesture-handler';
import MonthScreen from './screens/Search/TabScreens/MonthScreen';
import TodayScreen from './screens/Search/TabScreens/TodayScreen';
import WeekScreen from './screens/Search/TabScreens/WeekScreen';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const segmentClicked = (index) => {
    return setActiveIndex(index);
  };
  let renderViews;
  if (activeIndex == 0) {
    renderViews = (
      <ScrollView contentContainerStyle={{flex:1}}>
        <TodayScreen />
      </ScrollView>
    );
  }
  if (activeIndex == 1) {
    renderViews = (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <WeekScreen />
      </ScrollView>
    );
  }
  if (activeIndex == 2) {
    renderViews = (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <MonthScreen />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{}}>
      <View style={styles.container}>
        <View style={{width: '100%', paddingTop: 20, paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../../assests/images/image.jpg')}
                style={{width: 35, height: 35, borderRadius: 50}}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
              <Icon
                name="search"
                color="#999"
                size={22}
                style={{paddingTop: 8}}
              />
            </View>
          </View>
        </View>
        {/* CONTENT */}
        <View>
          {/* TABS SCREEN */}
          <View style={{marginTop: 20, height: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              {/* FIRST TAB */}
              <TouchableOpacity
                activeOpacity={0}
                onPress={() => segmentClicked(0)}
                style={[
                  activeIndex == 0
                    ? {borderBottomColor: '#f68126', borderWidth: 5}
                    : {},
                ]}>
                <Text
                  style={[
                    activeIndex == 0
                      ? {
                          color: '#eee',

                          transform: [{translateY: -10}],
                        }
                      : {color: '#999'},
                  ]}>
                  Today
                </Text>
              </TouchableOpacity>
              {/* SECOND TAB */}

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => segmentClicked(1)}
                style={[
                  activeIndex == 1
                    ? {borderBottomColor: '#f68126', borderWidth: 5}
                    : {},
                ]}>
                <Text
                  style={[
                    activeIndex == 1
                      ? {color: '#eee', transform: [{translateY: -10}]}
                      : {color: '#999'},
                  ]}>
                  Week
                </Text>
              </TouchableOpacity>
              {/* THIRD TAB */}
              <TouchableOpacity
                activeOpacity={2}
                onPress={() => segmentClicked(2)}
                style={[
                  activeIndex == 2
                    ? {borderBottomColor: '#f68126', borderWidth: 5}
                    : {},
                ]}>
                <Text
                  style={[
                    activeIndex == 2
                      ? {color: '#eee', transform: [{translateY: -10}]}
                      : {color: '#999'},
                  ]}>
                  Month
                </Text>
              </TouchableOpacity>
            </View>
            <View
              // contentContainerStyle={{flex:1}}
              style={{paddingTop: 20, paddingHorizontal: 15, flex: 1}}>
              {renderViews}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    width: '85%',
    // justifyContent: 'space-between',
    marginLeft: 10,
    height: 40,
    borderRadius: 15,
  },
  input: {
    width: '85%',
    color: '#fff',
    paddingLeft: 10,
    height: 40,
  },
});
