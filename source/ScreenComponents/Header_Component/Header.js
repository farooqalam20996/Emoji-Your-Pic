import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet
 } from 'react-native';

 export default class Header extends Component {
     state = { 

      }
     render() {
         return (
            <View style={styles.main} >
                <Text style={styles.Heading_Txt} >
                    {this.props.Heading}
                </Text>
                <TouchableOpacity style={styles.btn} >
                    {this.props.btn}
                </TouchableOpacity>

            </View>    
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         width:"100%",
         flexDirection:"row",
         justifyContent:"space-between",
         padding:"5%",
         paddingLeft:'1%',
         paddingRight:'1%',
         paddingBottom:"3%",
        //  backgroundColor:"red"
     },
     Heading_Txt:{
        fontSize:26,
        lineHeight:28,
        fontFamily:"Bold",
        color:'#FFFFFF', 
        textAlign:"left"
     },
     btn:{
         alignItems:"center",
         justifyContent:"center",
         backgroundColor:"#060A16"
     }
 })