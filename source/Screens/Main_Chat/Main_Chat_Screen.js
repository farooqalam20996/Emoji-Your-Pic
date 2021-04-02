// import React, { useState } from 'react';
import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
 } from 'react-native';
 
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Message_Header from "../../ScreenComponents/NewMessage_Component/Message_Header";

const chat = [];

export default class Chatting extends Component {
    state = { 
        Name:"Erica Richter",
        InputTxt:"",
        demo:false,
        Show_Reviews:false,
        Review_To:"Adam L.",
        Review_Val:0,
        Review_Text:"",
        Review_From:"Erica Jim",
        Review_change:true,
        keyboardSpace:0
     } 

    hrs = new Date().getHours();
    min = new Date().getMinutes();

    chatReply = () => {
        chat.push({
            id:"1",
            comment:this.state.InputTxt
        });
        this.setState({ demo: !this.state.demo })
    };

    render() {
        return (
            <>
                <View style={styles.Chat_Head} >
                    <Message_Header onpress={()=> this.props.navigation.goBack()} />
                </View>
                    <View style={styles.main} >
                    <View style={styles.First} >
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={styles.Reciever} >
                            <Text>Image</Text>
                            <View style={{ width:'100%',height:'auto',}} >
                                <View style={styles.Msg_Container_Reciever} >
                                    <Text style={[styles.Txt_Message,{color:"#000000"}]} >
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.
                                    </Text>
                                </View>
                                <View style={{alignSelf:"flex-end"}} >
                                    <Text style={{fontFamily:"Regular"}} > {this.hrs}:{this.min} </Text>
                                </View>
                            </View>
                           
                            {/* <AntDesign name="down" size={14} color="white" style={{ marginTop:'1.5%', position:"absolute", marginLeft:'85%'}} >
                            </AntDesign> */}
                        </View>
                        
    
                        {
                            chat.map((c) => (
                                <View style={styles.Sender} key={c.id} >
                                <View style={{ width:'100%',height:'auto',}}>
                                  <View style={styles.Msg_Container_Sender} >
                                          <Text style={[styles.Txt_Message,{color:"#000000"}]}  >
                                                  {c.comment}
                                          </Text>
                                      </View>    
                                      <View style={{alignSelf:"flex-start"}} >
                                              <Text style={{fontFamily:"Regular"}}> {this.hrs}:{this.min} </Text>
                                      </View>
                                </View>
                                    <Text>image</Text>
                                  {/* <AntDesign name="down" size={14} color="black" style={{ marginTop:'1%', marginLeft:'1.5%', position:"absolute", marginLeft:'-85%'}} > */}
                                      {/* {menu_item} */}
                                  {/* </AntDesign> */}
                              </View>               
          
                            ))
                        }
                       
                       
    
                    </ScrollView>
                </View>
                
                    <View style={styles.Outer_Area}>
                       
                        <TouchableOpacity style={styles.trigger} onPress={()=> this.props.navigation.navigate("Camera_Screen")}>
                            <Image source={require("../../Imagess/camera.png")} style={{width:'50%' , height:"50%"}} />
                        </TouchableOpacity>

                        <TextInput  
                            style={styles.Input_style}
                            value={this.state.InputTxt}
                            onChangeText={(text)=> this.setState({InputTxt: text})}
                            placeholder="Type to start chat"
                            placeholderTextColor="#FFFFFF"
                            clearTextOnFocus={true}
                            autoFocus={true}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity style={styles.trigger} onPress={this.chatReply} >
                            <Image source={require("../../Imagess/send.png")} style={{width:'50%' , height:"50%"}} />
                        </TouchableOpacity>
                    </View>
              
                </View>
            
                
                    
         </>
        );
    }
}



const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        // padding:'5%',
    },
    Chat_Head:{
        width:"100%",
        // height:130,
        justifyContent:'center',
        padding:'5%',
        paddingBottom:'1%',
        borderBottomColor:"#060A16",
        borderBottomWidth:2,
        backgroundColor:"#060A16"
    },
    First:{
        width:'100%',
        flex:1,
        backgroundColor:"#060A16",
    },
    Outer_Area:{
        width:"100%",
        height:47,
        backgroundColor:"#7676801F",
        alignItems:"center",
        flexDirection:'row',
        // justifyContent:"",
        alignSelf:"flex-end",
    },
    Input_style:{
        width:"80%",
        height:45   ,
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        alignItems:"center",
        paddingLeft:"3%",
        fontFamily:'Regular',
        fontSize:14,
        color:'#FFFFFF',
        letterSpacing:0,
        lineHeight:16
    },
    trigger:{
        backgroundColor:'#0C1326',
        width:35,
        height:35,
        borderRadius:8,
        justifyContent:'center',
        alignItems:"center",
    },
    Reciever:{
        flexDirection:'row',
        justifyContent:'center',
        padding:'10%'
    },
    Sender:{
        flexDirection:'row',
        justifyContent:'center',
        padding:'10%',
    },
    Msg_Container_Reciever:{
        width:'100%',
        height:'auto',
        backgroundColor:'#C63520',
        borderRadius:12,
        marginLeft:"3%",
        padding:'5%'
    },
    Txt_Message:{
        fontFamily:'Regular',
        fontSize:13,
        letterSpacing:0,
        lineHeight:15,
        textAlign:'left'
    },
    Msg_Container_Sender:{
        width:'100%',
        height:'auto',
        backgroundColor:'#FFB81A',
        borderRadius:12,
        padding:'5%'
    },
    Review_Btn:{
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#2E8BFF",
        borderRadius:8,
    },
   
})


