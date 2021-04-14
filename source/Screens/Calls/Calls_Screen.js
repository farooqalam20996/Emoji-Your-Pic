import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import { Ionicons } from "@expo/vector-icons";

import Call_Card from "../../ScreenComponents/Call_Component/Call_Card";

 export default class Calls_Screen extends Component {
    
     render() {
         return (
            <View style={styles.main}>
                <Top_Header Heading="Calls" btn={<Ionicons name="call" size={24} color="#FFB81A" />} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Call_Card Profile_Name="Joshua Simone" Profile_msg="Hey, it's good to see you here" />
                </ScrollView>
            </View>

         );
     }
 }

 const styles = StyleSheet.create({
    main:{
       flex:1,
       backgroundColor:"#060A16",
       padding:'6%'
    }
})