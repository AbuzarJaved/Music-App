import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  openNotificationFilterModal,
  closeNotificationFilterModal,
} from '../../redux/actions/notificationFilterActions';

// ICONS
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsFilterModal = (props) => {
  const arr2 = [
    {title: 'All Notifications'},
    {title: 'Likes'},
    {title: 'Comments'},
    {
      title: 'Followers',
    },

    {title: 'Mentions'},
    {
      title: 'Contributions',
    },
  ];

  return (
    <View
      style={{
        //   backgroundColor: '#1A1A1A',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        position: 'relative',
      }}>
      <View style={{}}>
        <Text style={styles.filterText}>Filter By:</Text>

        <FlatList
          data={arr2}
          keyExtractor={(item) => item.title}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => props.onPress()}>
                <Text
                  style={{
                    color: '#ddd',
                    marginTop: 3,
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: 'Helvetica-Medium',
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default NotificationsFilterModal;

const styles = StyleSheet.create({
  closeModalIcon: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  filterText: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: '#f68128',
    marginBottom: 10,
  },
});
