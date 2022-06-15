import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginBtn from '../../../Components/Button/LoginBtn';
import {useDispatch, useSelector} from 'react-redux';
import Divider from '../../../Components/Divider/Divider';
import SingleGenre from './SingleGenre';
import SingleAlbum from './SingleAlbum';

const AlbumModal = props => {
  const getAllUserAlbum = useSelector(state => state.getAllUserAlbum);
  const {data, loading, error} = getAllUserAlbum;

  let errorView = null;
  let mainView = null;
  if (data.length <= 0 && !loading && !error) {
    mainView = (
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: '#999',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          You have created any album with us yet.
        </Text>
      </View>
    );
  } else if (loading) {
    mainView = <ActivityIndicator color="#f68128" size="small" />;
  } else if (error) {
    mainView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => props.tryAgain()}>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: 5,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    mainView = (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SingleAlbum
            {...item}
            album={props.album}
            chooseAlbum={() => props.chooseAlbum(item.name, item.id)}
          />
        )}
      />
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.albumModal}
      onRequestClose={() => props.closeAlbumModal()}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <View style={{width: '90%'}}>
            <Text style={styles.text}>Select your song album</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => props.closeAlbumModal()}>
            <Icon name="md-close-sharp" color="#f68128" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        <View style={styles.genreCont}>{mainView}</View>
      </View>
    </Modal>
  );
};

export default AlbumModal;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '100%',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  genreCont: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: '#f68128',
    fontSize: 18,
    textAlign: 'center',
  },
});
