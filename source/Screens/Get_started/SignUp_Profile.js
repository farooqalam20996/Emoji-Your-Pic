import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    ScrollView
 } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { Feather , AntDesign} from '@expo/vector-icons'; 
import { connect } from "react-redux";
import { Username, Fullname , Email_Address , User_Password, User_ConfirmPassword, PhoneNumber, ImageURI, Update_Profile } from "../../Redux/Actions/User_SignUp_Action";
import AsyncStorage from '@react-native-community/async-storage';
// import { EmailVerification } from "../../Redux/Actions/EmailRegistration_Action";
// import PhoneInput from "react-phone-number-input/react-native-input";
import { Snackbar } from "react-native-paper";


class SignUp_Profile extends Component {

     state = { 
        spinner:false,
        IsModalVisible:false,
        visible:false,
        show:false
      }

      requestPermision = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync();
        // if(!granted) return alert("You need to get permission first");
    }   

    componentDidMount(){
        this.requestPermision();
    }


    select_image = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection:true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
            console.log(result);
        if (!result.cancelled) {
            this.props._Image_Uri(result)

        }
      };

    Open_Camera =async () => {
            const catch_Image = await ImagePicker.launchCameraAsync();
            if(!catch_Image) return alert("Camera didn't reading... ");
            this.props._Image_Uri(catch_Image)
            console.log(JSON.stringify(catch_Image))
    }


      result = () => {
          if( 
              this.props.user_name == "",
              this.props.full_name == "",
              this.props.Email == "",
              this.props.phoneNumber == "",
              this.props.password == "",
              this.props.Image_uri == ""
            )
          {
            this.setState({visible: true})
          }
          else{
            this.props.password !== this.props.C_Password ?
            this.setState({show: true})
            :
            AsyncStorage.getItem('fid',(err,data)=>{
              
                this.props._Update_Profile(
                    // this.props.userID,
                    this.props.user_name,
                    this.props.full_name,
                    this.props.Email,
                    this.props.phoneNumber,
                    this.props.password,
                    this.props.Image_uri,
                    JSON.parse(data),
                ) 
            })
          }
      }

      toggleModal = () => {
        this.setState({ IsModalVisible: !this.state.IsModalVisible  })
    }

     render() {
        //  this.props.userID == this.state.id
         return (
            <View style={styles.main} >
                <Snackbar 
                        duration={3000} 
                        style={{ marginLeft:"10%", marginBottom:"25%" }}
                        visible={this.state.show} 
                        onDismiss={()=> this.setState({show: false})} 
                        action={{ label: 'Ok',  onPress:()=>{this.setState({show: false})}, }} >
                        Password miss match
                </Snackbar>
                <Snackbar 
                        duration={3000} 
                        style={{ marginLeft:"10%", marginBottom:"25%" }}
                        visible={this.state.visible} 
                        onDismiss={()=> this.setState({visible: false})} 
                        action={{ label: 'Ok',  onPress:()=>{this.setState({visible: false})}, }} >
                        Please fill all fields
                </Snackbar>
                    <View style={styles.Image_Container} >
                        <View style={styles.Image_Circle} >
                            {
                                this.props.Image_uri ?
                                <Image source={{ uri: this.props.Image_uri.uri }} style={{ width:"100%" , height:"100%" , borderRadius:100 }} />
                                :
                                <Image source={require("../../Imagess/Profile.png")}  style={{ width:"100%" , height:"100%" , borderRadius:100 }}  /> 
                            }
                            <TouchableOpacity style={styles.add_btn} onPress={this.toggleModal} >
                                <Feather name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}} >
                    <View style={styles.Input_Container} >
                        <Text style={{color:"yellow"}} >{JSON.stringify(this.state.id)}</Text>
                        <Text style={styles.Txt} >username</Text>
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.props.user_name}
                            onChangeText={(text) => this.props._UserName(text)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput.focus()}
                        />
                        <Text style={styles.Txt} >fullname</Text>
                        <TextInput 
                            ref={ref => { this.NextInput = ref; }}
                            style={styles.Input_Style}
                            value={this.props.full_name}
                            onChangeText={(text) => this.props._FullName(text)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput1.focus()}
                        />
                        <Text style={styles.Txt} >email</Text>
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.props.Email}
                            blurOnSubmit={false}
                            editable={false}
                        />
                        <Text style={styles.Txt} >password</Text>
                        <TextInput 
                            ref={ref => { this.NextInput1 = ref; }}
                            style={styles.Input_Style}
                            value={this.props.password}
                            onChangeText={(text) => this.props._Password(text)}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            onSubmitEditing={() => this.NextInput2.focus()}
                        />
                        <Text style={styles.Txt} >confirm password</Text>
                        <TextInput 
                            ref={ref => { this.NextInput2 = ref; }}
                            style={styles.Input_Style}
                            value={this.props.C_Password}
                            onChangeText={(text) => this.props._C_Password(text)}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            onSubmitEditing={() => this.NextInput3.focus()}
                        />
                        {
                            this.props.password !== this.props.C_Password ?
                            <Text style={{color:"yellow"}} > Your Password is not same </Text>
                            :
                            <Text style={{color:"green"}} >Password Matched!</Text>
                        }
                        <Text style={styles.Txt} >Add number</Text>
                        <View style={{flexDirection:'row' , alignItems:"center"}} >
                            {/* <View style={styles.uni_num} >
                                <Image source={require('../../Imagess/flag.png')} style={{ width:28, height:28 , borderRadius:5 }} />
                                <Text style={{color:'#FFFFFF' , fontFamily:"Regular", fontSize:13}} >+1</Text>
                            </View> */}
                            <TextInput
                                ref={ref => { this.NextInput3 = ref; }}
                                style={[styles.Input_Style,{width:"100%"}]}
                                value={this.props.phoneNumber}
                                onChangeText={(text) => this.props._PhoneNumber(text)}
                                blurOnSubmit={false}
                                onSubmitEditing={()=> this.result()}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* <PhoneInput 
                            ref={ref => { this.NextInput3 = ref; }}
                            style={[styles.Input_Style,{width:"78%"}]}
                            value={this.props.phoneNumber}
                            onChange={(text) => this.props._PhoneNumber(text)}
                            country="US"
                            onSubmit={()=> this.result()}
                        /> */}

                        {
                            this.props._failed ?
                            <Text style={{ color:"yellow" }} > Profile not Updated </Text>
                            :
                            null
                        }
                    </View>
                    <View style={styles.Btn_Container} >
                        <TouchableOpacity style={styles.Save_btn} onPress={() => this.result()}  >
                            <Text style={[styles.Txt,{color:"#000000"}]} > Save &amp; Proceed </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


                    <Spinner
                        visible={this.props._Loader}
                        textContent={'Loading...'}
                        textStyle={{color:'#FFCF30' , fontFamily:"Bold" }}
                    />

                    <Modal 
                        isVisible={this.state.IsModalVisible}        
                        animationIn="slideInUp"
                        animationInTiming={300}
                        animationOutTiming={2000}
                        animationOut="slideOutDown"
                        onBackdropPress={this.toggleModal}
                        onBackButtonPress={this.toggleModal}
                        style={{width:"100%"}}
                    >
                    <View style={styles.media_style}>
                        <View style={{ width:"15%" , height:5 , borderRadius:10 , backgroundColor:"#D8D8D8" , alignSelf:"center" , marginTop:'3%' }} />     
                        <View style={{ flexDirection:'row' , alignItems:"center" , justifyContent:"space-between" }} >
                            <TouchableOpacity style={styles.btn_media} onPress={this.Open_Camera} >
                                <Feather name="camera" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn_media} onPress={this.select_image} >
                                <AntDesign name="picture" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                </Modal>
            
            </View>    
         );
     }
 }

 function mapStateToProps(state) {
    return{
        // userID: state.SignUp_Reducer.id,
        user_name: state.SignUp_Reducer.username,
        full_name:state.SignUp_Reducer.fullname,
        Email: state.EmailVerify.email,
       _Email2: state.SignUp_Reducer.email,
        password:state.SignUp_Reducer.password,
        C_Password:state.SignUp_Reducer.confirm_password,
        phoneNumber:state.SignUp_Reducer.phone_number,
        Image_uri:state.SignUp_Reducer.ImageUri,
       _Loader:state.SignUp_Reducer.loader,
       _failed:state.SignUp_Reducer.failed,
    }
 }

function mapDispatchToProps(dispatch) {
    return{
        _UserName: (text)=>dispatch(Username(text)),
        _FullName: (text)=>dispatch(Fullname(text)),
        _Password: (text)=>dispatch(User_Password(text)),
        _C_Password: (text)=>dispatch(User_ConfirmPassword(text)),
        _PhoneNumber: (text)=>dispatch(PhoneNumber(text)),
        _Image_Uri: (imguri)=>dispatch(ImageURI(imguri)),
        _Update_Profile: (username, fullname,email, phone_number, password, ImageUri,fid)=>dispatch(Update_Profile(username, fullname,email, phone_number, password, ImageUri,fid)),
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(SignUp_Profile);

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingTop:"10%",
        paddingBottom:"1%"
     },
     Image_Container:{
        // flex:1,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
        // backgroundColor:'red'
     },
     Image_Circle:{
        width:120,
        height:120,
        borderRadius:100,
        backgroundColor:"#FFB81A",
        padding:"2%"
     },
     Input_Container:{
        //  flex:2,
        width:"100%"
        //  backgroundColor:"blue"
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
     Txt:{
        fontSize:14,
        lineHeight:16,
        fontFamily:"Regular",
        color:'#FFFFFF',
        textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
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
        borderRadius:12,
        marginRight:"2%"
    },
     Btn_Container:{
         width:"100%",
         alignItems:"center",
         justifyContent:"center",
         marginTop:"10%"
        //  backgroundColor:"green"
     },
     Save_btn:{
        width:"100%",
        height:55,
        borderRadius:12,
        backgroundColor:"#FFB81A",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     },
     add_btn:{
         position:"absolute",
         width:30,
         height:30,
         backgroundColor:"#273253",
         borderRadius:100,
         alignItems:'center',
         justifyContent:'center',
         alignSelf:"flex-end",
         bottom:"-1%"
     },
     media_style:{
        top:'50%',
        width:'100%',
        backgroundColor:'#0C1326',
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        height:'40%',
        alignSelf:"center",
        marginLeft:"-10%",
        padding:'3%',
        paddingBottom:'25%'
    },
    btn_media:{ 
        width:'50%' , 
        height:'100%' , 
        alignItems:"center" , 
        justifyContent:'center' ,  
    },
    media_Txt:{
        fontFamily:'SemiBold',
        fontSize:14,
        color:'#FFB81A',
        letterSpacing:0,
        lineHeight:16
    }
 })