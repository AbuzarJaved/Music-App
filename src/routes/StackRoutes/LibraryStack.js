import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
// import Library from '../../screens/Library/Library';
import Library from '../../screens/Library/MainLibraryPage';

// STACKED SCREENS
import PlaylistStack from '../StackRoutes/PlaylistStack';
import FavoriteStack from '../StackRoutes/FavoriteStack';
import AlbumStack from '../StackRoutes/AlbumStack';
import ArtistStack from '../StackRoutes/ArtistStack';
import HistoryStack from '../StackRoutes/HistoryStack';
import DownloadedStack from '../StackRoutes/DownloadedStack';
import CreatePlaylistStack from '../StackRoutes/CreatePlaylistStack';
import CreatePlaylist from '../StackRoutes/CreatePlaylistStack';
import CreatePlaylistForm from '../StackRoutes/CreatePlaylistForm';
import MorePlaylist from '../StackRoutes/MorePlaylistStack';
import Now_Playing from '../StackRoutes/NowPlayingStack';
import DiscoveredSongs from '../StackRoutes/DiscoveredSongsStack';
import SinglePlayList from '../StackRoutes/SinglePlayList';
import SingleAlbum from '../../screens/AlbumScreen/SingleAlbum';

const Stack = createStackNavigator();

const LibraryStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Playlist" component={PlaylistStack} />
      <Stack.Screen name="Album" component={AlbumStack} />
      <Stack.Screen name="Artist" component={ArtistStack} />
      <Stack.Screen name="Favorite" component={FavoriteStack} />
      <Stack.Screen name="History" component={HistoryStack} />
      <Stack.Screen name="Downloaded" component={DownloadedStack} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylist} />
      <Stack.Screen name="CreatePlaylistForm" component={CreatePlaylistForm} />
      <Stack.Screen name="DiscoveredSongs" component={DiscoveredSongs} />
      <Stack.Screen name="SinglePlayList" component={SinglePlayList} />
      <Stack.Screen name="SingleAlbum" component={SingleAlbum} />
      <Stack.Screen name="MorePlaylist" component={MorePlaylist} />
    </Stack.Navigator>
  );
};

export default LibraryStack;
