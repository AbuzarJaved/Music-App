import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['DisLike', 'like'], // optional
  data: [0.3, 0.7],
};
const chartConfig = {
  backgroundGradientFrom: '#222',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#222',
  backgroundGradientToOpacity: 0.1,
  color: (opacity = 1) => `rgba(246, 129, 40, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  propsForLabels: {
    // r: '6',
    strokeWidth: '0.5',
    stroke: '#fff',
  },
  useShadowColorFromDataset: false, // optional
};

const Progress_Chart = () => {
  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
      style={{
        marginLeft: -30,
        borderRadius: 16,
      }}
    />
  );
};

export default Progress_Chart;

const styles = StyleSheet.create({});
