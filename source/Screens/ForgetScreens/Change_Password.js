import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Keyboard
 } from 'react-native';
 import { Snackbar } from "react-native-paper";
import { API } from '../../Routes_Navigation/MainURL';
 var axios = require('axios');
 var FormData = require('form-data');

 var that;
 export default class Change_Password extends Component{
    
    constructor(props){
        super(props);
        this.state={
            Password:"",
            Confirm_Password:"",
            visible:false,
            Loader:false,
            Fialed:false,
            Success:false,
            err:"",
            show_password:true
        }
    }

    componentDidMount(){
        that = this
    }

    Check_Balance = ()=>{
        Keyboard.dismiss()
        console.log(this.state.Password)
        if(this.state.Password !== this.state.Confirm_Password){
            this.setState({Fialed: true , Loader:false})
        }
        else{
            this.Change_password()
        }
    }

    Change_password= async ()=>{
        that.setState({Loader: true})
        var id;
        await AsyncStorage.getItem("id_Forget" , (err, val)=>{
            id = val;
        })

        var data = new FormData();
        data.append('id', id);
        data.append('password', this.state.Password); 
        console.log(id)

        var config = {
        method: 'post',
        url: API+'salvador_app/public/api/update-forget-password',
        data : data
        };

        axios(config)
        .then(function (response) {
            if( response.data.success == true ){
                console.log(JSON.stringify(response.data));
                that.setState({Loader: false})
                that.result()
            }
            else{
                that.setState({err: response.data.message})
                console.log(JSON.stringify(response.data));
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    result=()=>{
        this.setState({visible: true})
    }
    
    onDismissSnackBar=()=>{
        this.setState({visible: false})
        this.props.navigation.navigate("Login_SignUp")
    }

    render(){
        
        return(
            <View style={styles.main} >
                <ScrollView>
                    <View style={styles.container} >

                        <View style={{marginTop:"7%" }} >
                            <Text style={styles.Txt} >Enter Your Password</Text>
                            <TextInput 
                                style={styles.Input_Style}
                                value={this.state.Password}
                                onChangeText={(text) => this.setState({Password: text})}
                                blurOnSubmit={false}
                                secureTextEntry={this.state.show_password?true:false}
                            />
                        </View>
                        <View style={{marginTop:"7%"}} >
                            <Text style={styles.Txt} >Enter Your Confirm Password</Text>
                            <TextInput 
                                style={styles.Input_Style}
                                value={this.state.Confirm_Password}
                                onChangeText={(text) => this.setState({Confirm_Password: text})}
                                blurOnSubmit={false}
                                secureTextEntry={this.state.show_password?true:false}
                                onSubmitEditing={this.Check_Balance}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.setState({show_password: !this.state.show_password})} >
                            {
                                this.state.show_password ?
                                <Text style={[styles.Txt,{color:'#FFB81A' , fontFamily:"Bold"}]} >Show Passsword</Text>
                                :
                                <Text style={[styles.Txt,{color:'#FFB81A' , fontFamily:"Bold"}]} >Hide Passsword</Text>
                            }
                        </TouchableOpacity>
                        
                        <TouchableOpacity disabled={false} style={styles.Login_btn} onPress={this.Check_Balance} >
                            {
                                this.state.Loader ?
                                <ActivityIndicator size="large" color="#FFFFFF"  />
                                :
                                <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Submit </Text>
                            }
                        </TouchableOpacity> 
                        {
                            this.state.Fialed?
                            <Text style={[styles.Txt,{color:'#C63520', fontFamily:"Bold"}]} > {this.state.err}  </Text>
                            :
                            null
                        }
                        {
                            this.state.Password == "" || this.state.Confirm_Password == "" ?
                            null
                            :
                            (
                                this.state.Password == this.state.Confirm_Password ?
                                <Text style={[styles.Txt,{color:'#FFB81A' , fontFamily:"Bold"}]} >Password Matched</Text>
                                : 
                                <Text style={[styles.Txt,{color:'#C63520', fontFamily:"Bold"}]} >Password Miss Matched!</Text>
                            )
                        }
                       
                        </View>
                        <View style={{ height:150 }} /> 
                        <Snackbar style={{backgroundColor:"#18CE73" , width:"90%" , borderRadius:45 }} visible={this.state.visible} onDismiss={this.onDismissSnackBar}  duration={2000} >
                            <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                                Success
                            </Text>
                    </Snackbar>
                </ScrollView>
            </View>
        );
    }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%",
    },
    container:{
        // flex:1,
        paddingTop:"50%",
        // padding:"6%"
    },  
    Txt:{
        fontSize:14,
        lineHeight:16,
        fontFamily:"Regular",
        color:'#FFFFFF',
        textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
     }, 
    Input_Style:{
        // width:wp('80%'),
        // height:hp('6%'),
        width:"100%",
        height:45,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:12,
        borderWidth:1,  
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%"
     },
     Login_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     }
 });
