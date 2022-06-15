import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeBtn from '../../../Components/Button/LikeButton';

const {width, height} = Dimensions.get('window');

const CommentComponent = ({name, video, image1, image2}) => {
  const [like, setLike] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width: '80%'}}>
        {/* left IMAMGE */}
        <Image
          source={require('../../../assests/images/profile.jpg')}
          style={styles.leftImage}
        />
        {/* TEXT CONTENT */}
        <View>
          <View style={{flexDirection: 'row', maxWidth: 170}}>
            <TouchableOpacity activeOpacity={0.6}>
              <Text numberOfLines={1} style={styles.nameText}>
                {name}&nbsp;
              </Text>
            </TouchableOpacity>
            <Text style={{color: '#eee', fontSize: 13, paddingTop: 2}}>
              commented :
            </Text>
          </View>
          <Text
            // numberOfLines={1}
            style={{
              color: '#eee',
              fontSize: 13,
              width: '70%',
              flexWrap: 'wrap',
            }}>
            Nice song you got here
          </Text>
          <Text style={{color: '#888', fontSize: 12}}>4:32 pm</Text>

          {/* LIKE ICON AND REPLY  */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',

              width: '60%',
            }}>
            <LikeBtn />

            <View>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={{color: '#888', fontSize: 15}}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* SECOND IMAGE */}
      <TouchableOpacity style={styles.rightImageView}>
        <View style={styles.rightImageView}>
          <Image
            source={require('../../../assests/images/caro1.jpg')}
            style={{width: 70, height: 60, borderRadius: 10}}
          />
          {/* CHECKING IF VIDEO OR JUST SONG */}
          {video && (
            <View style={styles.playIconContainer}>
              <Icon name="ios-caret-forward" color="#f68128" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  nameText: {
    color: '#f68128',
    alignSelf: 'flex-start',
    fontSize: 15,
    // paddingTop: 3,
  },
  rightImageView: {
    width: 70,
    height: 60,
    borderRadius: 10,
    position: 'relative',
  },
  playIconContainer: {
    borderColor: '#f68128',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
});
