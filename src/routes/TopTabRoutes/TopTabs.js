import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LastWeekScreen from '../../screens/Contributions/TabScreens/LastWeek'
import LastMonthScreen from '../../screens/Contributions/TabScreens/LastMonth'
import AllTimeScreen from '../../screens/Contributions/TabScreens/AllTime'
import React from 'react'


const Tab = createMaterialTopTabNavigator();
 

const TopTabs = () => {
    return (
      <Tab.Navigator >
        <Tab.Screen name="Today" component={LastWeekScreen} />
        <Tab.Screen name="Week" component={LastMonthScreen} />
        <Tab.Screen name="Month" component={AllTimeScreen} />
      </Tab.Navigator>
    );
}
export default TopTabs