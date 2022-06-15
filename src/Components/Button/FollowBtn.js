import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  follow_Artist,
  unFollow_Artist,
  addToFollowersList,
  removeFromFollowersList,
} from '../../redux/actions/userActions';

const FollowBtn = props => {
  const dispatch = useDispatch();
  const [userFollowers, setUserFollowers] = useState(props.followerCount);
  const userFollowerList = useSelector(state => state.userFollowerList);
  const storeUserFollowerList = useSelector(
    state => state.storeUserFollowerList,
  );
  const {followerList} = storeUserFollowerList;
  // const {followerList, status} = userFollowerList;

  const checkStatus = () => {
    if (followerList.includes(props.id)) {
      return true;
    } else {
      return false;
    }
  };
  const value = checkStatus();

  const toggleFollow = () => {
    if (followerList.includes(props.id)) {
      dispatch(unFollow_Artist(props.id));
      dispatch(removeFromFollowersList(props.id));
      if (userFollowers > 0) {
        setUserFollowers(userFollowers - 1);
        props.decrease();
      }
    } else {
      dispatch(follow_Artist(props.id));
      dispatch(addToFollowersList(props.id));
      setUserFollowers(userFollowers + 1);
      props.increase();
    }
  };
  return (
    <>
      {value ? (
        <LinearGradient
          colors={['#feee3e', '#f68128', '#f68128']}
          style={[
            styles.btn,
            props.height ? {height: props.height} : {},
            props.style,
          ]}>
          <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            {...props}
            onPress={() => toggleFollow()}
            style={styles.btn2}>
            <Text
              style={[
                styles.btnText,
                props.textSize ? {fontSize: props.textSize} : null,
              ]}>
              {props.title2}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          {...props}
          onPress={() => toggleFollow()}
          style={[styles.btn3, props.style]}>
          <Text
            style={[
              styles.btnText,
              props.textSize ? {fontSize: props.textSize} : null,
            ]}>
            {props.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default FollowBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    marginBottom: 5,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    height: 35,
    // borderWidth: 1,
    // padding: 12,
    alignSelf: 'center',
    backgroundColor: '#f68128',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
    // width: '100%',
    // lineHeight: -2,
  },
  btn3: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F68128',
    height: 35,
    borderRadius: 5,
    letterSpacing: 0,
  },
});
