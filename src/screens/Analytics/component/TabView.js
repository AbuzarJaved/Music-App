import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import LikesScreen from './TabScreens/ViewsScreen'
import LikeScreen from './TabScreens/Like_Dislike'
import MoneyScreen from './TabScreens/MoneyScreen'

const TabView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const segmentClicked = (index) => {
    return setActiveIndex(index);
  };
  let renderViews;

  if (activeIndex == 0) {
    renderViews = <LikesScreen />;
  }
  if (activeIndex == 1) {
    renderViews = <LikeScreen />;
  }
  if (activeIndex == 2) {
    renderViews = <MoneyScreen />;
  }
  return (
    <View style={{height: '100%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            Views
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
            Likes/Dislikes
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
            Money
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20}}>
        {renderViews}
      </ScrollView>
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({});
