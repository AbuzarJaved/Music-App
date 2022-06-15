import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import CustomHeader from '../Notifications/component/CustomHeader';
import OptionsContainer from './component/OptionsContainer';
import MusicIcon from '../../Components/Icons/MusicIcon';
import AdIcon from '../../Components/Icons/AdsIcon';
import CloudIcon from '../../Components/Icons/CloudDownloadIcon';
import StreamingIcon from '../../Components/Icons/StreamingIcon';
import Button from '../../Components/Button/LoginBtn';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheets from './component/BottomSheetContent';

const {width, height} = Dimensions.get('window');

const data = [
  {
    icon: () => <AdIcon color="#999" width={75} height={75} />,
    title: 'Ad Free Experience',
  },
  {
    icon: () => <CloudIcon color="#999" width={75} height={75} />,
    title: 'Unlimited Downloads',
  },
  {
    icon: () => <StreamingIcon color="#999" width={75} height={75} />,
    title: 'Higher Streaming Quality ',
  },
  {
    icon: () => <MusicIcon color="#999" width={75} height={75} />,
    title: 'Stream unlimited music and other content',
  },
];

const Premium = () => {
  const options = data.map((data, index) => (
    <OptionsContainer {...data} key={index} />
  ));

  // REF FRO BOTTOM SHEET
  const Bs = useRef(null);

  const fall = new Animated.Value(1);
  const renderContent = () => <BottomSheets onPress={Bs} />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View style={[styles.container, {}]}>
        <CustomHeader title="Premium" />
        {/* BOTTOM SHEET */}
        <BottomSheet
          ref={Bs}
          snapPoints={[320, 0]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
          borderRadius={10}
          renderContent={renderContent}
        />
        <ScrollView
          contentContainerStyle={{width}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          <Animated.View
            style={[
              styles.content,
              {opacity: Animated.add(0.1, Animated.multiply(fall, 0.9))},
            ]}>
            {/* PREMIUM HEADER TEXT */}
            <Text style={styles.headerText}>Why get Premium?</Text>
            {/* BENEFITS */}
            <View style={styles.benefits}>{options}</View>
            {/* Btn */}
            <View style={{width: '85%', marginTop: 20, marginBottom: 20}}>
              <Button title="Continue" onPress={() => Bs.current.snapTo(0)} />
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Premium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    flex: 1,
    marginTop: 70,
    width,
    alignItems: 'center',
  },
  headerText: {
    color: '#eee',
    fontSize: 15,
    marginTop: 30,
    fontFamily: 'Gilroy-Bold',
    textAlign: 'center',
  },
  benefits: {
    width,
    marginTop: 50,
    alignItems: 'center',
  },
});
