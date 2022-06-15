import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Divider from '../../../../Components/Divider/Divider';

const GenreSelection = (props) => {
  const genreList = [
    {title: 'Hip-Hop & Rap', key: '1'},
    {title: 'Reggae', key: '2'},
    {title: 'R&B/Soul', key: '3'},
    {title: 'Afro-Beat', key: '4'},
    {title: 'Opera', key: '5'},
    {title: 'Country', key: '6'},
    {title: 'Jazz', key: '7'},
    {title: 'HighLife', key: '8'},
    {title: 'Rock', key: '9'},
    {title: 'Pop', key: '10'},
    {title: 'Dance', key: '11'},
    {title: 'Electronic', key: '12'},
    {title: 'Christian & Gospel', key: '13'},
    {title: 'Vocal', key: '14'},
    {title: 'Classical', key: '15'},
    {title: 'Fitness & Workout', key: '16'},
    {title: 'Latino', key: '17'},
  ];
  return (
    // <ScrollView>
    <View style={styles.genreCont}>
      <FlatList
        data={genreList}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => props.changeGenre(item.title)}
            style={styles.singleGenre}>
            <View style={[styles.check]}>
              {props.genre === item.title && (
                <View style={[styles.activeCheck]}></View>
              )}
            </View>
            <Text style={{color: '#999', fontSize: 17}}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    // </ScrollView>
  );
};

export default GenreSelection;

const styles = StyleSheet.create({
  genreCont: {
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 0,
    height: '30%',
    // flex: 1,
  },
  singleGenre: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#eee',
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCheck: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#f68128',
  },
});
