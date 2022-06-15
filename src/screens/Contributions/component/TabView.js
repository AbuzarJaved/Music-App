import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import LastWeekScreen from '../TabScreens/LastWeek';
import LastMonthScreen from '../TabScreens/LastMonth';
import AllTimeScreen from '../TabScreens/AllTime';

const TabView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const segmentClicked = (index) => {
    return setActiveIndex(index);
  };
  let renderViews;

  if (activeIndex == 0) {
    renderViews = <LastWeekScreen />;
  }
  if (activeIndex == 1) {
    renderViews = <LastMonthScreen />;
  }
  if (activeIndex == 2) {
    renderViews = <AllTimeScreen />;
  }
  return (
    <View style={{flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 50,
        }}>
        {/* SECOND TAB */}

        <TouchableOpacity
          hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(0)}
          style={[
            activeIndex == 0
              ? {
                  borderBottomColor: '#f68126',
                  borderBottomWidth: 5,
                  height: 5,
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }
              : {},
          ]}>
          <Text
            style={[
              activeIndex == 0
                ? {
                    color: '#f68128',
                    textTransform: 'uppercase',
                    transform: [{translateY: -10}],
                  }
                : {color: '#999', textTransform: 'uppercase'},
            ]}>
            Last Week
          </Text>
        </TouchableOpacity>
        {/* THIRD TAB */}
        <TouchableOpacity
          hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(1)}
          style={[
            activeIndex == 1
              ? {
                  borderBottomColor: '#f68126',
                  borderBottomWidth: 5,
                  height: 5,
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }
              : {},
          ]}>
          <Text
            style={[
              activeIndex == 1
                ? {
                    color: '#f68128',
                    textTransform: 'uppercase',
                    transform: [{translateY: -10}],
                  }
                : {color: '#999', textTransform: 'uppercase'},
            ]}>
            Last Month
          </Text>
        </TouchableOpacity>
        {/* FOURTH TAB */}
        <TouchableOpacity
          hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(2)}
          style={[
            activeIndex == 2
              ? {
                  borderBottomColor: '#f68126',
                  borderBottomWidth: 5,
                  height: 5,
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }
              : {},
          ]}>
          <Text
            style={[
              activeIndex == 2
                ? {
                    color: '#f68128',
                    textTransform: 'uppercase',
                    transform: [{translateY: -10}],
                  }
                : {color: '#999', textTransform: 'uppercase'},
            ]}>
            All Time
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20}}>{renderViews}</ScrollView>
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({});
