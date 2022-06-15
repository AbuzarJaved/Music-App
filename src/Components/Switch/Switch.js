import React,{useState} from 'react'
import { StyleSheet, Text, View,Switch } from 'react-native'

const Switchs = (props) => {
     const [isEnabled, setIsEnabled] = useState(false);
     const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
      <View style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#f68128'}}
          thumbColor={isEnabled ? '#f68128' : '#eee'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
}
// #f68426
export default Switchs

const styles = StyleSheet.create({})
