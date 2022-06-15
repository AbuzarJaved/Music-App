import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';
import SingleSubSettingsCont from '../../component/SingleSubSettings';
import {useNavigation} from '@react-navigation/native'

const {width, height} = Dimensions.get('window');

const index = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <CustomHeader title="About Napollo" />
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}>
          <View style={styles.imgCont}>
            <Image
              style={styles.profileImage}
              source={require('../../../../assests/images/Logo2.png')}
            />
            <Text style={styles.imgText}>Napollo</Text>
          </View>
          <View style={{flex: 1}}>
            <SingleSubSettingsCont
              title="App version"
              text="Current version"
              version="1.0"
            />

            <SingleSubSettingsCont
            onPress={() => navigation.navigate('HelpLine')}
              title="Helpline"
              text="Our contact details"
            />
            <SingleSubSettingsCont
              title="Feedbacks"
              text="Our users feedbacks"
              onPress={() =>
                Linking.openURL('https://airtable.com/shrNkFZ09hqsJPBXt')
              }
            />
            <SingleSubSettingsCont
              onPress={() =>
                Linking.openURL(
                  'https://www.notion.so/Napollo-FAQ-s-ec17beaf05894979b04863773ab44e9d',
                )
              }
              title="FAQ"
              text="Frequently asked questions"
            />
            <SingleSubSettingsCont
              onPress={() =>
                Linking.openURL('https://airtable.com/shr29Bdc6r2XY7GJzd')
              }
              title="Violations Reports"
              text="Submit report "
            />
            <SingleSubSettingsCont
              title="Privacy policy"
              text="Our privacy policies"
            />
            <SingleSubSettingsCont
              title="Terms & Conditions"
              text="Our terms and conditions"
            />
          </View>
        </ScrollView>
      </View>
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
  imgCont: {
    // height: '40%',
    alignItems: 'center',
    paddingTop: '30@s',
    borderBottomColor: '#222',
    borderWidth: 0.5,
    paddingBottom: '40@s',
    // flex: 1,

    // alignSelf: 'center',
  },
  profileImage: {
    width: '100@s',
    height: '100@s',
    borderRadius: '100@s',
    // marginRight: '10@s',
  },
  imgText: {
    fontSize: '15@s',
    fontFamily: 'Helvetica-Bold',
    marginVertical: 10,
    color: '#eee',
    letterSpacing: 0.5,
  },
});
