import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LikeScreen from './TabScreens/LikesScreen';
import CommentScreen from './TabScreens/CommentsScreens';
import FollowerScreen from './TabScreens/FollowerScreen';
import PlaylistScreen from './TabScreens/AlbumPlaylistScreen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const ArtistTabView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;

  const segmentClicked = index => {
    return setActiveIndex(index);
  };
  let renderViews;

  if (activeIndex == 0) {
    renderViews = <LikeScreen />;
  }
  if (activeIndex == 1) {
    renderViews = <CommentScreen />;
  }
  if (activeIndex == 2) {
    renderViews = <FollowerScreen />;
  }
  if (activeIndex == 3) {
    renderViews = <PlaylistScreen />;
  }

  let userView = null;
  if (type === 'LISTENER') {
    userView = 'Playlist';
  } else {
    userView = 'Playlist/Album';
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
                  width: '25%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '25%',
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
            Likes
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
                  width: '25%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '25%',
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
            Comments
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
                  width: '25%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '25%',
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
            Followers
          </Text>
        </TouchableOpacity>
        {/* FOURTH TAB */}
        <TouchableOpacity
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          activeOpacity={0.6}
          onPress={() => segmentClicked(3)}
          style={[
            activeIndex == 3
              ? {
                  backgroundColor: '#F68128',
                  height: '100%',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '25%',
                  justifyContent: 'center',
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '25%',
                  justifyContent: 'center',
                },
          ]}>
          <Text
            style={[
              activeIndex == 3
                ? {
                    color: '#fff',
                    // transform: [{translateY: -10}],
                    fontFamily: 'Helvetica-Bold',
                    textAlign: 'center',
                    fontSize: scale(12),
                  }
                : {
                    color: '#999',
                    fontFamily: 'Helvetica-Bold',
                    fontSize: scale(12),
                  },
            ]}>
            {userView}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{paddingTop: 10, paddingHorizontal: 5}}> */}
      <>{renderViews}</>
      {/* </ScrollView> */}
    </View>
  );
};

export default ArtistTabView;

const styles = StyleSheet.create({});
