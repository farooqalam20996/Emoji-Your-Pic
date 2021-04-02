import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';

 export default class Chat_Card extends Component {
    
     render() {
         return (
            <TouchableOpacity style={styles.main} onPress={this.props.Press} >
                <Text style={styles.Txts}>{this.props.Txt}</Text>
                <Text style={[styles.Txts, {color:"#5B6C9F"}]} >{this.props.Default_Txt}</Text>
            </TouchableOpacity>        
         );
     }
 }
const styles = StyleSheet.create({
    main:{
        width:"100%",
        padding:"4%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:12,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderWidth:1,
        marginBottom:"3%",
    },
    Txts:{
       fontSize:14,
       lineHeight:20,
       fontFamily:"Regular",
       color:'#FFB81A', 
       textAlign:"left"
    }
})