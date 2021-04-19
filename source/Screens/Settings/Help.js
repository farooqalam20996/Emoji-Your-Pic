import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
 } from 'react-native';
import Setting_Header from "./Setting_Header";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { API } from '../../Routes_Navigation/MainURL';
import { WebView } from "react-native-webview";
import { useEffect } from 'react';
var axios = require('axios');

function Help(props) {

    const[help , setHelp] = useState("");
    const[Failed , SetFailed] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        HelpApi();
    })

    const HelpApi = ()=>{
        var config = {
        method: 'get',
        url: API+'salvador_app/public/api/get-help',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            if(response.data.success){
                setHelp(response.data.Help)
                console.log(JSON.stringify(response.data));
            }
        })
        .catch(function (error) {
            console.log(error);
            SetFailed(true)
        });
    }
    
    const Txt = '<div style="color: white">' + help + '</div>';
    return (
        <View style={styles.main} >
            <Setting_Header Heading="Help" onpress={()=> navigation.goBack()} />
            {
                Failed ?
                    <View style={{ flex:1 , alignItems:"center" , justifyContent:"center" }} >
                            <Text style={styles.Txt} > Can't Load Page </Text>
                    </View>
                    :
                    <View style={{flex:1 }} >
                        <WebView
                            style={styles.WebView_Style}
                            source={{html:Txt}}

                            renderLoading={() => 
                                    <ActivityIndicator 
                                                size="large" 
                                                color="#FFB81A" 
                                                style={styles.webViewLoaderStyle} 
                                            /> }
                            startInLoadingState={true}
                            injectedJavaScript={`const meta = document.createElement('meta'); 
                                                meta.setAttribute('content', 'width=device-width, initial-scale=0.5, 
                                                maximum-scale=0.5, user-scalable=0'); 
                                                meta.setAttribute('name', 'viewport'); 
                                                document.getElementsByTagName('head')[0].appendChild(meta); `}
                            scalesPageToFit={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
    WebView_Style:{
        flex:1,
        marginTop:"5%",
        backgroundColor:"#060A16",
    },
    webViewLoaderStyle:{
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    Txt:{
        fontSize:26,
        lineHeight:28,
        fontFamily:"Bold",
        color:'#FFB81A', 
        textAlign:"left",
        alignItems:"center"
    }
})

export default Help;