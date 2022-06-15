import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../Components/IconsContainer/Icons';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import Button from '../../Components/Button/LoginBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import IconsCont from './IconsCont';

const {width, height} = Dimensions.get('window');

const Support_Napollo = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#000" />
        <View style={styles.container}>
          <CustomHeader title="Support Napollo" />
          <ScrollView
            contentContainerStyle={{width}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {/* TEXT VIEW */}
              <View style={styles.textView}>
                {/* <Text style={styles.headerText}>Support Napollo</Text> */}
                <Text style={styles.subText}>
                  Help us empower artists & make music discovery fun again!
                </Text>
                {/* MAIN TEXT */}
                <Text style={styles.mainText}>
                  Napollo is the first black owned & developed music streaming
                  service that is built to change the music landscape. It is
                  solely founded by Sebas(LINK) & designed and developed by
                  Oluwole & 24 Discovery design team&nbsp;
                  {/* <TouchableOpacity> */}
                  <Text
                    onPress={() =>
                      Linking.openURL('https://www.24group.com.ng')
                    }
                    style={{color: '#f68128'}}>
                    (website)
                  </Text>
                  {/* </TouchableOpacity> */}&nbsp;.We've dedicated our all &
                  made substantial sacrifices to get to this point; because we
                  recognize the issues many up & coming artists face. Discovery,
                  monetization, and engagement are the essentials aspects that
                  play a huge role in an artist's success. Our beta is just a
                  preview to what we have in store, we're building the #1
                  community for creatives; and we'd love for you to join!.
                </Text>
              </View>
              {/* HOW TO SUPPORT  */}
              <View style={styles.steps}>
                <View style={styles.support}>
                  <Text style={styles.supportText}>How To Support</Text>
                  <View style={styles.divider} />
                </View>
                {/* STEPS */}
                <View style={styles.step}>
                  {/* Individual Step */}
                  <View style={{marginTop: 25, marginBottom: 20}}>
                    {/* Fist Step */}
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#f68128',
                          fontSize: 15,
                          marginRight: 10,
                        }}>
                        1.
                      </Text>
                      <Text
                        style={{color: '#eee', fontSize: 15, marginRight: 10}}>
                        Follow our social media pages & Sebas on Twitter
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <IconsCont
                        iconName="md-logo-twitter"
                        iconColor="#00acee"
                        onPress={() =>
                          Linking.openURL(
                            'https://twitter.com/napollomusic?s=21',
                          )
                        }
                      />
                      <IconsCont
                        iconName="md-logo-instagram"
                        iconColor="#8a3ab9"
                        onPress={() =>
                          Linking.openURL(
                            'https://instagram.com/napollomusic?igshid=1jwpf81ctkw4n',
                          )
                        }
                      />
                    </View>
                  </View>
                  {/* Individual Step */}
                  <View style={{marginTop: 25, marginBottom: 20}}>
                    {/* Fist Step */}
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#f68128',
                          fontSize: 15,
                          marginRight: 10,
                        }}>
                        2.
                      </Text>
                      <Text
                        style={{color: '#eee', fontSize: 15, marginRight: 10}}>
                        Submit your feedback
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '80%',
                        marginTop: 30,
                        alignSelf: 'center',
                      }}>
                      <Button
                        title="Help us Improve"
                        onPress={() =>
                          Linking.openURL(
                            'https://airtable.com/shrNkFZ09hqsJPBXt',
                          )
                        }
                      />
                    </View>
                  </View>
                  {/* Individual Step */}
                  <View style={{marginTop: 25, marginBottom: 20}}>
                    {/* Fist Step */}
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#f68128',
                          fontSize: 15,
                          marginRight: 10,
                        }}>
                        3.
                      </Text>
                      <Text
                        style={{color: '#eee', fontSize: 15, marginRight: 10}}>
                        Contribute directly to the platform
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '80%',
                        marginTop: 30,
                        alignSelf: 'center',
                      }}>
                      <Button title="Contribute" />
                    </View>
                  </View>
                </View>
              </View>
              {/* Star */}
              <View style={styles.icons}>
                <Icon name="star" color="#f68128" size={15} />
                <Icon name="star" color="#f68128" size={15} />
                <Icon name="star" color="#f68128" size={15} />
              </View>
              {/* THANKS TEXT */}
              <Text style={styles.messageText}>
                We appreciate your contributions!. All contributions will be
                used towards further development and maintenance of Napollo
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Support_Napollo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#000',
  },
  content: {
    width,
    // height,
    // marginTop: 10,
    flex: 1,
  },
  textView: {
    width,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
  },
  subText: {
    color: '#F68128',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    marginTop: 20,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  mainText: {
    color: '#eee',
    textAlign: 'left',
    fontFamily: 'Helvetica-Regular',
    fontSize: 15,
    marginTop: 30,
    width: '100%',
    lineHeight: 20,
  },
  steps: {
    width,
    marginTop: 50,
  },
  support: {
    alignItems: 'center',
    width,
  },
  supportText: {
    color: '#f68128',
    fontSize: 15,
  },
  divider: {
    width: 50,
    height: 5,
    backgroundColor: '#f68128',
    borderRadius: 10,
    marginTop: 10,
  },
  step: {
    // marginTop: 20,
    paddingHorizontal: 20,
  },
  messageText: {
    color: '#f68128',
    paddingHorizontal: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  icons: {
    width,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
