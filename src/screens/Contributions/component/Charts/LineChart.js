import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Swim', 'Bike', 'Run'], // optional
  data: [0.4, 0.6, 0.8],
};
const chartConfig = {
  backgroundGradientFrom: '#222',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#222',
  backgroundGradientToOpacity: 0.1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Line_Chart = () => {
  return (
    <LineChart
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={screenWidth - 30} // from react-native
      height={200}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        marginVertical: 10,
        borderRadius: 5,
      }}
    />
  );
};

export default Line_Chart;

const styles = StyleSheet.create({});
