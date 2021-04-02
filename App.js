import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useFonts } from "@use-expo/font";
// import { AppLoading } from "expo";
import AppLoading from "expo-app-loading";
import AuthRoute from "./source/Routes_Navigation/AuthRoute";
import { Provider } from "react-redux";
import stores from "./source/Redux/store";

export default function App() {


  const [isloading] = useFonts({
              "Poppins_Black":require('./assets/fonts/Poppins/Poppins-Black.ttf'),
              "Poppins_BlackItalic":require('./assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
              "Bold":require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
              "BoldItalic":require('./assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
              "ExtraBold":require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
              "ExtraBoldItalic":require('./assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
              "ExtraLight":require('./assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
              "ExtraLightItalic":require('./assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
              "Italic":require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
              "Light":require('./assets/fonts/Poppins/Poppins-Light.ttf'),
              "LightItalic":require('./assets/fonts/Poppins/Poppins-LightItalic.ttf'),
              "Medium":require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
              "MediumItalic":require('./assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
              "Regular":require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
              "SemiBold":require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
              "SemiBoldItalic":require('./assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
              "Thin":require('./assets/fonts/Poppins/Poppins-Thin.ttf'),
              "ThinItalic":require('./assets/fonts/Poppins/Poppins-ThinItalic.ttf'),
  });

  if(!isloading){
    return <AppLoading />
  }
  else{ 
    return (
         <Provider store={stores} >
            <>
              <AuthRoute />
              <StatusBar backgroundColor="#060A16" barStyle="light-content" />
            </>
         </Provider>
      );
    }
  }
