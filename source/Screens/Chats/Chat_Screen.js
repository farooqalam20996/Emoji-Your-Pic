import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import { AntDesign } from "@expo/vector-icons";
import Chat_Card from "../../ScreenComponents/Chat_Component/Chat_Card";

 export default class Chats_Screen extends Component {
     
     render() {
         return (
            <View style={styles.main}>
                <Top_Header Heading="Chat" btn={<AntDesign name="search1" size={24} color="#FFB81A" onPress={()=> this.props.navigation.navigate("Search")} />} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Chat_Card Profile_Name="Joshua Simone" Profile_msg="Hey, it's good to see you here" onpress={()=> this.props.navigation.navigate("Main_Chat_Screen")} />
                </ScrollView>
            </View>

         );
     }
 }

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%"
     }
 })