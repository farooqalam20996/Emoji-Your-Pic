import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Keyboard,
    ActivityIndicator
 } from 'react-native';
import { connect } from "react-redux";
import { ChangeLogin } from "../../Redux/Actions/User_Login_Action";
import AuthContext from "../../Routes_Navigation/Context";

class Login extends Component {
     state = { 
        username:"",
        password:"",
        show_password:true
      }

      login_Now = () => {
          Keyboard.dismiss(),
          this.props.user_Login(this.state.username, this.state.password, this.context)
      }

     render() {
         return (
            <View style={styles.main} > 
                <ScrollView> 
                    <View style={styles.Login_container} >
                        <Text style={styles.heading_Txt} >
                            Login to your account
                        </Text>
                        <View style={{marginTop:"7%"}} >
                            <Text style={styles.Txt} >email</Text>
                            <TextInput 
                                style={styles.Input_Style}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({username: text})}
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.NextInput.focus()}
                            />
                            <Text style={styles.Txt} >password</Text>
                            <TextInput 
                                ref={ref => { this.NextInput = ref; }}
                                style={styles.Input_Style}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}
                                blurOnSubmit={false} 
                                secureTextEntry={this.state.show_password?true:false}
                                onSubmitEditing={this.login_Now}
                            />
                            { this.props.Loading_Failed ? <Text style={{color:"yellow"}} >{this.props.error}</Text> : null }
                        </View>
                        <View style={{ flexDirection:'row' , alignItems:"center"  , justifyContent:"space-between" , marginTop:"5%" }} >
                           {
                               this.state.password !== "" &&  
                                <TouchableOpacity onPress={()=> this.setState({show_password: !this.state.show_password})}  >
                                        {
                                            this.state.show_password ?
                                            <Text style={[styles.Txt,{color:'#FFB81A' , fontFamily:"Bold"}]} >Show Passsword</Text>
                                            :
                                            <Text style={[styles.Txt,{color:'#FFB81A' , fontFamily:"Bold"}]} >Hide Passsword</Text>
                                        }
                                </TouchableOpacity>
                           }
                            
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("Email_Recovery")}  >
                                <Text style={[styles.Txt,{color:"#C63520"}]} >forget?</Text>
                            </TouchableOpacity>
                        </View>
                       {
                           this.props._loader ?
                            <View style={styles.Login_btn} >
                                <ActivityIndicator color="white" size="large" />
                            </View>
                            :
                            <TouchableOpacity style={styles.Login_btn} onPress={this.login_Now} >
                            {/* // <TouchableOpacity style={styles.Login_btn} onPress={() => this.props.navigation.navigate("AppRoutes")} > */}
                                <Text style={[styles.Txt,{color:"#FFFFFF"}]} > Login </Text>
                            </TouchableOpacity>
                       }
                            <TouchableOpacity style={[styles.Login_btn, {backgroundColor:"#FFB81A"}]} onPress={()=>this.props.navigation.goBack()} >
                                <Text style={[styles.Txt,{color:"#060A16"}]} > Back </Text>
                            </TouchableOpacity>
                    </View>
                    {/* <View style={{flexDirection:"row" , alignItems:"center" , justifyContent:"center", marginTop:"8%"}} >
                        <Image source={require('../../Imagess/Line1.png')} style={{ width:"45%" , height:3 }} />
                        <Text style={{ fontFamily:'Light' , color:"#273253", fontSize:12,lineHeight:13 }} >OR</Text>
                        <Image source={require('../../Imagess/Line1.png')} style={{ width:"45%" , height:3 }} />
                    </View>
                    <View style={styles.OtherLogin_container} >
                        <TouchableOpacity style={[styles.Login_btn,{backgroundColor:"#FFB81A"}]} >
                                <Text style={[styles.Txt,{color:"#060A16"}]} > Login with Facebook </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Login_btn,{backgroundColor:"#FFB81A"}]} >
                                <Text style={[styles.Txt,{color:"#060A16"}]} > Login with Twitter </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Policy_container} >  
                        <TouchableOpacity style={styles.priv_btn} >
                                <Text style={styles.Pol_Txt} > Privacy Policy </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.priv_btn} >
                                <Text style={styles.Pol_Txt} > Terms Of Use </Text>
                        </TouchableOpacity>
                    </View>
                    */}
                    {/* <View style={{ width:'35%', height:3 , backgroundColor:"#FFFFFF" , borderRadius:100, alignSelf:"center" }} /> */}
                </ScrollView>
            </View>    
         );
     }
 }

 Login.contextType = AuthContext;

function mapStateToProps(state) {
    return{
        _loader: state.Login_Reducer.Loader,
        error: state.Login_Reducer.error,
        Loading_Failed:state.Login_Reducer.loginFailed,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        user_Login:(email,password,context) => dispatch(ChangeLogin(email,password,context))
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Login);

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'5%',
        paddingBottom:"0%"
     },
     Login_container:{
        flex:1.5,
        padding:"5%",
        paddingTop:"25%",
        // alignSelf:"center",
     },
     OtherLogin_container:{
         flex:1,
         alignItems:"center",
         justifyContent:"space-evenly",
         padding:"5%",
         marginTop:"8%",
     },
     Policy_container:{
        flex:0.3,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-evenly",  
        marginTop:"5%",
    },
    Pol_Txt:{
        fontSize:12,
        lineHeight:18,
        fontFamily:"Medium",
        color:'#273253', 
     },
     Txt:{
        fontSize:14,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF',
        // textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
     }, 
     heading_Txt:{
        fontSize:24,
        lineHeight:25,
        fontFamily:"SemiBold",
        color:'#FFB81A', 
        textAlign:"left"
     },
     Input_Style:{
        // width:wp('80%'),
        // height:hp('6%'),
        width:"100%",
        height:45,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:12,
        borderWidth:1,  
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%"
     },
     Login_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     }
 })