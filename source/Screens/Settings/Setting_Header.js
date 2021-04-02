import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons'; 

 export default class Header extends Component {
     
     render() {
         return (
            <View style={styles.main} >
                 <TouchableOpacity style={styles.Back_Btn} onPress={this.props.onpress} >
                    <Ionicons name="md-arrow-back" size={18} color="black" />
                </TouchableOpacity>
                <Text style={styles.Heading_Txt} >
                    {this.props.Heading}
                </Text>
            </View>    
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         width:"100%",
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"flex-start",
         padding:"5%",
         paddingLeft:'1%',
         paddingRight:'1%',
     },
     Heading_Txt:{
        fontSize:20,
        lineHeight:30,
        fontFamily:"Bold",
        color:'#FFB81A', 
        textAlign:"left"
     },
     Back_Btn:{
         marginRight:"3%",
         width:20,
         height:20,
         alignItems:"center",
         justifyContent:'center',
         backgroundColor:"#FFB81A",
         borderRadius:7,
         marginRight:"5%",
     }
 })