import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DatePickerModal = (props) => {
  const [show, setShow] = useState(false);
  const onChange = (selectedDate) => {
    props.chooseDateOfBirth(moment(selectedDate).format('YYYY-MM-DD'));
    // props.chooseDateOfBirth(moment(selectedDate).format('MMMM Do, YYYY'));
    console.log('USER DOB', moment(selectedDate).format('MMMM Do, YYYY'));
  };

  const onPressCancel = () => {
    // props.chooseDateOfBirth('');
    props.closeModal();
  };
  const onPressDone = () => {
    props.chooseDateOfBirth(selectedDate);
    props.closeModal();
  };

  const onAndroidChange = (e, selectedDate) => {
    props.closeModal();
    if (selectedDate) {
      props.chooseDateOfBirth(moment(selectedDate));
    }
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || props.dob;
    setShow(Platform.OS === 'ios');
    props.chooseDateOfBirth(moment(currentDate));
    // setDate(currentDate);
  };

  // const renderPicker = () => {
  //   <DateTimePicker
  //     timeZoneOffsetInMinutes={0}
  //     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
  //     mode="date"
  //     value={new Date(props.dob)}
  //     minimumDate={
  //       new Date(moment().subtract(120, 'years').format('MMMM Do, YYYY'))
  //     }
  //     maximumDate={new Date(moment().format('MMMM Do, YYYY'))}
  //     onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}

  //   />;
  // };

  return (
    <View style={styles.textInput}>
      <Text
        style={{
          fontFamily: 'Helvetica-Reglar',
          color: '#eee',
          fontSize: 13,
        }}>
        {props.dob}
      </Text>
      {/* {Platform.OS !== 'ios' && props.visible === true && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          mode={"date"}
          value={new Date(props.dob)}
          minimumDate={
            new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
          }
          maximumDate={new Date(moment().format('YYYY-MM-DD'))}
          onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
        />
      )} */}
      {/* {props.visible && ( */}
      <DateTimePickerModal
        isVisible={props.visible}
        mode="date"
        timeZoneOffsetInMinutes={0}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        // value={new Date(props.dob)}
        minimumDate={
          new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))
        }
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onConfirm={onChange}
        onCancel={onPressCancel}
      />
      {/* )} */}

      <Icon
        name="chevron-down"
        size={18}
        onPress={() => props.openModal()}
        style={[styles.inputIcon, {color: '#999'}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    position: 'absolute',
    top: 0,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: 'Gilroy-light',
    backgroundColor: '#161616',
    textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
});

export default DatePickerModal;

//  {
//    Platform.OS === 'ios' && (
//      <Modal
//        transparent={true}
//        visible={props.visible}
//        animationType="slide"
//        supportedOrientations={['portrait']}
//        onRequestClose={() => props.closeModal()}>
//        <View style={{flex: 1}}>
//          <TouchableHighlight
//            style={{
//              flex: 1,
//              alignItems: 'flex-end',
//              flexDirection: 'row',
//            }}
//            activeOpacity={1}
//            onPress={() => props.closeModal()}
//            visible={props.visible}>
//            <TouchableHighlight
//              underlayColor={'#fff'}
//              style={{
//                flex: 1,
//                borderTopColor: '#E9E9E9',
//                borderTopWidth: 1,
//              }}>
//              <View
//                style={{
//                  overflow: 'hidden',
//                  backgroundColor: '#fff',
//                  height: 256,
//                }}>
//                <View style={{marginTop: 20}}>
//                  {renderPicker()}
//                  <TouchableHighlight
//                    underlayColor={'transparent'}
//                    onPress={() => onPressCancel()}
//                    style={[styles.btnText, styles.btnCancel]}>
//                    <Text>Cancel</Text>
//                  </TouchableHighlight>
//                  <TouchableHighlight
//                    underlayColor={'transparent'}
//                    onPress={() => onPressDone()}
//                    style={[styles.btnText, styles.btnDone]}>
//                    <Text>Done</Text>
//                  </TouchableHighlight>
//                </View>
//              </View>
//            </TouchableHighlight>
//          </TouchableHighlight>
//        </View>
//      </Modal>
//    );
//  }

{
  /* {props.visible && (
      <DateTimePicker
        style={{width: '100%'}}
        //   style={{height: 400, width: 300, position: 'absolute', top: 30}}
        testID="dateTimePicker"
        value={new Date(props.dob)}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange2}
      />
       )}  */
}
