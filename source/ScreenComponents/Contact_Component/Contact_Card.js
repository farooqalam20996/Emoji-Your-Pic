import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
 } from 'react-native';
 import { Ionicons } from '@expo/vector-icons'; 

 export default class Contact_Card extends Component {
     
     render() {
         return (
             <TouchableOpacity style={styles.main} onPress={this.props.onpress} >
                 <View style={{ flexDirection:"row" , alignItems:"center" , justifyContent:'flex-start' }} >
                     <Image source={this.props.img} style={{ width:35 , height:35 , borderRadius:100, marginRight:"6%" }} />
                     <View>
                        <Text style={styles.Txt} > {this.props.Name} </Text>
                        <Text style={[styles.Txt, {color:"#FF3B30"}]} > {this.props.Number} </Text>
                     </View>
                 </View>
                <View style={{ flexDirection:"row" , alignItems:"center", justifyContent:"space-between" }} >
                    <TouchableOpacity>
                        <Ionicons name="chatbubble-ellipses" size={24} color="#C63520" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Ionicons name="call" size={24} color="#FFB81A" />
                    </TouchableOpacity> */}
                </View>
             </TouchableOpacity>
         );
     }
 }

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