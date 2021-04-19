import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';
 import Chat_Card from "../../../ScreenComponents/Setting_Component/Card";
 import Setting_Header from "../Setting_Header";
 import AwesomeAlert from "react-native-awesome-alerts";
import { API } from '../../../Routes_Navigation/MainURL';
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from "../../../Routes_Navigation/Context";

var axios = require('axios');

 var that;
class AccountSetting extends Component {
        
    state={
        visible:false,
        Loader:false,
        Failed:false,
        showSnack:false
    }

    toggleSnackBar=()=>{
        this.setState({ showSnack: false })
    }
            
    show_Alert = ()=>{
        this.setState({visible: true})
    }

    hide_Alert = ()=>{
        this.setState({visible: false})
    }

    componentDidMount(){
        that = this
    }

    LogOut = async() =>{
        await AsyncStorage.removeItem('user'),
        await AsyncStorage.removeItem('token'),
        this.context.updateState()
    }

    Delete_Account=()=>{
        that.setState({ Loader: true })
        var config = {
        method: 'get',
        url: API+'salvador_app/public/api/deactivate-account',
        headers: { 
            // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcm9qZWN0cy5wYXJhZ29ubG9nby5jb21cL3NhbHZhZG9yX2FwcFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjE4NTE2NDYzLCJleHAiOjE2MTg1MjAwNjMsIm5iZiI6MTYxODUxNjQ2MywianRpIjoiajZJY3B3M3REMkh5R3Q4dSIsInN1YiI6MTM0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.KWldmMGs2MB5Xzx6e3Bwc2YiZj3MtYhlPQdi4vUaioU'
            'Authorization': that.props.token,
        }
        };
        console.log(this.props.token)
        axios(config)
        .then(function (response) {
            if(response.data.success){
                console.log(JSON.stringify(response.data));
                that.LogOut()
            }
            else{
                console.log(JSON.stringify(response.data));
                that.setState({ Failed: true })
                that.hide_Alert()
                that.setState({showSnack:true})

            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    delete_Txt = <Text style={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#C63520', textAlign:"left" }} > DeAcivate Account </Text>

     render() {
        return (
            <View style={styles.main}>
                <Setting_Header Heading="Account Setting" onpress={()=> this.props.navigation.goBack()} />
                <Chat_Card Txt="Edit Account" Press={()=> this.props.navigation.navigate("Edit_Account")} />
                {/* <Chat_Card Txt="Privacy Settings" Press={()=> this.props.navigation.navigate("PrivacySetting")} /> */}
                <Chat_Card Txt="Change Password" Press={()=> this.props.navigation.navigate("Change_Password")} />
                <Chat_Card Txt="Block Accounts" Press={()=> this.props.navigation.navigate("Block_List")} />
                {/* <Chat_Card Txt="Read Receipts" Press={()=> alert("Pressed") } />
                <Chat_Card Txt="Backup Account" Press={()=> alert("Pressed")} /> */}
                <Chat_Card Txt={this.delete_Txt} Press={()=> this.show_Alert()} />

                <AwesomeAlert
                    show={this.state.visible}
                    showProgress={this.state.Loader}
                    progressColor="#FFB81A"
                    title="Account DeAcivate!"
                    titleStyle={{fontSize:16,lineHeight:20,fontFamily:"Bold",color:'#FFB81A', }}
                    message="Are You Sure To DeAcivate"
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
                    confirmText="Yes, DeAcivate!"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hide_Alert()
                    }}
                    onConfirmPressed={() => {
                        this.Delete_Account();
                    }}
                    contentContainerStyle={{ backgroundColor:"#060A16", width:"80%" , height:150 }}
                    // contentStyle={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#FFB81A'  }}

                />

                
                    <Snackbar style={{backgroundColor:"#FF3B30" , width:"90%" , borderRadius:45 }} visible={this.state.showSnack} onDismiss={this.toggleSnackBar}   >
                        <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                            Failed
                        </Text>
                    </Snackbar>
                

            </View>   
         );
     }
 }

 AccountSetting.contextType = AuthContext;

function mapStateToProps(state) {
    return{
        token:state.Login_Reducer.token,
    }
}

 export default connect(mapStateToProps , null)(AccountSetting)

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
 })