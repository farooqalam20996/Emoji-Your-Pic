import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
 } from 'react-native';
import Top_Header from "../Header_Component/Header";
import { WebView } from "react-native-webview";
import { API } from '../../Routes_Navigation/MainURL';
var axios = require('axios');
var FormData = require('form-data');

var that;
 export default class Privacy_Policy extends Component {

       state = {
           text:"",
           Failed:false
       } 

       componentDidMount(){
            that = this;
            this.PrivacyPolicyTxt()
       }

       PrivacyPolicyTxt = () => {
            var data = new FormData();
            var config = {
                method: 'get',
                url: API+'salvador_app/public/api/get-privacy-policy',
                data : data
            };
            axios(config)
            .then(function (response) {
                if(response.data.success){
                    console.log(JSON.stringify(response.data));
                    that.setState({text: response.data.PrivacyPolicy})
                }
            })
            .catch(function (error) {
            console.log(error);
            that.setState({Failed:true})
            });
       }

    //    Heading_Txt = <Text style={{color:"black"}} > Privacy Policy </Text>

     render() {
        const Txt = '<div style="color: white">' + this.state.text + '</div>';

         return (
            <View style={styles.main} >
                <Top_Header Heading="Privacy Policy" btn={<Text style={styles.can_Txt} onPress={() => this.props.navigation.goBack()} >cancel</Text>} />
                {
                    this.state.Failed ?
                        <View style={{ flex:1 , alignItems:"center" , justifyContent:"center" }} >
                            <Text style={styles.Txt} > Can't Load Page </Text>
                        </View>
                        :
                        <View style={{flex:1 }} >
                            <WebView
                                style={styles.WebView_Style}
                                source={{html: Txt}}
                                renderLoading={() => 
                                        <ActivityIndicator 
                                                    size="large" 
                                                    color="white" 
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
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:"6%",
         backgroundColor:"#060A16",
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
        color:'lightgray', 
        textAlign:"left",
        alignItems:"center"
    },
    can_Txt:{
        fontSize:16,
        lineHeight:18,
        fontFamily:"Regular",
        color:'#FFB81A', 
    }
 })