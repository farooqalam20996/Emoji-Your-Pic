import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
 } from 'react-native';

 export default class Setting_Card extends Component {
     
     render() {
         return (
            <TouchableOpacity style={styles.main} onPress={this.props.Press} >
                <Text style={styles.Txts}>{this.props.Txt}</Text>
            </TouchableOpacity>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         width:"100%",
         padding:"4%",
         borderRadius:12,
         backgroundColor:"#0C1326",
         borderColor:"#273253",
         borderWidth:1,
         alignItems:"flex-start",
         marginBottom:"5%"
     },
     Txts:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Regular",
        color:'#FFB81A', 
        textAlign:"left"
     }
 })