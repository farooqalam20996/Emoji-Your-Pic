import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons'; 

 const Contact_Card = (props) => {
     
        return (
            <TouchableOpacity disabled={props.invite} style={styles.main} onPress={props.onpress} >
                <View style={{ flexDirection:"row" , alignItems:"center" , justifyContent:'flex-start' }} >
                    <Image source={props.img} style={{ width:35 , height:35 , borderRadius:100, marginRight:"6%" }} />
                    <View>
                    <Text style={styles.Txt} > {props.Name} </Text>
                    <Text style={[styles.Txt, {color:"#FF3B30"}]} > {props.Number} </Text>
                    </View>
                </View>
                {props.invite
                    ?
                    <TouchableOpacity onPress={props.onInvitePress} style={{padding:5,flexDirection:'row'}}>
                        <Text style={{color:'#FFB81A',justifyContent:'center'}}>INVITE</Text>
                        <Ionicons name="add" size={18} color="#FFB81A" />
                    </TouchableOpacity>
                    :
                    <Ionicons name="chatbubble-ellipses" size={24} color="#C63520" />
                }
            
            </TouchableOpacity>
        );
 }
export default Contact_Card

 const styles = StyleSheet.create({
     main:{
         width:"100%",
         height:55,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:'space-between',
         backgroundColor:"#0C1326",
         borderRadius:12,
         borderColor:"#273253",
         borderWidth:1,
         padding:"5%",
         marginBottom:"5%"
     },
     Txt:{
        fontSize:13,
        lineHeight:18,
        fontFamily:"Regular",
        color:'#FFB81A',
        textAlign:"left" 
     }
 })