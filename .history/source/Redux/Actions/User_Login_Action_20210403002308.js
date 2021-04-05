import AsyncStorage from "@react-native-community/async-storage";
import { API } from "../../Routes_Navigation/MainURL";
import { User_Login, Login_Success, Login_Failed, User_Data, User_Token } from "../Constants";

export const ChangeLogin = (email,password,context) =>{
    return(dispatch)=>{
      if(email && password){
        console.log("abcd")
        dispatch({ type: User_Login })
        var axios = require('axios');
        var data = JSON.stringify({
            "email":email,
            "password":password,
        });
        
        var config = {
          method: 'post',
          // url: API+'projects/salvador-app/public/api/login',
          url:"http://projects.paragonlogo.com/salvador_app/public/api/login",
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          if(response.data.success){
            dispatch({type: Login_Success})
            console.log(JSON.stringify(response.data));
            AsyncStorage.setItem('user',JSON.stringify(response.data.userData), (err)=> err? true:false )
            AsyncStorage.setItem('token',JSON.stringify(response.data.token), (err)=> err? true:false )
            context.updateState()
          }
          else{
            // alert(JSON.stringify(response.data))
            dispatch({type: Login_Failed, error:response.data.message})
            console.log(response.data)
          }
        })
        .catch(function (error) {
          dispatch({ type: Login_Failed })
          console.log(error);
        });
      }
      else{
        dispatch({type: Login_Failed, error:'Enter email and password'})
      }
        
    }
}

export const putUserData = (user) => {
    return{
        type:User_Data,
        user
    }
}

export const putToken = (token)=>{
    return{
        type:User_Token,
        payload:token
    }
}