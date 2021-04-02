import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
 } from 'react-native';
 import Chat_Card from "../../../ScreenComponents/Setting_Component/Card";
 import Setting_Header from "../Setting_Header";
 import Modal_Component from "../../../ScreenComponents/Modal";

 export default class ChatSetting extends Component {
        state={
            show_Export :false,
            show_clear :false,
            show_media :false,
        }

        Toggle_Export=()=>{
            this.setState({ show_Export: !this.state.show_Export })
        }

        Toggle_Clear=()=>{
            this.setState({ show_clear: !this.state.show_clear })
        }

        Toggle_Media=()=>{
            this.setState({ show_media: !this.state.show_media })
        }

     render() {
         return (
             <>
                <View style={styles.main}>
                    <Setting_Header Heading="Chat Setting" onpress={()=> this.props.navigation.goBack()} />
                    <Chat_Card Txt="Export Chat" Press={()=> this.setState({show_Export: true}) }/>
                    <Chat_Card Txt="Clear Chats" Press={()=> this.setState({show_clear: true}) } />
                    <Chat_Card Txt="Save Media" Press={()=> this.setState({show_media: true}) } Default_Txt="Default" />
                </View>
                <Modal_Component visible={this.state.show_Export} drop={this.Toggle_Export} Back={this.Toggle_Export} 
                    item={
                        <Text style={{  color:"yellow" }} > Export Chat </Text>
                } />
                <Modal_Component visible={this.state.show_clear} drop={this.Toggle_Clear} Back={this.Toggle_Clear} 
                    item={
                        <Text style={{  color:"yellow" }} > Clear Chat </Text>
                } />
                <Modal_Component visible={this.state.show_media} drop={this.Toggle_Media} Back={this.Toggle_Media} 
                    item={
                        <Text style={{  color:"yellow" }} > Save Media </Text>
                } />
            </>   
         );
     }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
    Back_Btn:{
        width:20,
        height:20,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:"#FFB81A",
        borderRadius:7,
        marginRight:"5%",
    }
 })