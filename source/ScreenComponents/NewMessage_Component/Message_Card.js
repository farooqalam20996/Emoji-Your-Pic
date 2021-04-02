// import React, { Component } from 'react';
import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
 } from 'react-native';
 import { useNavigation } from "@react-navigation/native";


 function Message_Cards(params) {
     const navigation = useNavigation();
    return (
            <TouchableOpacity style={styles.main} onPress={() => navigation.navigate("Main_Chat_Screen") } >
                <View style={styles.container} >
                    <Image source={require("../../Imagess/chat_profile.png")} style={{ width:25 , height:25, marginRight:"5%" }} />
                    <Text style={styles.Profile_name} >Joshua Simone</Text>
                </View>
                {
                    true ?
                    <Text style={styles.Txt} > away </Text>
                    :
                    null
                }
            </TouchableOpacity>
            );
 }
 export default Message_Cards;

//  export default class Message_Card extends Component {
//      state = { 

//       }
//      render() {
//          return (
//             <TouchableOpacity style={styles.main} onPress={this.props.Press} >
//                 <View style={styles.container} >
//                     <Image source={require("../../Imagess/chat_profile.png")} style={{ width:25 , height:25, marginRight:"5%" }} />
//                     <Text style={styles.Profile_name} >Joshua Simone</Text>
//                 </View>
//                 {
//                     true ?
//                     <Text style={styles.Txt} > away </Text>
//                     :
//                     null
//                 }
//             </TouchableOpacity>
//          );
//      }
//  }

 const styles = StyleSheet.create({
     main:{
        width:"100%",
        padding:"5%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        marginBottom:"3%"
     },
     container:{
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"flex-start",
         width:"50%"
     },
     Profile_name:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Regular",
        color:'#FFB81A', 
        textAlign:"left"
     },
     Txt:{
        fontSize:12,
        lineHeight:13,
        fontFamily:"Light",
        color:'#5B6C9F', 
        textAlign:"right"
     }
 })