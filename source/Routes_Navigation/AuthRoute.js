import React, { Component } from 'react';
import { 
    View,
    Text
 } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp_Page from "../Screens/Get_started/SignUp";
import Login_SignUp from "../Screens/Login&SignUp/Login_SignUp";
import Login_Page from "../Screens/LoginScreen/Login";
import SignUp_OTP_Verification from "../Screens/Get_started/SignUp_OTP_Verification";
import SignUp_Success from "../Screens/Get_started/SignUp_Success";
import SignUp_Profile from "../Screens/Get_started/SignUp_Profile";
import AppRoutes from "../Routes_Navigation/AppRoutes";
import AsyncStorage from '@react-native-community/async-storage';
import { putToken, putUserData } from "../Redux/Actions/User_Login_Action";
import { connect } from "react-redux";
import AuthContext from './Context';
import { isReadyRef, navigationRef } from './Navigator';

const Stack = createStackNavigator();

class AuthRoute extends Component {
    state = { 
        isLoggedin: null
     }

     componentDidMount(){
         this.checkToken();
     }

     checkToken = async () => {
        await AsyncStorage.getItem('user', (err, user) => {
            if(user){
                this.setState({ isLoggedin: true });
                this.props.User_Data(JSON.parse(user))
            }
            else{
                this.setState({isLoggedin: false})
            }
        });

        await AsyncStorage.getItem('token',(err, token)=>{
            if(token){
                this.props.User_Token(JSON.parse(token))
            }
        })
     }

    render() {
        return(
            <AuthContext.Provider value={{ updateState:this.checkToken}} >
                <View style={{flex:1, backgroundColor:'black'}} >
                    <NavigationContainer 
                        ref={navigationRef} 
                        onReady={() => {isReadyRef.current = true;}} 
                    >
                        <Stack.Navigator initialRouteName="Login_SignUp" screenOptions={{ headerShown: false }} >
                            {
                                this.state.isLoggedin ?
                                <Stack.Screen name="AppRoutes" component={AppRoutes} />
                                :
                                <>
                                    <Stack.Screen name="Login_SignUp" component={Login_SignUp} />
                                        {/* Below Line will be erased */}
                                    {/* <Stack.Screen name="AppRoutes" component={AppRoutes} /> */}
                                    <Stack.Screen name="Login_Page" component={Login_Page} />
                                    <Stack.Screen name="SignUp_Page" component={SignUp_Page} />
                                    <Stack.Screen name="SignUp_OTP_Verification" component={SignUp_OTP_Verification} />
                                    <Stack.Screen name="SignUp_Success" component={SignUp_Success} />
                                    <Stack.Screen name="SignUp_Profile" component={SignUp_Profile} />
                                </>

                            } 
                        </Stack.Navigator>
                    </NavigationContainer>
                 </View>
             </AuthContext.Provider>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        User_Data:(user)=>dispatch(putUserData(user)),
        User_Token:(token)=>dispatch(putToken(token))
    }
}

export default connect(null, mapDispatchToProps)(AuthRoute);
