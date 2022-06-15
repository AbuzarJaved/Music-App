import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import IconIcon from 'react-native-vector-icons/Ionicons';
import Switch from '../Components/Switch/Switch';
// import {Content} from 'native-base';
import TrendingIcon from '../Components/Icons/TrendingIcon';
import NotificationIcon from '../Components/Icons/NotificationIcon';
import ProfileIcon from '../Components/Icons/ProfileIcon';
import MessageIcon from '../Components/Icons/MessageIcon';
import AnalyticIcon from '../Components/Icons/AnalyticIcon';
import SettingsIcon from '../Components/Icons/SettingIcon';
import ContributionIcon from '../Components/Icons/ContirbutionIcon';
import ReferralIcon from '../Components/Icons/referralIcon';
import {useSelector, useDispatch} from 'react-redux';
import {logout, clearAccessToken} from '../redux/actions/userActions';
import {
  getLoggedInUserProfile,
  mainNumberFormat,
  getFullCountry,
} from '../utils/loggedInUserType';
import {DEFAULT_IMAGE_URI} from '../utils/ImagePicker';
import {loadDataFromStorage} from '../utils/asyncStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';

const DrawerContent = props => {
  // console.log(props, 'DRAWER CONTENT PROPS');
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  const paperTheme = useTheme();
  const signOut = () => {
    dispatch(clearAccessToken());
    dispatch(logout());
    console.log('Logged Out');
  };
  // CUSTOMER PROFILE
  const userData = getLoggedInUserProfile('LISTENER');

  const userLogin = useSelector(state => state.userLogin);
  const {type: userType} = userLogin;
  useEffect(() => {
    const getUserDetails = async () => {
      const userDetail = await loadDataFromStorage('user_Info');
      if (userDetail) {
        setUserDetails(userDetail);
      }
    };
    getUserDetails();
  }, []);
  // const {
  //   firstName,
  //   lastName,
  //   username,
  //   followerCount,
  //   followingCount,
  //   website,
  //   state,
  //   country,
  //   profileUrl,
  // } = userDetails;
  const {
    userProfile: {
      firstName,
      lastName,
      username,
      followerCount,
      followingCount,
      website,
      state,
      country,
      profileUrl,
    },
  } = userData;

  // USER TYPE
  const customerType = useSelector(state => state.customerType);
  const {isArtist} = customerType;

  const linkDetails1 = [
    {
      name: (color, size) => <ProfileIcon color={color} size={size} />,
      title: 'Profile',
    },
    {
      name: (color, size) => <TrendingIcon color={color} size={size} />,
      title: 'Trending',
    },
    // {
    //   name: (color, size) => <ReferralIcon color={color} size={size} />,
    //   title: 'Referrals',
    // },
    // {
    //   name: (color, size) => <NotificationIcon color={color} size={size} />,
    //   title: 'Notification',
    // },
    // {
    //   name: (color, size) => <ContributionIcon color={color} size={size} />,
    //   title: 'Contributions',
    // },

    // {
    //   name: (color, size) => (
    //     <IconIcon color={color} size={size} name="ios-bar-chart" />
    //   ),
    //   title: 'Analytics',
    // },
    {
      name: (color, size) => <ContributionIcon color={color} size={size} />,
      title: 'Support Napollo',
    },
    {
      name: (color, size) => <SettingsIcon color={color} size={size} />,
      title: 'Settings',
    },
  ];
  let stageNameView = null;
  if (userType && userType === 'ARTIST') {
    stageNameView = (
      <Caption style={styles.caption}>{`@${username}` || '@napollo'}</Caption>
    );
  }

  let artistLocationView = null;
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View contentContainerStyle={{flex: 1}}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <Drawer.Section
                // onPress={() => props.navigation.navigate('Profile')}
                style={{flexDirection: 'row', marginTop: 40}}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  activeOpacity={0.8}
                  onPress={() => props.navigation.navigate('Profile')}>
                  {profileUrl === '' || profileUrl === null ? (
                    <View style={styles.thumbNail}>
                      <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                        {firstName ? firstName[0] : null}
                      </Text>
                      <Text style={styles.thumbNailName}>
                        {lastName ? lastName[0] : null}
                      </Text>
                    </View>
                  ) : (
                    <Avatar.Image source={{uri: profileUrl}} size={scale(80)} />
                  )}

                  <View
                    style={{
                      // marginLeft: 15,
                      flexDirection: 'column',
                      position: 'relative',
                      marginLeft: 10,
                    }}>
                    <Title style={styles.title}>
                      {`${firstName} ${lastName}`}
                    </Title>
                    <Caption style={styles.caption}>{`@${username}`}</Caption>

                    <Caption style={[styles.location]}>
                      <Icons name="map-marker-alt" color="#99999F" size={10} />
                      <Text
                        style={{
                          color: '#99999F',
                          fontSize: 10,
                          fontFamily: 'Helvetica-Medium',
                        }}>
                        &nbsp;{`${state}, ${getFullCountry(country)}`}
                      </Text>
                    </Caption>
                  </View>
                </TouchableOpacity>
              </Drawer.Section>

              <View style={styles.row}>
                <View style={styles.section}>
                  <Text style={styles.numbers}>
                    {mainNumberFormat(followerCount)} &nbsp;
                  </Text>
                  <Caption style={styles.follow}>Followers</Caption>
                </View>
                <View style={styles.section}>
                  <Text style={styles.numbers}>
                    {mainNumberFormat(followingCount)} &nbsp;
                  </Text>
                  <Caption style={styles.follow}>Following</Caption>
                </View>
              </View>
            </View>
            {/* Divider */}
            <View
              style={{
                borderWidth: 0.5,
                borderBottomColor: '#333',
                width: '100%',
                marginTop: 10,
              }}></View>
            {/* ROUTE SECTION */}
            <Drawer.Section style={styles.drawerSection}>
              {linkDetails1.map((link, index) => (
                <DrawerItem
                  labelStyle={{marginLeft: -15, fontFamily: 'Helvetica-Bold'}}
                  activeTintColor="#f68126"
                  inactiveTintColor="#fff"
                  key={index}
                  style={{marginVertical: 0}}
                  icon={({color, size}) => link.name(color, size)}
                  label={link.title}
                  onPress={() => {
                    props.navigation.navigate(`${link.title}`, {
                      screen: `${link.title}`,
                    });
                  }}
                />
              ))}
              {/* Divider */}
              <View
                style={{
                  borderWidth: 0.5,
                  borderBottomColor: '#333',
                  width: '100%',
                  marginTop: 10,
                }}></View>
              {/* TOGGLE MODE
              <Drawer.Section>
                <TouchableRipple>
                  <View style={styles.toggleMode}>
                    <Text style={{color: '#99999F', fontSize: 15}}>
                      Dark Theme
                    </Text>
                    <View>
                      <Switch />
                    </View>
                  </View>
                </TouchableRipple>
              </Drawer.Section> */}
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>
      {/* Divider */}
      {/* <View
        style={{
          borderWidth: 0.5,
          borderBottomColor: '#333',
          width: '100%',
          marginTop: 10,
        }}></View> */}

      {/* FOOTER SECTION */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableRipple>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color="#f68126" size={24} />
            )}
            label={({color}) => (
              <Text
                style={{
                  color: '#f68126',
                  fontSize: 15,
                  fontFamily: 'Helvetica-Bold',
                }}>
                Logout
              </Text>
            )}
            onPress={() => {
              signOut();
            }}
          />
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  drawerContent: {
    flex: 1,
    //   paddingHorizontal: 10,
    //   paddingTop: 20,
  },
  userInfoSection: {
    paddingLeft: hp('2.5%'),
  },
  title: {
    fontSize: '13@s',
    marginTop: 3,
    // fontWeight: 'bold',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  caption: {
    fontSize: '10@s',
    lineHeight: 12,
    color: '#F68128',
    backgroundColor: 'transparent',
    textTransform: 'lowercase',
    fontFamily: 'Helvetica-Medium',
  },
  location: {
    // position: 'absolute',
    marginTop: 20,
    bottom: 15,
  },
  row: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  numbers: {
    color: '#f68126',
    fontSize: 13,
    fontFamily: 'Helvetica-Medium',
  },
  follow: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  drawerSection: {
    marginTop: 10,
  },
  toggleMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    // borderTopColor: '#f68126',
    // borderTopWidth: .2,
  },
  thumbNail: {
    width: '80@s',
    height: '80@s',
    borderRadius: '80@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2@s',
  },
  thumbNailName: {
    fontSize: '20@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
});
