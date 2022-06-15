import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SearchResult = ({artist, km, numListening,state,index,image,indexes}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
       
      }}>
      <TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {indexes && (
            <Text
              style={{
                color: '#f68126',
                alignSelf: 'center',
                marginRight: 10,
                fontSize: 12,
              }}>
              {index > 10 ? index : `0${index + 1}`}
            </Text>
          )}

          <Image
            source={image}
            style={{width: 60, height: 60, borderRadius: 10}}
          />
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                color: '#fff',

                marginTop: 3,
                fontFamily: 'Gilroy-Heavy',
                fontSize: 15,
                textTransform: 'capitalize',
              }}>
              {artist}
            </Text>

            {/* LIKES OR SUBTITLE */}
            <Text
              style={{
                color: '#f68128',
                fontFamily: 'Gilroy-Heavy',
                fontSize: 11,
                textTransform: 'capitalize',
                marginTop: 10,
              }}>
              {numListening} likes
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        {/* DISTANCE IN KM */}
        <Text
          style={{
            color: '#eee',
            fontFamily: 'Gilroy-Heavy',
            fontSize: 13,
            textTransform: 'uppercase',
            marginTop: 3,
          }}>
          {km}
        </Text>
        {/* STATE */}
        <Text
          style={{
            color: '#f68128',
            fontFamily: 'Gilroy-Heavy',
            fontSize: 12,
            textTransform: 'uppercase',
            marginTop: 10,
            textAlign: 'center',
          }}>
          {state}
        </Text>
      </View>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
