import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ContributionIcon from '../../../Components/Icons/DonateIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SingleArtist = ({
  name,
  title,
  onPress,
  firstName,
  lastName,
  stageName,
  followCount,
  profilePictureUrl,
  artistIdentity,
}) => {
  const navigation = useNavigation();
  const [artistFollowers, setArtistsFollowers] = useState(followCount);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assests/images/verification.png')}
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          borderRadius: 20 / 2,
          zIndex: 100,
          right: 35,
          top: 10,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Single_Artist_Profile', {
            screen: 'Single_Artist_Profile',
            params: {
              firstName,
              lastName,
              stageName,
              followCount,
              profilePictureUrl,
              artistIdentity,
              artistFollowers,
            },
          })
        }
        style={{width: '100%'}}>
        {profilePictureUrl && profilePictureUrl !== 'null' ? (
          <Image
            source={{uri: profilePictureUrl}}
            style={{
              width: 180,
              height: 180,
              borderRadius: 180 / 2,
              marginRight: 10,
            }}
          />
        ) : (
          <View style={styles.thumbNail}>
            <Text style={[styles.thumbNailName, {marginRight: 10}]}>
              {firstName ? firstName[0] : null}
            </Text>
            <Text style={styles.thumbNailName}>
              {lastName ? lastName[0] : null}
            </Text>
          </View>
        )}

        <View
          style={{
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* ARTIST DETAILS */}
          <View
            style={{
              // marginLeft: 2,
              // marginTop: 3,
              width: '100%',
              // paddingLeft: 5,
            }}>
            <Text style={styles.artistName}>{`${firstName} ${lastName}`}</Text>
            <View style={styles.flexDetails}>
              {/* <Text style={styles.stageName}>@{stageName}</Text> */}
              <Text style={styles.artistId}>{followCount}&nbsp;followers</Text>
            </View>
          </View>
          {/* CONTROLS */}
          {/* <View
            style={{
              width: '15%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}> */}
          {/* <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Payment')}
              style={{marginRight: 10}}>
              <ContributionIcon color="#999" />
            </TouchableOpacity> */}
          {/* <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
              <Icon name="close" size={24} color="#999" />
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SingleArtist;

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    marginBottom: 50,
    height: 200,
    position: 'relative',
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  artistName: {
    color: '#eee',
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  artistId: {
    color: '#f68128',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    // marginTop: 5,
    textAlign: 'center',
  },
  stageName: {
    color: '#f68128',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'lowercase',
  },
  flexDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  thumbNail: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbNailName: {
    fontSize: 50,
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
});

//  <TouchableOpacity
//    activeOpacity={0.6}
//    onPress={() => navigation.navigate('Profile')}
//    style={{flexDirection: 'row', width: '70%'}}>
//    <Image
//      source={require('../../../assests/images/caro1.jpg')}
//      style={{width: 70, height: 70, borderRadius: 70 / 2, marginRight: 10}}
//    />
//    <View style={{marginTop: 10}}>
//      <Text style={styles.artistName}>{name}</Text>
//      <Text style={styles.artistId}>{title}</Text>
//    </View>
//  </TouchableOpacity>;
//  {

//  }
