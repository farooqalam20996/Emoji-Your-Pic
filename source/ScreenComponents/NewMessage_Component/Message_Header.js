import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MEssage_Header = (props) => {
     
         return (
            <View style={styles.main} >
                <View style={styles.Frist} >
                    <TouchableOpacity style={styles.Back_Btn} onPress={props.onpress} >
                        <Ionicons name="md-arrow-back" size={18} color="black" />
                    </TouchableOpacity>
                    <Image source={require("../../Imagess/chat_profile.png")} style={{ width:35 , height:35 ,borderRadius:100, marginRight:"5%" }} />
                    <View>
                        <Text style={styles.Profile_Name} >{props.name}</Text>
                        {
                            true ?
                            <Text style={styles.status_txt} >
                                Online
                            </Text>
                            :
                            <Text style={styles.status_txt} >
                                Offline 
                            </Text>
                        }
                    </View>
                </View>
                <View style={styles.Second} >
                    {/* <TouchableOpacity>
                       <Image source={require("../../Imagess/video.png")} style={{ width:45 , height:45 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../../Imagess/phone.png")} style={{ width:15 , height:15 }} />
                    </TouchableOpacity> */}
                </View>
            </View>    
         );
 }
export default MEssage_Header;
 const styles = StyleSheet.create({
     main:{
        width:"100%",
        padding:"1%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#060A16",
     },
     Frist:{
         flexDirection:'row',
         alignItems:"center",
         justifyContent:"flex-start",
         width:"70%",
     },
     Second:{
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"space-around",
         width:"30%"
     },
     Profile_Name:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Medium",
        color:'#FFB81A', 
        textAlign:"left"
     },
     status_txt:{
        fontSize:9,
        lineHeight:11,
        fontFamily:"Light",
        color:'#5B6C9F', 
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