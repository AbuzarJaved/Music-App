import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import LoginBtn from '../../Components/Button/LoginBtn';
import AppIntroSlider from 'react-native-app-intro-slider';
import OnBoarding1 from '../../assests/images/onBoarding1.png';
import OnBoarding4 from '../../assests/images/onBoarding4.png';
import OnBoarding2 from '../../assests/images/onBoarding2.png';
import OnBoarding3 from '../../assests/images/onBoarding3.png';
import OnBoarding5 from '../../assests/images/onBoarding7.jpg';
import UploadIcon from '../../Components/Icons/UploadIcon';
import StreamingIcon from '../../Components/Icons/StreamingIcon';
import {useSelector, useDispatch} from 'react-redux';
import {setCustomerType} from '../../redux/actions/getGenreActions'

const {width, height} = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Title 1',
    text: 'Welcome To Napollo Music App',
    image: OnBoarding3,
    
    // backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Title 2',
    text: 'Online Music Streaming',
    image: OnBoarding1,
    icon1: StreamingIcon,
    // backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'Rocket guy',
    text: 'Upload your song as an Artist',
    image: OnBoarding2,
    image2: OnBoarding4,
    btn: true,
    icon: UploadIcon,
    // backgroundColor: '#22bcb5',
  },
  {
    key: '4',
    title: 'Rocket guy',
    text1: 'Get Started with Napollo Music',
    image: OnBoarding5,
    noImage: true,
    showBtn: true,
    // backgroundColor: '#22bcb5',
  },
];

const OnBoarding = ({navigation}) => {
  const showRealApp = useState(false);
 const dispatch = useDispatch();
  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ImageBackground
          style={[styles.slide, item.noImage ? {height, width} : {}]}
          source={item.image2 ? item.image2 : item.image}
          //   blurRadius={1}
          resizeMode="cover">
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#000',
              opacity: 0.6,
            }}
          />
          {/* <Text style={styles.title}>{item.title}</Text> */}
          {item.noImage ? null : (
            <Image source={item.image} style={styles.miniImage} />
          )}
          {item.text1 && <Text style={styles.title}>{item.text1}</Text>}
          {item.showBtn && (
            <View style={styles.authBtn}>
              <LoginBtn title="Get Started" onPress={onDone1} />
              {/* <View style={{marginTop: 30}}>
                <LoginBtn
                  title="Listener"
                  transparent={true}
                  coloured={true}
                  onPress={onDone1}
                />
              </View> */}
            </View>
          )}
        </ImageBackground>
        <Text style={styles.text}>{item.text}</Text>
        {item.icon && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <UploadIcon color="#f68128" width={50} height={50} />
          </View>
        )}
        {item.icon1 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <StreamingIcon color="#f68128" width={50} height={50} />
          </View>
        )}
      </View>
    );
  };
  const onDone = () => {
    navigation.navigate('Artist_SignIn');
  };
  const onDone1 = () => {
    dispatch(setCustomerType())
    navigation.navigate('Artist_SignIn');
  };
  const onSkip = () => {
    navigation.navigate('Artist_SignIn');
  };
  return (
    <AppIntroSlider
      onSkip={onSkip}
      skipLabel="Skip"
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      dotStyle={{backgroundColor: 'rgba(100,100,100,0.9)'}}
      activeDotStyle={{backgroundColor: 'rgba(246,129,40,1)'}}
      // showSkipButton={true}
    />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height: height / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniImage: {
    width: width / 1.2,
    height: '60%',
    borderRadius: 20,
  },
  text: {
    color: '#999',
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'center',
    fontFamily: 'Gilroy-ExtraBold',
  },
  title: {
    color: '#ddd',
    fontSize: 50,
    marginLeft: 20,
    textAlign: 'center',
    fontFamily: 'Gilroy-ExtraBold',
    marginTop: -100,
  },
  authBtn: {
    position: 'absolute',
    bottom: '15%',
    width: '82%',
    // marginTop: 50,
  },
});
