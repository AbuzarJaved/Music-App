import React from 'react';
import {StyleSheet, Text, TextComponent, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';


const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#f68128',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#f68128',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#f68128',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#f68128',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#f68128',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: '#f68128',
};

const StepIndicators = (props) => {
  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={props.position}
      direction="horizontal"
      stepCount={2}
      labels={['Step 1', 'Final Step']}
    />
  );
};

export default StepIndicators;

const styles = StyleSheet.create({});
