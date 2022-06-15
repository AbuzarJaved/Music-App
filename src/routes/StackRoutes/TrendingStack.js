import {createStackNavigator} from '@react-navigation/stack';
import Trending from '../../screens/Trending/Trending';
import React from 'react';
import Header from '../../Components/CustomHeader/HeaderWithBackBtn';
import Icon from 'react-native-vector-icons/Ionicons';



const Stack = createStackNavigator();

const TrendingStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name="MainTrending"
        component={Trending}
        //         options= {({navigation}) => {
        //     return {
        //       headerTitle: (props) => (
        //         <Header {...props} navigation={navigation} title="Trending" statusBar="light-content"/>
        //       ),
        //       headerTransparent: true,
        //       headerStatusBarHeight: 10,
        //     };
        //   }
        // }
      />
    </Stack.Navigator>
  );
};

export default TrendingStack;



// {{
//           headerTransparent: true,
//           headerLeft: (props) => (
//             <Icon
//               name="ios-menu"
//               size={32}
//               {...props}
//               onPress={(props) => {
//              navigation.dispatch(DrawerActions.openDrawer())
//               }}
//             />
//           ),
      //  }}