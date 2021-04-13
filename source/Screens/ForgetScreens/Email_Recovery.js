import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
 } from 'react-native';
import { API } from '../../Routes_Navigation/MainURL';
 var axios = require('axios');
 var FormData = require('form-data');

 var that;
 export default class Email_Recovery extends Component{
    
    constructor(props){
        super(props);
        this.state= {
            email:"",
            Loader:false,
            Failed:false,
        }
    }
    componentDidMount(){
        that = this
    }
    
    Email_Verification=()=>{
        that.setState({Loader:true})
        var data = new FormData();
        data.append('email', this.state.email);
        var config = {
        method: 'post',
        url: API+'salvador_app/public/api/forget-password-email',
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data.success == true){
                that.props.navigation.navigate("Email_Verifi_Code")
                console.log(JSON.stringify(response.data));
                that.setState({Loader:false})
                AsyncStorage.setItem('id_Forget', JSON.stringify(response.data.data.id) , ((err)=>err? true:false))
                AsyncStorage.setItem('email_Forget' , JSON.stringify(response.data.data.email , ((err)=> err? true:false)))
            }
            else{
                that.setState({Loader:false, Failed:true})
                console.log(response.data)
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render(){
        return(
            <View style={styles.main} >
                <View style={{marginTop:"7%"}} >
                    <Text style={styles.Txt} >Enter Your Email</Text>
                    <TextInput 
                        style={styles.Input_Style}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({email: text})}
                        blurOnSubmit={false}
                    />
                    {
                        this.state.Failed ?
                            <Text style={[styles.Txt,{color:"#FFB81A" ,  lineHeight:16 , marginBottom:0 , marginTop:"5%"}]} > Email not exist </Text>
                            :
                            null
                    }
                </View>
                <TouchableOpacity disabled={this.state.Loader} style={styles.Login_btn} onPress={this.Email_Verification} >
                    {
                        this.state.Loader ?
                        <ActivityIndicator size="large" color="#FFFFFF"  />
                        :
                        <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Submit </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Login_btn, {backgroundColor:"#FFB81A"}]} onPress={()=>this.props.navigation.goBack()} >
                    <Text style={[styles.Txt,{color:"#060A16"}]} > Back </Text>
                </TouchableOpacity>
            </View>
        );
    }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'5%',
        paddingTop:"50%",
        paddingBottom:'1%'
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
