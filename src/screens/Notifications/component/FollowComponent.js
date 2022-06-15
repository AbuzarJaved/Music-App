import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const LikedComponent = ({name, image1}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {/* left IMAMGE */}
        <Image
          source={require('../../../assests/images/profile.jpg')}
          style={styles.leftImage}
        />
        {/* TEXT CONTENT */}
        <View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: 150}}>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.nameText}>{name}&nbsp;</Text>
            </TouchableOpacity>
            <Text style={{color: '#eee', fontSize: 13, paddingTop: 5}}>
              followed you
            </Text>
          </View>
          <Text style={{color: '#888', fontSize: 12}}>4:32 pm</Text>
        </View>
      </View>
      {/* SECOND IMAGE */}
      <TouchableOpacity activeOpacity={0.6} style={styles.followBtn}>
        <Text style={{color: '#eee', fontSize: 12}}>Follow back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikedComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  nameText: {
    color: '#f68128',
    alignSelf: 'flex-start',
    fontSize: 15,
    paddingTop: 3,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: '#f68128',
    borderRadius: 20,
    width: '30%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f68128',
    alignSelf: 'center',
  },
});

//  <View style={{width: '40%'}}>
//    <FollowBtn title="Follow Back" />
//  </View>;
