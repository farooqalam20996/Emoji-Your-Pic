import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 export default class NotificationSetting extends Component {
     state = {  }
     render() {
         return (
            <View>
                <Text>
                    Notification Setting Page
                </Text>
            </View>    
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
     }
 })