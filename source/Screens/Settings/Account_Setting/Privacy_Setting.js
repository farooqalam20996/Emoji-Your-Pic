import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';
 import Chat_Card from "../../../ScreenComponents/Setting_Component/Card";
 import Setting_Header from "../Setting_Header";
 
 export default class PrivacySetting extends Component {
     
    delete_Txt = <Text style={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#C63520', textAlign:"left" }} > Delete Account </Text>

     render() {
        return (
            <View style={styles.main}>
                <Setting_Header Heading="Privacy Setting" onpress={()=> this.props.navigation.goBack()} />
                <Chat_Card Txt="Edit Account" Press={()=> alert("Pressed")} />
                <Chat_Card Txt="Privacy Settings" Press={()=> alert("Pressed")} />
                <Chat_Card Txt="Blocking" Press={()=> alert("Pressed")} />
                <Chat_Card Txt="Read Receipts" Press={()=> alert("Pressed")} />
                <Chat_Card Txt="Backup Account" Press={()=> alert("Pressed")} />
                <Chat_Card Txt={this.delete_Txt} Press={()=> alert("Pressed")} />
            </View>   
         );
     }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
    Back_Btn:{
        width:20,
        height:20,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:"#FFB81A",
        borderRadius:7,
        marginRight:"5%",
    }
 })