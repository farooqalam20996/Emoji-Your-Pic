import { API } from "../../Routes_Navigation/MainURL";
import {Email, Email_Registration , Email_Success, Email_Failed} from "../Constants";
import { navigate } from "../../Routes_Navigation/Navigator";

export const EmailVerification=(Email)=>{
    return(dispatch)=>{
        dispatch({type: Email_Registration})
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('email', Email);

        var config = {
        method: 'post',
        url: API+'projects/salvador-app/public/api/email-registration',
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data.success){
                console.log("polo")
                dispatch({type:Email_Success , error:''})
                console.log(JSON.stringify(response.data));
                // navigate("SignUp_OTP_Verification")
            }
            else{
                dispatch({type: Email_Failed, error:response.data.message})
                alert(response.data.message)
                navigate("SignUp_OTP_Verification")
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
