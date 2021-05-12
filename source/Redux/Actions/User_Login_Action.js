import AsyncStorage from "@react-native-community/async-storage";
import firebase from "../../firebase";
import { API } from "../../Routes_Navigation/MainURL";
import { User_Login, Login_Success, Login_Failed, User_Data, User_Token } from "../Constants";

export const ChangeLogin = (email,password,context) =>{
    return(dispatch)=>{
      if(email && password){
        dispatch({ type: User_Login })
        var axios = require('axios');
        var data = JSON.stringify({
            "email":email,
            "password":password,
        });
        
        var config = {
          method: 'post',
          url:API+"salvador_app/public/api/login",
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          if(response.data.success){
            // firebase.auth.signInWithEmailAndPassword(email,password)
            // .then(()=>{
              dispatch({type: Login_Success})
              console.log(JSON.stringify(response.data));
              AsyncStorage.setItem('user',JSON.stringify(response.data.userData), (err)=> err? true:false )
              // AsyncStorage.setItem('password',password, (err)=> err? true:false )
              AsyncStorage.setItem('image',response.data.userData.image+"?"+ new Date(), (err)=> err? true:false )
              AsyncStorage.setItem('token',JSON.stringify(response.data.token), (err)=> err? true:false )
              AsyncStorage.setItem('chats',JSON.stringify([]), (err)=> err? true:false )
              AsyncStorage.removeItem('fid');
              context.updateState()
            // }).catch((err)=>{
            //   dispatch({type: Login_Failed, error:response.data.message})
            //   console.log(err)
            // })
            
          }
          else{
            // alert(JSON.stringify(response.data))
            dispatch({type: Login_Failed, error:response.data.message})
            console.log(response.data.message)
            console.log(response.data)
          }
        })
        .catch(function (error) {
          dispatch({ type: Login_Failed , error:"Some Problem Occurred Try Again"})
          console.log(error);
        });
      }
      else{
        dispatch({type: Login_Failed, error:'Enter Email and Password'})
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