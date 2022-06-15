import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CreatePlaylistIcon from '../../../../Components/Icons/CreatePlaylistIcon';
import Button from '../../../../Components/Button/LoginBtn';
import {useNavigation} from '@react-navigation/native';
// import CustomHeader from '../../../Notifications/component/CustomHeader';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';

// import CreatePlaylistModal from '../../../../Components/Modal/CreatePlaylistModal';

const {width, height} = Dimensions.get('window');

const Create_Playlist = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        {/* <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={styles.container}>
          <CustomHeader title="Create Playlist" />
          <CreatePlaylistModal showModal={showModal} closeModal={closeModal} />
        </View> */}
        <View style={styles.content}>
          <View style={{marginBottom: 20}}>
            <CreatePlaylistIcon color="#999" width={120} height={120} />
          </View>
          <Text
            style={{color: '#999', fontSize: 20, fontFamily: 'Gilroy-Bold'}}>
            You do not have any playlist yet
          </Text>
          {/* Button */}
          <View style={{width: '80%', marginTop: 50}}>
            <Button
              title="Create Playlist"
              onPress={() => navigation.navigate('CreatePlaylistForm')}
              // onPress={() => openModal()}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Create_Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    flex: 1,
    width,
    height,
  },
});
