import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';
 import Chat_Card from "../../../ScreenComponents/Setting_Component/Card";
 import Setting_Header from "../Setting_Header";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { API } from '../../../Routes_Navigation/MainURL';
import AuthContext from '../../../Routes_Navigation/Context';
var axios = require('axios');
var FormData = require('form-data');
import Spinner from "react-native-loading-spinner-overlay";

 var that;

class EmojiSetting extends Component {
        
    state={
        spinner:false,
        created: false,
        visible:false,
        token:'',
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    componentDidMount(){
        that = this;
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkCreated()
        })
        AsyncStorage.getItem('emojiToken',(err,data)=>{
            this.setState({token:JSON.parse(data)})
        })
    }
    checkCreated = () => {
        // if(this.props.user.face_id){
        //     this.setState({created:true})
        // }else{
        //     this.setState({created:false})
        // }
    }
    onCreatePress = () => {
        this.props.navigation.navigate('CreateEmoji');
    }
  
    onRemovePress = async () => {
        // await AsyncStorage.removeItem('faceID');
        // this.checkCreated()
        this.toggleAlert()
        this.setState({spinner:true})
        var data = new FormData();
        data.append('face_id', this.props.user.face_id );

        var config = {
            method: 'post',
            url: 'https://mirror-ai.p.rapidapi.com/delete_face',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded', 
                'x-token': this.state.token, 
                'x-rapidapi-key': '3ca768db05mshf967ccfe8d3d836p153cabjsnce21c5e3d1cc', 
                'x-rapidapi-host': 'mirror-ai.p.rapidapi.com',
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.ok){
                var data2 = new FormData();
                    data2.append('username', that.props.user.username);
                    data2.append('full_name', that.props.user.full_name);
                    data2.append('phone_number', that.props.user.full_name);
                    data2.append('emojiUrl', "null");
                    data2.append('face_id', "null");
                    data2.append('emojiToken', "");

                    var config2 = {
                        method: 'post',
                        url: API+'salvador_app/public/api/update-profile',
                        headers: { 
                            'Authorization': that.props.token, 
                        },
                        data : data2
                    };

                    axios(config2)
                    .then(function (res) {
                        if(res.data.success){
                            that.setState({spinner:false})
                            AsyncStorage.setItem('user',JSON.stringify(res.data.userData), (err)=> err? true:false )
                            that.context.updateState()
                        }else{
                            that.setState({spinner:false})
                            alert('cant remove, try again')
                        }
                        console.log(JSON.stringify(res.data));
                    })
                    .catch(function (error) {
                        that.setState({spinner:false})
                        alert('cant remove, try again')
                        console.log(error);
                    });
            }else{
                that.setState({spinner:false})
                alert('cant remove, try again!')
            }
        })
        .catch(function (error) {
            that.setState({spinner:false})
            alert('cant remove, try again!')
            console.log(error);
        });

    }

    toggleAlert = ()=>{
        this.setState({visible: !this.state.visible})
    }



    render() {

        return (
            <View style={styles.main}>
                 <Spinner
                    visible={this.state.spinner}
                    textContent={'Removing Your Current Emoji'}
                    textStyle={{color:'#FFCF30' , fontFamily:"Bold" }}
                />
                <AwesomeAlert
                    show={this.state.visible}
                    progressColor="#FFB81A"
                    title={"Remove Emoji"}
                    titleStyle={{fontSize:16,lineHeight:20,fontFamily:"Bold",color:'#FFB81A', }}
                    message={"Do you really want to remove your current emoji?"}
                    messageStyle={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#FFB81A' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showCancelButton={true}
                    cancelButtonStyle={{ backgroundColor:"#C63520" }}
                    cancelButtonTextStyle={{ fontSize:13,lineHeight:16,fontFamily:"Regular",color:'white', }}
                    showConfirmButton={true}
                    confirmButtonStyle={{ backgroundColor:"#FFB81A" }}
                    confirmButtonTextStyle={{ fontSize:13,lineHeight:16,fontFamily:"Regular",color:'#060A16', }}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.toggleAlert()
                    }}
                    onConfirmPressed={() => {
                        this.onRemovePress();
                    }}
                    contentContainerStyle={{ backgroundColor:"#060A16", width:"80%" , height:150 }}
                    // contentStyle={{ fontSize:14, lineHeight:20, fontFamily:"Regular", color:'#FFB81A'  }}

                />
                <Setting_Header Heading="Emoji Settings" onpress={()=> this.props.navigation.goBack()} />
                <Chat_Card Txt={this.props.user.face_id !== "null" ? "Change Emoji" : "Create new Emoji"} Press={ this.onCreatePress } />
                {this.props.user.face_id !== "null"
                    && <Chat_Card Txt="Remove Emoji" Press={ this.toggleAlert } />
                }
            </View>   
        );
    }
 }

function mapStateToProps(state) {
    return{
        token:state.Login_Reducer.token,
        user: state.Login_Reducer.user,
    }
}
 EmojiSetting.contextType = AuthContext;
 export default connect(mapStateToProps , null)(EmojiSetting)

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
 })