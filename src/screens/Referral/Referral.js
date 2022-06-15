import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button/LoginBtn';

const {width, height} = Dimensions.get('window');

const Referral = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.container}>
        <CustomHeader title="Referral" />
        <ScrollView
          contentContainerStyle={{width}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* IMAGE */}
            <View style={styles.image}>
              <Image
                source={require('../../assests/images/playstation5.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            {/* TEXT */}
            <View style={styles.textContent}>
              <Text
                style={{color: '#f68128', fontSize: 20, textAlign: 'center'}}>
                Spread the world!
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'left',
                  marginTop: 30,
                }}>
                Invite your friend to download and us the Napollo Music for a
                chance to win a Sony PlayStation 5(PS5), XBOX, Napollo
                Merchandise items and other numerous gifts up for grabs
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textAlign: 'left',
                  marginTop: 10,
                }}>
                Invite them and let them sign up with your referral code
              </Text>
            </View>
            {/* Napollo Link */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
                // width: '100%',
                // paddingHorizontal: 20,
              }}>
              <View style={[styles.input, styles.browseCont]}>
                <Text style={{color: '#eee', width: '100%', paddingLeft: 5}}>
                  napollomusic/user/12345
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  marginTop: 5,
                }}
                hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}>
                <Icon name="copy-outline" size={28} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  marginTop: 5,
                }}
                hitSlop={{top: 30, right: 30, left: 30, bottom: 30}}>
                <Icon name="ellipsis-vertical" size={28} color="#999" />
              </TouchableOpacity>
            </View>
            {/* BTN */}
            <View style={{width: '90%', marginTop: 70}}>
              <Button title="Invite Now" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    // height,
    marginTop: 10,
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: 30,
  },
  image: {
    width: '80%',
    height: 200,
    marginTop: 50,
  },
  textContent: {
    width: '100%',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    color: '#eee',
    width: '70%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  browseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingHorizontal: 0,
  },
});
