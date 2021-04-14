import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';
 import Chat_Card from "../../../ScreenComponents/Setting_Component/Card";
 import Setting_Header from "../Setting_Header";
 import AwesomeAlert from "react-native-awesome-alerts";
 
 export default class AccountSetting extends Component {
        
    state={
        visible:false,
    }
            
    show_Alert = ()=>{
        this.setState({visible: true})
    }

    hide_Alert = ()=>{
        this.setState({visible: false})
    }

    delete_Txt = <Text style={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#C63520', textAlign:"left" }} > Delete Account </Text>

     render() {
        return (
            <View style={styles.main}>
                <Setting_Header Heading="Account Setting" onpress={()=> this.props.navigation.goBack()} />
                <Chat_Card Txt="Edit Account" Press={()=> this.props.navigation.navigate("Edit_Account")} />
                <Chat_Card Txt="Privacy Settings" Press={()=> this.props.navigation.navigate("PrivacySetting")} />
                <Chat_Card Txt="Blocking" Press={()=> this.show_Alert()} />
                <Chat_Card Txt="Read Receipts" Press={()=> alert("Pressed")} />
                <Chat_Card Txt="Backup Account" Press={()=> alert("Pressed")} />
                <Chat_Card Txt={this.delete_Txt} Press={()=> alert("Pressed")} />

                <AwesomeAlert
                    show={this.state.visible}
                    showProgress={false}
                    title="Block Account"
                    titleStyle={{fontSize:16,lineHeight:20,fontFamily:"Bold",color:'#FFB81A', }}
                    message="Are You Sure To Block"
                    messageStyle={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#FFB81A' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    cancelButtonStyle={{ backgroundColor:"#C63520" }}
                    cancelButtonTextStyle={{ fontSize:13,lineHeight:16,fontFamily:"Regular",color:'white', }}
                    showConfirmButton={true}
                    confirmButtonStyle={{ backgroundColor:"#FFB81A" }}
                    confirmButtonTextStyle={{ fontSize:13,lineHeight:16,fontFamily:"Regular",color:'#060A16', }}
                    cancelText="No, cancel"
                    confirmText="Yes, Block!"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hide_Alert()
                    }}
                    onConfirmPressed={() => {
                        this.hide_Alert()
                    }}
                    contentContainerStyle={{ backgroundColor:"#060A16", width:"80%" , height:150 }}
                    // contentStyle={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#FFB81A'  }}

                />

            </View>   
         );
     }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
 })