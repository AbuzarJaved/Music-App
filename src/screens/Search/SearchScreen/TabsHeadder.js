import React, {useEffect, useRef, useState} from 'react';
import {Container, Header, Tab, Tabs, ScrollableTab, Text} from 'native-base';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// SCREENS
import AllScreen from '../TabScreens/All_Songs_Screen';
import PlaylistsScreen from '../TabScreens/Playlist_Screen';
import AlbumScreen from '../TabScreens/Albums_Screen';
import GenreScreen from '../TabScreens/Genre_Screen';
import ArtistScreen from '../TabScreens/Artists_Screen';

const {width, height} = Dimensions.get('window');

const TabsScrollableExample = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const data = [{name: 'Hello'}];
  return (
    <Container style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        {/* <Header hasTabs>
        <StatusBar backgroundColor="#000" />
      </Header> */}
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}
            onPress={() => navigation.goBack()}
            style={{marginRight: 15}}>
            <Icon name="md-arrow-back" size={24} color="#f68128" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Song"
            style={{color: '#fff'}}
            // ref={inputRef}
            value={text}
            placeholderTextColor="#999"
            onChangeText={(val) => setText(val)}
          />
        </View>
        {/* <View
        style={{
          width,
          height,
          backgroundColor: '#000',
          alignItems: 'center',

        }}>
        <Text style={{color: '#999', textAlign: 'center',marginTop:100}}>
          Search for any Artiste, Song, Playlist, Tracks, Albums with ease
        </Text>
      </View> */}
        {/* <Tabs
          style={{
            backgroundColor: '#000',
            borderBottomWidth: 0,
            borderBottomColor: '#000',
          }}
          renderTabBar={() => (
            <ScrollableTab
              style={{borderWidth: 0}}
              underlineStyle={{backgroundColor: '#f68128'}}
            />
          )}
          tabContainerStyle={{
            borderBottomWidth: 0,
            borderBottomColor: '#000',
          }}>
          <Tab
            tabStyle={{
              backgroundColor: '#000',
            }}
            activeTabStyle={{
              backgroundColor: '#000',
            }}
            heading="All Songs"
            textStyle={{
              color: '#999',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}
            activeTextStyle={{color: '#f68128'}}>
            <AllScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Playlists"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{
              color: '#999',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}
            activeTextStyle={{color: '#f68128'}}>
            <PlaylistsScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Albums"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{
              color: '#999',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}
            activeTextStyle={{color: '#f68128'}}>
            <AlbumScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Artists"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{
              color: '#999',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}
            activeTextStyle={{color: '#f68128'}}>
            <ArtistScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Genre"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{
              color: '#999',
              fontSize: 15,
              fontFamily: 'Helvetica-Medium',
            }}
            activeTextStyle={{color: '#f68128'}}>
            <GenreScreen />
          </Tab>
        </Tabs> */}
      </SafeAreaView>
    </Container>
  );
};
export default TabsScrollableExample;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    zIndex: 100,
    elevation: 5,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
});
