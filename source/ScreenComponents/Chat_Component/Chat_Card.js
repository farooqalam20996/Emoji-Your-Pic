import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    LogBox,
 } from 'react-native';
// import Swipeable from "react-native-swipeable";
import { SwipeListView } from 'react-native-swipe-list-view';
import {manageDate} from '../../utils/';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
])


const Chat_Card = (props) => {
    
    const Chat = (chat) => {

        var name = chat.data.toName
        var toID = chat.data.toID
        var Photo = chat.data.toPhoto
        if(chat.data.toID == props.id){
            name = chat.data.fromName;
            toID = chat.data.fromID;
            Photo = chat.data.fromPhoto;
        }
        // alert(chat.data.isBlocked)
       
        const navigate = () => {
            props.navigation.navigate('Main_Chat_Screen',{
                person:{
                    id: toID,
                    name:name,
                    image:Photo, 
                    isBlocked: chat.data.isBlocked,
                    blockedBy: chat.data.blockedBy
                },
            })
        }
        const getDate = () => {
            const msg = manageDate(chat.data.lastMessage);
            const today = manageDate(new Date().getTime());
            if(msg.split(",")[0] == today.split(",")[0]){
                return msg.split(",")[1]
            }else{
                return msg.split(",")[0]
            }
        }
        const getLastMessageText = () => {
            var text = chat.data.lastMessageText;
            if(chat.data.lastMessageText.length > 20){
                text = chat.data.lastMessageText.slice(0,25)+"...";
            }
            return text
        }
        if(chat.data.lastMessageText  !== ""){
            return(
                <TouchableWithoutFeedback style={styles.main} onPress={navigate} > 
                    <View style={styles.Under_main} >
                        <View style={{ flexDirection:'row' }} >
                            <TouchableWithoutFeedback onPress={()=>props.onImagePress(Photo,name)}>
                                <Image source={{uri:Photo}} style={{ width:50 , height:50 , borderRadius:100 }} />
                            </TouchableWithoutFeedback>
                            <View style={{ marginLeft:"5%", justifyContent:"center", alignItems:"flex-start" }} >
                                <Text style={styles.Profile_Name}>{name.charAt(0).toUpperCase()+name.substr(1).toLowerCase()}</Text>
                                <Text style={styles.Profile_msg}>{getLastMessageText()}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent:"space-between" , alignItems:"flex-end" }} >
                            <Text style={{ fontSize:10.5 , color:"#FFFFFF" , fontFamily:"Regular" }} > {getDate()} </Text>
                            {!chat.data.read && chat.data.lastMessageBy !== props.id &&
                            <View style={{ alignItems:"center", justifyContent:"center" , width:15 , height:15 , borderRadius:100 , backgroundColor:"#C63520", marginTop:5  }} >
                                {/* <Text style={{ fontSize:9 , color:"#FFFFFF" , fontFamily:"Regular" }} >3</Text> */}
                            </View>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback> 
            )
        }else{
            return <View/>;
        }
        
    }

    return (
        <>
            <SwipeListView
                data={props.chats}
                renderItem={ ({item}, rowMap) => Chat(item)}
                renderHiddenItem={ ({item}, rowMap) => (
                    <View style={{ flexDirection:"row" , alignItems:"center" , justifyContent:"space-between",padding:"5%" }} >
                        <View style={{flexDirection:"row"}} >
                            <TouchableOpacity onPress={() => props.onUnreadPress(item.id)} style={styles.Unread_Style} >
                                <Image source={require('../../Imagess/unsee.png')} style={{ width:15 , height:15 }} />
                                <Text style={[styles.Unread_Txt, {color:"#FFFFFF"}]} >Unread</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={[styles.Unread_Style,{backgroundColor:"#FFB81A", borderColor:"#000000"}]} >
                                <Image source={require('../../Imagess/star.png')} style={{ width:15 , height:15 }} />
                                <Text style={[styles.Unread_Txt, {color:"#0C1326"}]} >Pin fav.</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{flexDirection:"row"}} >
                            {/* <TouchableOpacity style={styles.Unread_Style} >
                                <Image source={require('../../Imagess/archive.png')} style={{ width:15 , height:15 }} />
                                <Text style={[styles.Unread_Txt, {color:"#FFFFFF"}]} >Archive</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => props.onDeletePress(item.id,item.data.deletedBy)} style={styles.Unread_Style} >
                                <Image source={require('../../Imagess/delete.png')} style={{ width:15 , height:15 }} />
                                <Text style={[styles.Unread_Txt, {color:"#FFFFFF"}]} >Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                leftOpenValue={110}
                rightOpenValue={-110}
            />
            
        </>
    );
}
export default Chat_Card
const styles = StyleSheet.create({
    
    main:{
        width:"100%",
    },
    Under_main:{
        padding:"2.5%",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        marginTop:"3%",
    },
    Profile_Name:{
        fontSize:15,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFB81A', 
        textAlign:"left",
    },
    Profile_msg:{
        fontSize:13,
        lineHeight:14,
        fontFamily:"Medium",
        color:'#5B6C9F', 
        textAlign:"left",
        paddingTop:5,
    },
    Unread_Style:{
        width:45,
        height:70,
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
        textAlign:"center"
    }
})