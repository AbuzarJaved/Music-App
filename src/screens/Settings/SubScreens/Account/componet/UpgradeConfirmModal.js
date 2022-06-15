import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {upgrade_User_Account} from '../../../../../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import MainErrorPopUp from '../../../../../Components/Modal/MainErrorPopUp';
import MainSuccessPopUp from '../../../../../Components/Modal/MainSuccessPopUp';
import LoginBtn from '../../../../../Components/Button/LoginBtn';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {CLEAR_UPGRADE_USER_ACCOUNT_STATE} from '../../../../../redux/constants/index';
import {logout} from '../../../../../redux/actions/userActions';

const UpgradeConfirmModal = props => {
  const dispatch = useDispatch();
  const upgradeUserAccount = useSelector(state => state.upgradeUserAccount);

  const {loading, error, status, message} = upgradeUserAccount;
  const upgrade = () => {
    dispatch(upgrade_User_Account(props.type));
  };
  useEffect(() => {
    if (status && status === true) {
      setTimeout(() => {
        props.closeModal();
        dispatch(logout());
      }, 2000);
    }
    // return () => clearTimeout(() => {}, 2000);
  }, [status]);
  // console.log(props.type, 'SWITCH2');
  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      backdropColor="#111"
      isVisible={props.visible}
      onBackdropPress={() => props.closeModal()}>
      <MainErrorPopUp
        clearTime={2000}
        errorState={error}
        clearError={() => dispatch({type: CLEAR_UPGRADE_USER_ACCOUNT_STATE})}>
        {error}
      </MainErrorPopUp>
      <MainSuccessPopUp
        clearSuccess={() => dispatch({type: CLEAR_UPGRADE_USER_ACCOUNT_STATE})}
        successState={message}
        clearTime={2500}>
        {message}
      </MainSuccessPopUp>
      <View style={styles.container}>
        <Text style={styles.confirmText}>Confirm Account Switch</Text>
        {props.defaultType === 'ARTIST' ? (
          <Text style={styles.confirmSubText}>
            Experience Napollo as a {props.type} ?
          </Text>
        ) : (
          <Text style={styles.confirmSubText}>
            Experience Napollo as an {props.type} ?
          </Text>
        )}

        <View style={styles.flexBtn}>
          <LoginBtn
            title="Cancel"
            width="40%"
            onPress={() => props.closeModal()}
            height={scale(35)}
          />
          {loading ? (
            <ActivityIndicator size={scale(30)} color="#F68128" />
          ) : (
            <LoginBtn
              title="Switch"
              width="40%"
              height={scale(35)}
              onPress={() => upgrade()}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UpgradeConfirmModal;

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: '20%',
    height: '40%',
    backgroundColor: '#000',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: '18@s',
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    textAlign: 'center',
  },
  confirmSubText: {
    fontSize: '12@s',
    color: '#fff',
    fontFamily: 'Helvetica-Regular',
    marginVertical: '20@s',
    textAlign: 'center',
    lineHeight: 25,
    // paddingHorizontal: '15@s',
  },
  flexBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height:'30@s'
  },
});
