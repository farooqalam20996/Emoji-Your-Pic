import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    ScrollView
 } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons'; 
import { connect } from "react-redux";
import { EmailVerification, Email_Register } from "../../Redux/Actions/EmailRegistration_Action";
import {Snackbar } from "react-native-paper";

class SignUp_Page extends Component {
     state = { 
        Show_error:false,
      }

      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

      Verify=()=>{
        Keyboard.dismiss()
        if(this.validateEmail(this.props.Email)){
            this.props.Verification(this.props.Email)
        }
        else{
            this.setState({Show_error: true})
        }   
      }

     render() {
         return (
            <View style={styles.main} >
                <ScrollView>
                    <View style={styles.SignUp_Container} >
                        <Text style={styles.Heading_Txt} >
                            Get Started
                        </Text>
                        <Text style={styles.Paragraph} >
                            enter your email to sign up
                        </Text>
                        <View style={styles.Num_container} >
                            <View style={styles.uni_num} >
                                <Fontisto name="email" size={24} color="white" />
                            </View>
                            <TextInput
                                style={styles.Input_Style}
                                value={this.props.Email}
                                onChangeText={(text)=>this.props._Email(text)}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.Verify()}
                            />
                        </View>
                        {
                            this.props.loader ?
                            <View style={styles.SignUp_btn}>
                            <ActivityIndicator color="white" size="small" />
                            </View>
                            :
                            <TouchableOpacity style={styles.SignUp_btn} onPress={() => this.Verify()} >
                                <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Sign Up With Email </Text>
                            </TouchableOpacity>
                        }
                        {
                            this.props.failed ?
                                <Text style={[styles.Txt,{color:"#FFB81A" ,  lineHeight:14 , marginBottom:0 , marginTop:4}]} > {this.props.err} </Text>
                                :
                                null
                        }
                        <TouchableOpacity style={[styles.SignUp_btn, {marginTop:"10%", backgroundColor:"#FFB81A"}]} onPress={() => this.props.navigation.goBack()} >
                                <Text style={[styles.Txt,{color:"#000000"}]} > Cancel </Text>
                        </TouchableOpacity>
                </View>
                    {/* <View style={styles.OtherSignUp_Container} >
                        <TouchableOpacity style={[styles.SignUp_btn,{backgroundColor:"#FFB81A"}]} >
                                <Text style={[styles.Txt,{color:"#060A16"}]} > SignUp with Facebook </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.SignUp_btn,{backgroundColor:"#FFB81A"}]} >
                                <Text style={[styles.Txt,{color:"#060A16"}]} > SignUp with Twitter </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Policy_container} >  
                        <TouchableOpacity style={styles.priv_btn} >
                                <Text style={styles.Pol_Txt} > Privacy Policy </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.priv_btn} >
                                <Text style={styles.Pol_Txt} > Terms Of Use </Text>
                        </TouchableOpacity>
                    </View>  */}
                <View style={{height:100}} />
                </ScrollView>
                <Snackbar 
                    visible={this.state.Show_error}
                    onDismiss={()=> this.setState({Show_error: false})}
                    duration={5000}
                    style={{ marginLeft:"10%" , width:"100%" }}
                    action={{
                        label: 'ok',
                        onPress: () => {
                            this.setState({Show_error: false})
                        },
                    }}
                >
                    Email is not formatted
                </Snackbar>
            </View>    
         );
     }
 }

 function mapStateToProps(state) {
     return{
        Email:state.EmailVerify.email,
        loader:state.EmailVerify.Loader,
        failed:state.EmailVerify.Failed,
        err:state.EmailVerify.error,
     }
 }

 function mapDispatchToProps(dispatch) {
     return{
        _Email:(text)=>dispatch(Email_Register(text)),
        Verification:(Email)=>dispatch(EmailVerification(Email))
     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(SignUp_Page);

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:0
     },
     SignUp_Container:{
        // flex:1,
        width:"100%",
        // backgroundColor:"red",
        padding:"5%",
        paddingTop:"70%"
     }, 
     OtherSignUp_Container:{
        // flex:1,
        width:"100%",
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:"5%",
        // backgroundColor:"blue"
     },
     Policy_container:{
        width:"100%",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-evenly",  
    },
    Pol_Txt:{
        fontSize:12,
        lineHeight:18,
        fontFamily:"Medium",
        color:'#273253', 
     },
     SignUp_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     },
     Heading_Txt:{
        fontSize:24,
        lineHeight:25,
        fontFamily:"SemiBold",
        color:'#C63520', 
        textAlign:"left"
     },
     Paragraph:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Regular",
        color:'#FFFFFF', 
        textAlign:"left",
        marginTop:"3%",
        marginTop:"10%"
     },
     Txt:{
        fontSize:14,
        lineHeight:16,
        fontFamily:"Medium",
        color:'#FFFFFF',
        textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
     }, 
     Num_container:{
        marginTop:'5%',
        flexDirection:"row",
        alignItems:"center"
     },
     uni_num:{
         flexDirection:"row",
         width:"20%",
         height:45,
         alignItems:"center",
         justifyContent:"center",
         backgroundColor:"#0C1326",
         borderColor:"#273253",
         borderWidth:1,
         borderRadius:12
     },
     Input_Style:{
        width:"80%",
        height:45,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:12,
        borderWidth:1,  
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%",
        marginLeft:"4%"
     },
     SignUp_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     }
 })