import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
 } from 'react-native';
 import { connect } from "react-redux";
import { Login_Success } from '../../Redux/Constants';

class Login_SignUp extends Component {
     
    componentDidMount(){
            AsyncStorage.getItem('updated',(err,data)=>{
                // alert(typeof data)
                const update = JSON.parse(data);
                if(update){
                    if(!update.updated){
                        this.props.navigation.replace('SignUp_Profile')
                    }
                }
            })
            AsyncStorage.getItem('verified',(err,data)=>{
                // alert(typeof data)
                const verify = JSON.parse(data);
                if(verify){
                    if(!verify.verified){
                        this.props.navigation.replace('SignUp_OTP_Verification')
                    }
                }
            })
    }

      onEvent = () => {
            this.props.clearLoader()
            this.props.navigation.navigate("Login_Page")
      }

     render() {
         return (
             <View style={styles.main} >
                 <View style={styles.Image_container} >
                     <Image source={require('../../Imagess/logo.png')}  style={{ width:"80%" , height:"55%" }} />
                 </View>
                 <View style={styles.Buttons_container}>
                     <TouchableOpacity style={styles.Login_btn} onPress={() => this.onEvent()} >
                            <Text style={styles.Txt} > Login </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.Login_btn,{backgroundColor:"#C63520", marginTop:"5%"}]} onPress={() => this.props.navigation.navigate("SignUp_Page")} >
                            <Text style={[styles.Txt, {color:"#FFFFFF"}]} > Get Started </Text>
                     </TouchableOpacity>
                 </View>
                 <View style={styles.Policy_container} >  
                     <TouchableOpacity style={styles.priv_btn} onPress={()=> this.props.navigation.navigate("Privacy_Policy")} >
                            <Text style={styles.Pol_Txt} > Privacy Policy </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.priv_btn} onPress={()=> this.props.navigation.navigate("Terms_use")} >
                            <Text style={styles.Pol_Txt} > Terms Of Use </Text>
                     </TouchableOpacity>
                 </View>
                 {/* <View style={{ width:'35%', height:3 , backgroundColor:"#FFFFFF" , borderRadius:100, alignSelf:"center" }} /> */}
             </View>
         );
     }
 }

 function mapStateToProps(state) {
     return{
         Loader:state.Login_Reducer.Loader
     }
 }

 function mapDispatchToProps(dispatch) {
     return{
         clearLoader:()=> {dispatch({type: Login_Success})}
     }
 }

 export default connect(mapStateToProps , mapDispatchToProps)(Login_SignUp);

 const styles = StyleSheet.create({
     main:{
         flex:1,
         backgroundColor:"#060A16",
         padding:'6%'
     },
     Image_container:{
         flex:2,
         alignItems:"center",
        //  justifyContent:"center"
     },
     Buttons_container:{
         flex:0.8,
         alignItems:"center",
         justifyContent:"center",
     },
     Policy_container:{
         flex:0.3,
         flexDirection:"row",
         alignItems:'center',
         justifyContent:"space-evenly",  
     },
     Login_btn:{
         width:"90%",
         height:55,
         backgroundColor:"#FFB81A",
         alignItems:'center',
         justifyContent:'center',
         borderRadius:12
     },
     Txt:{
         fontSize:18,
         lineHeight:27,
         fontFamily:"Medium",
         color:'#060A16',
         opacity:1
     },
     Pol_Txt:{
        fontSize:12,
        lineHeight:18,
        fontFamily:"Medium",
        color:'#273253', 
     }
 })