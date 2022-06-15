import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Small_Loading_Anim from '../Animations/Small_LoadingAnime';
import {scale, ScaledSheet} from 'react-native-size-matters';

const LoginBtn = props => {
  return (
    <View
      style={[styles.btnContainer, props.width ? {width: props.width} : null]}>
      {props.transparent ? (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          {...props}
          onPress={props.onPress}
          style={[
            styles.btn,
            props.transparent
              ? {
                  backgroundColor: 'transparent',
                  borderColor: '#fff',
                  borderWidth: 2,
                }
              : null,
            props.height ? {height: props.height} : {},
          ]}>
          {props.icon && (
            <Icon
              name={props.icon}
              color="#fff"
              size={24}
              style={{marginRight: 5}}
            />
          )}
          <Text
            style={[
              styles.btnText,
              props.textSize ? {fontSize: props.textSize} : null,
            ]}>
            {props.title}
          </Text>
        </TouchableOpacity>
      ) : (
        <LinearGradient
          colors={['#feee3e', '#f68128', '#f68128']}
          style={[
            styles.btn,
            props.transparent
              ? {
                  backgroundColor: 'transparent',
                  borderColor: '#fff',
                  borderWidth: 2,
                }
              : null,
            props.height ? {height: props.height} : {},
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            {...props}
            onPress={props.onPress}
            style={styles.btn2}>
            {props.icon && (
              <Icon
                name={props.icon}
                color="#fff"
                size={24}
                style={{marginRight: 5}}
              />
            )}

            <Text
              style={[
                styles.btnText,
                props.textSize ? {fontSize: props.textSize} : null,
                !props.icon ? {width: '100%'} : null,
              ]}>
              {props.title}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
};

export default LoginBtn;

const styles = ScaledSheet.create({
  btnContainer: {
    width: '100%',
    marginBottom: 5,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    height: 50,
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
    fontSize: '12@s',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'capitalize',
    letterSpacing: 2,
    // width: '100%',
    // lineHeight: -2,
  },
});
