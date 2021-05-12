import { 
    User_SignUp, 
    User_SignUp_Success, 
    User_SignUp_Failed,
    User_Name,
    Full_Name, 
    Email, 
    Password, 
    Confirm_Password, 
    Phone_Number,
    Image_Uri,
    Email_Registration_Completed
} from "../Constants";

import { Platform } from "react-native";
import { API } from "../../Routes_Navigation/MainURL";
import { navigate } from "../../Routes_Navigation/Navigator";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "../../firebase";
var axios = require('axios');
var FormData = require('form-data');

export const Update_Profile = (username, fullname, email, phone_number, password, ImageUri,fid) => {
    // console.log(id, username, fullname, email, phone_number, password, ImageUri)
        return async (dispatch)=>{
            dispatch({type: User_SignUp})
            
            var data = new FormData();
            var id;
            await AsyncStorage.getItem('id' , (err, data)=>{
                id = data
            })
            data.append('username', username);
            data.append('full_name', fullname);
            data.append('email', email);
            data.append('phone_number', phone_number);
            data.append('password', password);
            data.append('firebase_id', fid);
            data.append("image", {
                        name: "image.jpg",
                        type: "image/jpeg",
                        uri: Platform.OS === "android" ? ImageUri.uri : ImageUri.uri.replace("file://", "")
                    })
                    console.log(JSON.stringify(data))
            var config = {
                method: 'post',
                // url: API+'projects/salvador-app/public/api/update-user-profile/'+id,
                url:API+'salvador_app/public/api/update-user-profile/'+id,
                data : data
            };
            axios(config)
            .then(function (response) {
                if(response.data.success){
                    firebase.auth.signInWithEmailAndPassword(email,'123123')
                    .then(()=>{
                        firebase.auth.currentUser.updatePassword(password)
                        .then(()=>{
                            firebase.firestore.collection('users')
                            .doc(fid).set({
                                uid:fid,
                                phone: phone_number,
                                image: response.data.data.image,
                                email: email,
                                name: fullname,
                                online:false
                            }).then(()=>{
                                AsyncStorage.removeItem('verified')
                                AsyncStorage.removeItem('updated')
                                dispatch({type: User_SignUp_Success});
                                dispatch({type: Email_Registration_Completed});
                                console.log(JSON.stringify(response.data));
                                navigate("Login_SignUp")
                            }).catch((err)=>{
                                console.log(err)
                            })
                        })
                    })
                }
                else{
                    dispatch({type: User_SignUp_Failed, error:response.data.message});
                    console.log(response.data.message)
                    alert(response.data.message)
                }
            })
            .catch(function (error) {
            dispatch({type: User_SignUp_Failed})
            console.log(error);
            });
        }
            
    }

export const Username =(text)=> {
    return{
        type:User_Name,
        payload:text
    }
}

export const Fullname =(text)=> {
    return{
        type:Full_Name,
        payload:text
    }
}

export const Email_Address =(text)=> {
    return{
        type:Email,
        payload:text
    }
}

export const User_Password =(text)=> {
    return{
        type:Password,
        payload:text
    }
}

export const User_ConfirmPassword =(text)=> {
    return{
        type:Confirm_Password,
        payload:text
    }
}

export const PhoneNumber =(text)=> {
    return{
        type:Phone_Number,
        payload:text
    }
}

export const ImageURI= (text) => {
    return{
        type:Image_Uri,
        payload:text
    }
}
// export const User_Code =(text)=> {
//     return{
//         type:Code,
//         payload:text
//     }
// }


 // return(dispatch)=>{
    //     console.log("enter")
    //     dispatch({type: User_SignUp});
    //     console.log("abcde")
    //     var axios = require('axios');
    //     var FormData = require('form-data');
    //     var data = new FormData();
    //     data.append('username', username);
    //     data.append('full_name', fullname);
    //     data.append('email', email);
    //     data.append('phone_number', phone_number);
    //     data.append('password', password);
    //     data.append("image", {
    //         name: "image.jpg",
    //         type: "image/jpeg",
    //         uri: Platform.OS == 'android'? ImageUri.uri : ImageUri.uri.replace("file://", "")
    //     })

    //     var config = {
    //     method: 'post',
    //     url: API+'projects/salvador-app/public/api/update-user-profile/35',
    //     // headers: { 
    //     //     ...data.getHeaders()
    //     //   },
    //     data : data
    //     };

    //     axios(config)
    //     .then(function (response) {
    //         if(response.data.success){
    //             dispatch({type: User_SignUp_Success});
    //             console.log(JSON.stringify(response.data.data));
    //             navigate("Login_SignUp")
    //         }
    //         else{
    //             dispatch({type: User_SignUp_Failed, error:response.data.message});
    //             console.log(response.data.message)
    //             alert(response.data.message)
    //         }
    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     });

    // }
