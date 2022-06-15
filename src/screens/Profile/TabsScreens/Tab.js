import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Header, Tab, Tabs, ScrollableTab} from 'native-base';
import VideoTabScreen from './VideoScreen/VideoUpLoad';
import SongsTabScreen from './SongsScreens/ProfileSongs';
import OverviewTabScreen from './OverviewScreens/ProfileOverView';
import UploadTabScreen from './UploadScreen/FileUpload';

const ProfileTabs = () => {
  return (
    <Container >
      <Header hasTabs />
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Upload">
          <UploadTabScreen />
        </Tab>
        <Tab heading="OverView">
          <OverviewTabScreen />
        </Tab>
        <Tab heading="Songs">
          <SongsTabScreen />
        </Tab>
        <Tab heading="Videos">
          <VideoTabScreen />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
