import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import OverviewScreen from '../../TabsScreens2/OverviewScreens/ProfileOverView';
import SongsScreen from '../../TabsScreens2/SongsScreens/ProfileSongs';
import VideoScreen from '../../TabsScreens2/VideoScreen/VideoUpLoad';
import {scale, ScaledSheet} from 'react-native-size-matters';

const ArtistTabView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const segmentClicked = (index) => {
    return setActiveIndex(index);
  };
  let renderViews;

  if (activeIndex == 0) {
    renderViews = <OverviewScreen />;
  }
  if (activeIndex == 1) {
    renderViews = <SongsScreen />;
  }
  if (activeIndex == 2) {
    renderViews = <VideoScreen />;
  }
  return (
    <View style={{marginTop: 0, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-evenly',
          backgroundColor: 'rgba(255,255,255,0.061)',
          alignItems: 'center',
          borderRadius: 5,
          height: 50,
          padding: 5,
        }}>
        {/* SECOND TAB */}

        <TouchableOpacity
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(0)}
          style={[
            activeIndex == 0
              ? {
                  backgroundColor: '#F68128',
                  height: '100%',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                },
          ]}>
          <Text
            style={[
              activeIndex == 0
                ? {
                    color: '#fff',
                    // transform: [{translateY: -10}],
                    fontFamily: 'Helvetica-Bold',
                    textAlign: 'center',
                    fontSize: scale(14),
                  }
                : {
                    color: '#999',
                    fontFamily: 'Helvetica-Bold',
                    fontSize: scale(12),
                  },
            ]}>
            Overview
          </Text>
        </TouchableOpacity>
        {/* THIRD TAB */}
        <TouchableOpacity
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(1)}
          style={[
            activeIndex == 1
              ? {
                  backgroundColor: '#F68128',
                  height: '100%',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                },
          ]}>
          <Text
            style={[
              activeIndex == 1
                ? {
                    color: '#fff',
                    // transform: [{translateY: -10}],
                    fontFamily: 'Helvetica-Bold',
                    textAlign: 'center',
                    fontSize: scale(14),
                  }
                : {
                    color: '#999',
                    fontFamily: 'Helvetica-Bold',
                    fontSize: scale(12),
                  },
            ]}>
            Songs
          </Text>
        </TouchableOpacity>
        {/* FOURTH TAB */}
        <TouchableOpacity
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(2)}
          style={[
            activeIndex == 2
              ? {
                  backgroundColor: '#F68128',
                  height: '100%',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '33.3%',
                  justifyContent: 'center',
                },
          ]}>
          <Text
            style={[
              activeIndex == 2
                ? {
                    color: '#fff',
                    // transform: [{translateY: -10}],
                    fontFamily: 'Helvetica-Bold',
                    textAlign: 'center',
                    fontSize: scale(14),
                  }
                : {
                    color: '#999',
                    fontFamily: 'Helvetica-Bold',
                    fontSize: scale(12),
                  },
            ]}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{paddingTop: 10, paddingHorizontal: 5}}>
        {renderViews}
      </ScrollView>
    </View>
  );
};

export default ArtistTabView;

const styles = StyleSheet.create({});
