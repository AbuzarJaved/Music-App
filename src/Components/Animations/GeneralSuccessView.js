import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckAnim from './CheckAnim';
import {useDispatch, useSelector} from 'react-redux';

const GeneralSuccessView = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.status === true) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        if (props.type) {
          dispatch({
            type: props.type,
          });
        }
        props.changeScreen ? props.changeScreen() : null;
      }, 1000);
    }
  }, [props.status]);

  if (show === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContent}>
        <Text style={styles.text}>{props.message}</Text>
        <CheckAnim width={100} height={100} />
      </View>
    </View>
  );
};

export default GeneralSuccessView;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    // opacity: 0.4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  subContent: {
    borderWidth: 1,
    borderColor: '#222',
    height: '80%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#222',
  },
  text: {
    marginBottom: 20,
    color: '#eee',
    textAlign: 'center',
    fontSize: 16,
  },
});
