import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../../../Components/CustomHeader/CommonHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';
import HelpLine from '../../../component/HelpLine';
import Icon from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

const index = () => {
  return (
    <View style={styles.maincontainer}>
      <CustomHeader title="Helpline" />
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            paddingBottom: 30,
          }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              We provide support 24/7. Feel free to reach out to us on the
              listed channels.
            </Text>
          </View>
          <HelpLine
            name="Email"
            link="info@napollomusic.com"
            iconName="md-mail"
            onPress={() => Linking.openURL('mailto:info@napollomusic.com')}
          />
          <HelpLine
            name="Twitter"
            link="https://twitter.com/napollomusic?s=21"
            iconName="md-logo-twitter"
            iconColor="#00acee"
            onPress={() =>
              Linking.openURL('https://twitter.com/napollomusic?s=21')
            }
          />
          <HelpLine
            name="Instagram"
            link="https://instagram.com/napollomusic?igshid=1jwpf81ctkw4n"
            iconName="md-logo-instagram"
            iconColor="#8a3ab9"
            onPress={() =>
              Linking.openURL(
                'https://instagram.com/napollomusic?igshid=1jwpf81ctkw4n',
              )
            }
          />
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '20%',
              }}>
              <Icon
                name="discord"
                style={{marginRight: 10}}
                color="#7289da"
                size={scale(20)}
              />
              <Text
                style={{
                  color: '#ddd',
                  fontSize: scale(12),
                  fontFamily: 'Helvetica-Medium',
                }}>
                Discord
              </Text>
            </View>
            <TouchableOpacity
              style={{width: '70%'}}
              activeOpacity={0.8}
              onPress={() => Linking.openURL('https://discord.gg/NU4GATqm')}>
              <Text style={styles.link}>https://discord.gg/NU4GATqm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default index;

const styles = ScaledSheet.create({
  maincontainer: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingVertical: '30@s',
    paddingHorizontal: '20@s',
    borderBottomColor: '#222',
    borderWidth: 0.5,
  },
  headerText: {
    color: '#eee',
    fontSize: '12@s',
    textAlign: 'center',
    letterSpacing: '0.5@s',
    lineHeight: 20,
    fontFamily: 'Helvetica-Bold',
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.061)',
    paddingVertical: 20,
    borderBottomColor: '#f68128',
    // borderBottomColor: '#333',
    borderWidth: 1,
    // borderRadius: 10,
    marginBottom: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'space-between',
  },
  link: {
    color: '#eee',
    fontSize: scale(10),
    textAlign: 'right',
    color: '#f68128',
    fontFamily: 'Helvetica-Medium',
  },
});
