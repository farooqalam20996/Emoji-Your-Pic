import { API } from "../../Routes_Navigation/MainURL";
import {Email, Email_Registration , Email_Success, Email_Failed} from "../Constants";
import { navigate } from "../../Routes_Navigation/Navigator";
import AsyncStorage from "@react-native-community/async-storage";
var axios = require('axios');
var FormData = require('form-data');

export const EmailVerification=(Email)=>{
    return(dispatch)=>{
        dispatch({type: Email_Registration})
        var data = new FormData();
        data.append('email', Email);

        var config = {
            method: 'post',
            url:API+'salvador_app/public/api/email-registration',
            data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data.success){
                AsyncStorage.setItem('verified',JSON.stringify({email:Email, verified: false}),(err)=>err? true : false);
                AsyncStorage.setItem('updated',JSON.stringify({email:Email, updated: false}),(err)=>err? true : false);
                dispatch({type:Email_Success , error:''})
                console.log(JSON.stringify(response.data));
                navigate("SignUp_OTP_Verification")
            }
            else{
                dispatch({type: Email_Failed, error:response.data.message})
            }
        })
        .catch(function (error) {
        console.log(error);
        // alert(error)

        });
    }
}

export const Email_Register =(text)=> {
    return{
        type:Email,
        payload:text
    }
}
