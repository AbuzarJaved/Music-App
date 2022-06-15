import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Add_To_Playlist_Icon from '../../../../Components/Icons/AddToPlaylistIcon';
import LikeIcon from '../../../../Components/Icons/LikeIcon';
import ArtistIcon from '../../../../Components/Icons/ArtistIcon';
import ShareIcon from '../../../../Components/Icons/ShareIcon';
import DownloadIcon from '../../../../Components/Icons/DownloadIcon';

const arr = [
  {icon: 'share-social-outline', title: 'Add to queue'},
  {icon: 'heart', title: 'Add to Favourites'},
  {icon: 'star', title: 'Go to Artiste Profile'},
  {icon: 'add-circle-outline', title: 'Add to my playlist'},

  {icon: 'arrow-redo', title: 'Share'},
  {icon: 'download', title: 'Download'},
];
const arr2 = [
  {icon: <Add_To_Playlist_Icon color="#999" />, title: 'Add to queue'},
  {icon: <LikeIcon color="#999" />, title: 'Add to Favourites'},
  {icon: <ArtistIcon color="#999" />, title: 'Go to Artiste Profile'},
  {icon: <Add_To_Playlist_Icon color="#999" />, title: 'Add to my playlist'},

  {icon: <ShareIcon color="#999" />, title: 'Share'},
  {
    icon: <DownloadIcon color="#999" width={24} height={24} />,
    title: 'Download',
  },
];
const renderItem = ({icon, title}) => (
  <View style={{flexDirection: 'row'}}>
    <Icon name={icon} size={30} color="#999" style={{marginRight: 10}} />
    <Text style={{color: '#f68128'}}>{title}</Text>
  </View>
);
const BottomSheet = ({onPress}) => {
  return (
    <View
      style={{
        backgroundColor: '#1A1A1A',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <TouchableOpacity
        onPress={() => onPress.current.snapTo(1)}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
        <View style={styles.bar}></View>
      </TouchableOpacity>
      <FlatList
        data={arr2}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            {item.icon}
            <TouchableOpacity>
              <Text style={{color: '#eee', marginTop: 3, marginLeft: 10}}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
// alert-circle-outline
// add-cirle-outline
// crop-utlineo
// return-up-forward
//share-social-ouline
// ios-sync-outline

export default BottomSheet;

const styles = StyleSheet.create({
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
});
