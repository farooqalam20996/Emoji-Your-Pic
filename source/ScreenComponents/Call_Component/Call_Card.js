import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
 } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { SwipeListView } from "react-native-swipe-list-view";

export default class Call_Card extends Component {
    state = { 
        listViewData: Array(3)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: ` ${i}` }))
     }

     Tareekh = new Date().getHours()+ ":"+ new Date().getSeconds()

     render() {
        return (
            // <TouchableOpacity style={styles.main} > 
            //    <View style={{ flexDirection:'row' }} >
            //     <Image source={require("../../Imagess/chat_profile.png")} style={{ width:60 , height:60 , borderRadius:100 }} />
            //     <View style={{ marginLeft:"3%", justifyContent:"space-around", alignItems:"flex-start" }} >
            //         <Text style={styles.Profile_Name}>{this.props.Profile_Name} </Text>
            //        {
            //            false ?
            //            <View style={{ alignItems:"center" , flexDirection:'row' , justifyContent:"space-around" }} >
            //                 <Ionicons name="call" size={14} color="#5B6C9F" />
            //                 <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#5B6C9F" }} >Outgoing</Text>
            //                 <View style={{width:5 , height:5 , borderRadius:100 , backgroundColor:"#5B6C9F"}}/>
            //                 <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#5B6C9F" }}>Duration: 5:40</Text>
            //             </View>
            //             :
            //             <View style={{ alignItems:"center" , flexDirection:'row' , justifyContent:"space-around" }} >
            //                 <Ionicons name="call" size={14} color="#C63520" />
            //                 <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#C63520" }} >missed call</Text>
            //             </View>
            //        }
            //     </View>
            //    </View>
            //     <View style={{ justifyContent:"space-between" , alignItems:"flex-end" }} >
            //         <Text style={{ fontSize:9 , color:"#FFFFFF" , fontFamily:"Regular" }} > {this.Tareekh} </Text>
            //         <View style={{ alignItems:"center", justifyContent:"center" , width:15 , height:15 , borderRadius:100 , backgroundColor:"#C63520"  }} >
            //             <Text style={{ fontSize:9 , color:"#FFFFFF" , fontFamily:"Regular" }} >1</Text>
            //         </View>
            //     </View>
            // </TouchableOpacity>    

            <SwipeListView
                data={this.state.listViewData}
                renderItem={ (data, rowMap) => (
                    <TouchableWithoutFeedback onPress={() => alert("Pressed")} >
                        <View style={styles.main} > 
                            <View style={{ flexDirection:'row' }} >
                                <Image source={require("../../Imagess/chat_profile.png")} style={{ width:60 , height:60 , borderRadius:100 }} />
                                <View style={{ marginLeft:"3%", justifyContent:"space-around", alignItems:"flex-start" }} >
                                    <Text style={styles.Profile_Name}>{this.props.Profile_Name} </Text>
                                    {
                                        false ?
                                        <View style={{ alignItems:"center" , flexDirection:'row' , justifyContent:"space-around" }} >
                                            <Ionicons name="call" size={14} color="#5B6C9F" />
                                            <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#5B6C9F" }} >Outgoing</Text>
                                            <View style={{width:5 , height:5 , borderRadius:100 , backgroundColor:"#5B6C9F"}}/>
                                            <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#5B6C9F" }}>Duration: 5:40</Text>
                                        </View>
                                        :
                                        <View style={{ alignItems:"center" , flexDirection:'row' , justifyContent:"space-around" }} >
                                            <Ionicons name="call" size={14} color="#C63520" />
                                            <Text style={{ fontSize:9 , fontFamily:"Light" ,color:"#C63520" }} >missed call</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{ justifyContent:"space-between" , alignItems:"flex-end" }} >
                                <Text style={{ fontSize:9 , color:"#FFFFFF" , fontFamily:"Regular" }} > {this.Tareekh} </Text>
                                <View style={{ alignItems:"center", justifyContent:"center" , width:15 , height:15 , borderRadius:100 , backgroundColor:"#C63520"  }} >
                                    <Text style={{ fontSize:9 , color:"#FFFFFF" , fontFamily:"Regular" }} >{data.item.text}</Text>
                                </View>
                            </View>
                        </View> 
                    </TouchableWithoutFeedback>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={{ alignItems:"flex-end",padding:"3%" }} >
                    <TouchableOpacity style={styles.Unread_Style} >
                        <Image source={require('../../Imagess/delete.png')} style={{ width:15 , height:18 }} />
                        {/* <Text style={[styles.Unread_Txt, {color:"#FFFFFF"}]} >Delete</Text> */}
                    </TouchableOpacity>
                </View>
            )}
            rightOpenValue={-60}
            disableRightSwipe={true}
        />
        );
    }
}

const styles = StyleSheet.create({
    main:{
        width:"100%",
        height:80,
        padding:"5%",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        marginTop:"3%"
    },
    Profile_Name:{
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFB81A', 
        textAlign:"left"
    },
    Profile_msg:{
        fontSize:13,
        lineHeight:14,
        fontFamily:"Medium",
        color:'#5B6C9F', 
        textAlign:"left"
    },
    Unread_Style:{
        width:45,
        height:55,
        padding:"5%",
        // flexDirection:"row",
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:"#FF3B30",
        borderRadius:12,
        borderColor:"#00000000",
        borderWidth:1,
        marginTop:"3%"
    },
    Unread_Txt:{
        fontSize:9,
        lineHeight:13,
        fontFamily:"Light",
    }
})