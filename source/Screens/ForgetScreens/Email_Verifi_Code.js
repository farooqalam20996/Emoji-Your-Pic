import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView
 } from 'react-native';
import { API } from '../../Routes_Navigation/MainURL';
 var axios = require('axios');
 var FormData = require('form-data');


 var that;
 export default class Email_Verifi_Code extends Component{

    constructor(props){
        super(props);
        this.state= {
            code:null,
            time:"0:50",
            loader:false,
            Failed:false,
            // email:'',
        }
    }

    componentDidMount(){
        that = this
        this.Email_Check
    }

    // Email_Check = async()=>{
    //     await AsyncStorage.getItem("email_Forget" , (err , val)=>{
    //         this.setState({email: val})
    //     })
    // }

    Verify_Code= async ()=>{
        that.setState({loader: true})
        var id;
        await AsyncStorage.getItem('id_Forget' , (err ,val)=>{
            id = val;
        })
        console.log(id)
        var data = new FormData();
        data.append('code', this.state.code);
        data.append('id', id);

        var config = {
        method: 'post',
        url: API+'salvador_app/public/api/check-forget-password-code',
        data : data
        };

        axios(config)
        .then(function (response) {
            if(response.data.success == true){
                that.props.navigation.navigate("Change_Password")
                console.log(JSON.stringify(response.data));
            }
            else{
                that.setState({loader: false , Failed:true})
                console.log(JSON.stringify(response.data));
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    render(){
        return(
            <View style={styles.main} >
                <ScrollView>
                    <View style={styles.container} >
                        <Text style={styles.Heading_Txt} >
                            Check Your Email
                        </Text>
                        <Text style={styles.Paragraph} >
                            Insert the 4-digit OTP code that has been sent to your Email for verification.
                        </Text>
                        <Text style={[styles.Paragraph,{color:'#FFB81A'}]} >
                            {/* {this.state.email} */}
                        </Text>
                        <View style={{ alignItems:"center", justifyContent:"center" , flexDirection:"row" , marginTop:"10%" }} >
                            <TextInput  
                                value={this.state.code} 
                                onChangeText={(text)=> this.setState({code: text})} 
                                style={styles.Input_Style} 
                                maxLength={4}
                                onSubmitEditing={this.Verify_Code}
                            />
                        </View>
                        <Text style={[styles.Paragraph,{marginTop:'5%'}]} >
                            {this.state.time}
                        </Text>
                        {
                            this.state.Failed ? 
                            <Text style={{color:"yellow" ,alignSelf:"center"}} >Invalid Code</Text>
                            :
                            null
                        }
                        
                        {
                            this.state.Failed ?
                            <Text style={styles.Paragraph} >
                                Didn't receive the code?
                            </Text>
                            :
                            null
                        }
                        <TouchableOpacity onPress={() => alert("send message")} >
                            <Text style={[styles.Paragraph,{color:"#FFB81A" , textDecorationLine:"underline" , textDecorationColor:"#FFB81A"}]}  >
                                Resend OTP
                            </Text>
                        </TouchableOpacity>
                        
                        {
                            this.state.loader ?
                                <View style={styles.Verify_btn}>
                                    <ActivityIndicator size={30} color="white" />
                                </View>
                            :
                            <TouchableOpacity style={styles.Verify_btn} onPress={this.Verify_Code} >
                                    <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Verify </Text>
                            </TouchableOpacity>
                        }
                        
                    </View>                  
            
                </ScrollView>
            </View>    
        );
    }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%"
    },
    container:{
        flex:1,
        paddingTop:"45%",
        padding:"6%"
    },  
    Heading_Txt:{
        fontSize:24,
        lineHeight:25,
        fontFamily:"SemiBold",
        color:'#FFB81A', 
        textAlign:"center"
    },
    Paragraph:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Light",
        color:'#FFFFFF', 
        textAlign:"center",
        marginTop:"3%",
        marginTop:"10%"
     },
     Input_Style:{
        width:"80%",
        height:50,
        borderRadius:12,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center",
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF', 
        textAlign:"center",
        marginLeft:"3%",
        letterSpacing:6
     },
     Verify_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"25%"
     }
 });