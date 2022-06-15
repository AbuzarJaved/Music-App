import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Divider from '../../../../Components/Divider/Divider';
import SingleSubSettingsCont from '../../component/SingleSubSettings';
import GeneralModal from '../../../../Components/Modal/GeneralModalCont';
import UsernameUpdateCont from './componet/UsernameUpdateCont';
import UserPasswordUpdate from './componet/UserPasswordUpdate';
import {
  CLEAR_UPDATE_USER_USERNAME_STATE,
  CLEAR_UPDATE_USER_PASSWORD_STATE,
  CLEAR_UPGRADE_USER_ACCOUNT_STATE,
} from '../../../../redux/constants/index';
import UpgradeConfirmModal from './componet/UpgradeConfirmModal';

const {width, height} = Dimensions.get('window');

const index = () => {
  const dispatch = useDispatch();
  const userData = getLoggedInUserProfile('LISTENER');
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;
  const [usernameModal, setUsernameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [userType, setUserType] = useState(null);

  console.log(userType, 'SWITCH ');

  useEffect(() => {
    if (type === 'ARTIST') {
      setUserType('LISTENER');
    } else {
      setUserType('ARTIST');
    }
  }, []);

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
      emailAddress,
    },
  } = userData;

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: CLEAR_UPDATE_USER_USERNAME_STATE,
      });
      dispatch({
        type: CLEAR_UPDATE_USER_PASSWORD_STATE,
      });
      dispatch({
        type: CLEAR_UPGRADE_USER_ACCOUNT_STATE,
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <CustomHeader title={`@${username}`} />
      <GeneralModal
        bg="#000"
        animate={true}
        visible={usernameModal}
        closeModal={() => setUsernameModal(false)}>
        <UsernameUpdateCont
          closeUsernameModal={() => setUsernameModal(false)}
        />
      </GeneralModal>
      <GeneralModal
        bg="#000"
        animate={true}
        visible={passwordModal}
        closeModal={() => setPasswordModal(false)}>
        <UserPasswordUpdate closeModal={() => setPasswordModal(false)} />
      </GeneralModal>
      <UpgradeConfirmModal
        visible={upgradeModal}
        closeModal={() => setUpgradeModal(false)}
        type={userType}
        defaultType={type}
      />

      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, flex: 1}}>
          <View style={styles.imgCont}>
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
              <Image style={styles.profileImage} source={{uri: profileUrl}} />
            )}

            <Text style={styles.imgText}> {type}</Text>
            {/* </TouchableOpacity> */}
          </View>
          <View>
            <SingleSubSettingsCont
              title="Update your username"
              text={`@${username}`}
              onPress={() => setUsernameModal(true)}
            />
            <SingleSubSettingsCont
              title="Update your password"
              text="***********"
              onPress={() => setPasswordModal(true)}
            />
            {type === 'ARTIST' ? (
              <SingleSubSettingsCont
                title="Switch account"
                text={`Switch to a ${userType}`}
                onPress={() => setUpgradeModal(true)}
              />
            ) : (
              <SingleSubSettingsCont
                title="Switch account"
                text={`Switch to an ${userType} account`}
                onPress={() => setUpgradeModal(true)}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <Text></Text>
    </View>
  );
};

export default index;

const styles = ScaledSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  thumbNail: {
    width: '100@s',
    height: '100@s',
    borderRadius: '100@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: wp('4%'),
  },
  thumbNailName: {
    fontSize: '25@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '100@s',
    height: '100@s',
    borderRadius: '100@s',
    // marginRight: '10@s',
  },
  imgCont: {
    // backgroundColor: '#900',
    height: '40%',
    alignItems: 'center',
    paddingTop: '30@s',
    borderBottomColor: '#444',
    borderWidth: 0.5,
  },
  imgText: {
    fontSize: '12@s',
    fontFamily: 'Helvetica-Medium',
    marginVertical: 10,
    color: '#f68128',
  },
});
