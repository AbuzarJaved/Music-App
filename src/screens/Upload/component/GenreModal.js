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

const GenreModal = props => {
  const getGenreList = useSelector(state => state.getGenreList);
  const {data, loading, error} = getGenreList;

  let errorView = null;
  let loadingView = null;
  if (error) {
    errorView = (
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
  }

  if (loading) {
    loadingView = <ActivityIndicator color="#f68128" size="small" />;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.genreModal}
      onRequestClose={() => props.closeGenreModal()}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <View style={{width: '90%'}}>
            <Text style={styles.text}>Select your song genre</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => props.closeGenreModal()}>
            <Icon name="md-close-sharp" color="#f68128" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Divider />
        </View>
        <View style={styles.genreCont}>
          {errorView}
          {loadingView}
          {data && (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              contentContainerStyle={{}}
              renderItem={({item}) => (
                <SingleGenre
                  {...item}
                  genre={props.genre}
                  chooseGenre={() => props.chooseGenre(item.name, item.id)}
                />
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default GenreModal;

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
    // alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  genreCont: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  text: {
    color: '#f68128',
    fontSize: 18,
    textAlign: 'center',
  },
});
