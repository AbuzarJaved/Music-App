import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import CustomHeader from '../../Notifications/component/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import LoginBtn from '../../../Components/Button/LoginBtn';

const {width, height} = Dimensions.get('window');

const Upload_MetaData_Screen = () => {
  const navigation = useNavigation();
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [album, setAlbum] = useState('');
  const [picture, setPicture] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CustomHeader title="Metadata" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ScrollView
              style={{flex: 1, width: '100%'}}
              showsVerticalScrollIndicator={false}>
              {/* GENRE SELECTION */}
              <View style={styles.genre}>
                <Text style={{color: '#eee', marginVertical: 8, fontSize: 15}}>
                  Genre
                </Text>
                <View style={styles.genreCont}>
                  {/* Single Genre */}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setGenre('Hip-Hop')}
                    style={styles.singleGenre}>
                    <Text style={{color: '#eee'}}>Hip-Hop</Text>
                    {genre === 'Hip-Hop' ? (
                      <Image
                        source={require('../../../assests/images/verification.png')}
                        style={{width: 20, height: 20, borderRadius: 20 / 2}}
                      />
                    ) : null}
                  </TouchableOpacity>
                  {/* Single Genre */}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setGenre('Afro-beat')}
                    style={styles.singleGenre}>
                    <Text style={{color: '#eee'}}>Afro-beat</Text>
                    {genre === 'Afro-beat' ? (
                      <Image
                        source={require('../../../assests/images/verification.png')}
                        style={{width: 20, height: 20, borderRadius: 20 / 2}}
                      />
                    ) : null}
                  </TouchableOpacity>
                  {/* Single Genre */}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setGenre('Instrumental')}
                    style={styles.singleGenre}>
                    <Text style={{color: '#eee'}}>Instrumental</Text>
                    {genre === 'Instrumental' ? (
                      <Image
                        source={require('../../../assests/images/verification.png')}
                        style={{width: 20, height: 20, borderRadius: 20 / 2}}
                      />
                    ) : null}
                  </TouchableOpacity>
                  {/* Single Genre */}
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setGenre('R & B')}
                    style={styles.singleGenre}>
                    <Text style={{color: '#eee'}}>R & B</Text>
                    {genre === 'R & B' ? (
                      <Image
                        source={require('../../../assests/images/verification.png')}
                        style={{width: 20, height: 20, borderRadius: 20 / 2}}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              </View>
              {/* Song DESCRIPTION */}
              <View style={styles.genre}>
                <Text style={{color: '#eee', marginVertical: 8, fontSize: 15}}>
                  Song Description
                </Text>
                {/* Description Input */}
                <View style={styles.descriptionInput}>
                  <Text
                    style={{
                      color: '#eee',
                      marginVertical: 8,
                      fontSize: 12,
                      position: 'absolute',
                      right: 10,
                    }}>
                    {description.length}/ 400
                  </Text>

                  <TextInput
                    multiline={true}
                    style={{
                      width: '100%',
                      paddingHorizontal: 10,
                      color: '#eee',
                    }}
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                  />
                </View>
              </View>
              {/* Album Input */}
              {/* Single Input */}
              <View style={styles.genre}>
                <Text style={{color: '#eee', fontSize: 15}}>Album</Text>
                <TextInput
                  style={styles.input}
                  value={album}
                  onChangeText={(val) => setAlbum(val)}
                  // onFocus={() => setErrText('')}
                />
                {/* {errText ? <Text style={styles.errTexts}>{errText}</Text> : null} */}
              </View>
              {/* Album Input */}
              {/* Single Input */}
              <View style={styles.genre}>
                <Text style={{color: '#eee', fontSize: 15}}>
                  Upload Cover Art
                </Text>
                <View style={[styles.input, styles.browseCont]}>
                  <Text style={{color: '#eee', width: '70%', paddingLeft: 5}}>
                    Hello
                  </Text>
                  <TouchableOpacity activeOpacity={0.6} style={styles.btn}>
                    <Text style={{color: '#eee'}}>Browse</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* STEPS */}
              <Text
                style={{
                  color: '#f68128',
                  fontSize: 12,
                  marginVertical: 20,
                  textAlign: 'center',
                }}>
                Step 2 of 3
              </Text>
              {/* NEXT STEP BTN */}
              <View style={styles.stepBtn}>
                <View style={styles.navBtn}>
                  <LoginBtn title="Back" onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.navBtn}>
                  <LoginBtn title="Next" onPress={() => navigation.navigate('Upload_Release')} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Upload_MetaData_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,

    // paddingBottom: 20,
  },
  content: {
    width,
    marginTop: 60,
    height: height,
    flex: 1,
    paddingHorizontal: 30,
    // justifyContent: 'center',
    // paddingBottom:200
  },
  genre: {
    width: '100%',
    marginVertical: 10,
    // alignItems: 'center',
  },
  genreCont: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 160,
    backgroundColor: '#444',
    // marginHorizontal: 30,
    padding: 15,
  },
  singleGenre: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    height: 150,
    backgroundColor: '#444',
    position: 'relative',
  },
  singleInput: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  input: {
    color: '#eee',
    width: '100%',
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  browseCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  btn: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#999',
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

    height: 70,
  },
  navBtn: {
    marginHorizontal: 10,
    width: '45%',
  },
});
