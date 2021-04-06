import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
 } from 'react-native';
import CodeInput from "react-native-confirmation-code-input";
import { connect } from "react-redux";
import firebase from '../../firebase';
import { API } from '../../Routes_Navigation/MainURL';
var axios = require('axios');
var FormData = require('form-data');

var that;

class SignUp_OTP_Verification extends Component {
    state = { 
        // num1:"",
        // num2:"",
        // num3:"",
        // num4:"",
        // xyz:"polo",
        code:null,
        time:"0:50",
        visible:false,
        loader:false,
        Failed:false,
        email:'',
     }

     componentDidMount(){
         that = this;
        // Email = AsyncStorage.getItem('email', (err, data)=>{
        //     that.props._Email = data
        // })    
        AsyncStorage.getItem('verified',(err,data)=>{
            const newData = JSON.parse(data);
            const email = newData.email ? newData.email : that.props._Email
            this.setState({email: email})
        })
    }



     onresult=() =>{
        // this.props.navigation.navigate('SignUp_Success')
        that.setState({loader: true})
        
        var data = new FormData();
        data.append('email', that.state.email);
        data.append('code', that.state.code);

        var config = {
        method: 'post',
        // url: API+'projects/salvador-app/public/api/check-code-email',
        url: API+'salvador_app/public/api/check-code-email',
        data : data
        };
 
        axios(config)
        .then(function (response) {
            if(response.data.success){
                AsyncStorage.setItem('id', JSON.stringify(response.data.data.id) , (err)=>err? true:false)
                AsyncStorage.removeItem('verified')
                firebase.auth.createUserWithEmailAndPassword(that.state.email,'123123')
                .then((res)=>{
                    console.log(JSON.stringify(response.data));
                    AsyncStorage.setItem('fid',JSON.stringify(res.user.uid),(err)=>err?true:false)
                    that.setState({loader: false})
                    that.props.navigation.navigate("SignUp_Success");
                }).catch((err)=>{
                    console.log(err)
                })
                
                // that.props.navigation.navigate("SignUp_Success");
            }
            else{
                console.log(response.data.message)
                that.setState({loader: false})
                that.setState({Failed: true})
                // that.props.navigation.navigate("SignUp_Success", {userID: response.data});
                // that.props.navigation.navigate("SignUp_Success");
            }
        })
        .catch(function (error) {
            console.log(error);
            that.setState({loader: false})
            that.setState({Failed: true})
        });
     }


    render() {
        return (
            <View style={styles.main} >
                
                <View style={styles.container} >
                    <Text style={styles.Heading_Txt} >
                        Verify Your Email
                    </Text>
                    <Text style={styles.Paragraph} >
                        Insert the 4-digit OTP code that has been sent to your Email for verification.
                    </Text>
                    <Text style={[styles.Paragraph,{color:'#FFB81A'}]} >
                        {this.state.email}
                    </Text>
                    <View style={{ alignItems:"center", justifyContent:"center" , flexDirection:"row" , marginTop:"10%" }} >
                        {/* <CodeInput
                                value={this.state.code}
                                onChangeText={(text) => this.setState({code: text})}
                                ref="codeInputRef1"
                                // secureTextEntry
                                className="border-b"
                                codeLength={4}
                                inputPosition="center"
                                cellBorderWidth={2}
                                inactiveColor="#2E8BFF"
                                activeColor="#B9C9DE"
                                space={5}   
                                size={45}
                                inputPosition='center'
                                onFulfill={(code) => this.setState({visible: true}) }
                                keyboardType="number-pad"
                                autoFocus={true}
                                onSubmitEditing={()=> this.onresult()}
                                codeInputStyle={{borderWidth:1, borderRadius:6, borderColor:"#273253"}}
                                /> */}
                                 
                                <TextInput  
                                    value={this.state.code} 
                                    onChangeText={(text)=> this.setState({code: text})} 
                                    style={styles.Input_Style} 
                                    maxLength={4}
                                />
                    </View>
                    <Text style={[styles.Paragraph,{marginTop:'5%'}]} >
                        {this.state.time}
                    </Text>
                    
                    {
                        true ?
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

                    <TouchableOpacity style={styles.Verify_btn} onPress={() => this.onresult()} >
                       {
                           this.state.loader ?
                           <ActivityIndicator size={30} color="white" />
                           :
                           <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Verify </Text>
                       }
                    </TouchableOpacity>
                    {
                        this.state.Failed ? 
                        <Text style={{color:"yellow"}} >Invalid Code</Text>
                        :
                        null
                    }
                    
                </View>
                {/* <View style={{ width:'35%', height:3 , backgroundColor:"#FFFFFF" , borderRadius:100, alignSelf:"center" }} /> */}
                  
            </View>    
        );
    }
}

function mapStateToProps(state) {
    return{
        _Email:state.EmailVerify.email,
    }
}

export default connect(mapStateToProps,null)(SignUp_OTP_Verification);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
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
})

{/* <TextInput
                            value={this.state.num1}
                            onChangeText={(text)=> this.setState({num1: text}) }
                            style={styles.Input_Style}
                            blurOnSubmit={false}
                            maxLength={1}
                            onSubmitEditing={() => this.NextInput.focus()}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            ref={ref => { this.NextInput = ref; }}
                            value={this.state.num2}
                            onChangeText={(text)=> this.setState({num2: text}) }
                            style={styles.Input_Style}
                            maxLength={1}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput1.focus()}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            ref={ref => { this.NextInput1 = ref; }}
                            value={this.state.num3}
                            onChangeText={(text)=> this.setState({num3: text}) }
                            style={styles.Input_Style}
                            blurOnSubmit={false}
                            maxLength={1}
                            onSubmitEditing={() => this.NextInput2.focus()}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            ref={ref => { this.NextInput2 = ref; }}
                            value={this.state.num4}
                            onChangeText={(text)=> this.setState({num4: text}) }
                            style={styles.Input_Style}
                            blurOnSubmit={false}
                            maxLength={1}
                            onSubmitEditing={() => this.onresult() }
                            keyboardType="number-pad"
                        /> */}