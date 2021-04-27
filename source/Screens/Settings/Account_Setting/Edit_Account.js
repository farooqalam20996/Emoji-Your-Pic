import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator
 } from 'react-native';
 import Setting_Header from "../Setting_Header";
 import Modal from "react-native-modal";
 import { Feather , AntDesign} from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../../Routes_Navigation/MainURL';
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

var axios = require('axios');
var FormData = require('form-data');
 
var that;
class Edit_Accounts extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            user_name:"",
            full_name:"",
            number:null,
            IsModalVisible:false,
            Loader:false,
            Failed:false,
            Success:false,
            Image_uri:null,
            visible:false,

        }
    }

    componentDidMount(){
        that = this;
        this.requestPermision();
        AsyncStorage.getItem('user' , (err , data)=>{
            const user = JSON.parse(data)
            this.setState({user_name: user.username , full_name: user.full_name , number: user.phone_number , Image_uri:user.image  })
        })
    }

    onDismissSnackBar=()=>{
        this.setState({visible: false})
    }

    toggleModal = () => {
        this.setState({ IsModalVisible: !this.state.IsModalVisible  })
    }

    requestPermision = async () => {
        const {granted} = await ImagePicker.getCameraRollPermissionsAsync();
        // if(!granted) return alert("You need to get permission first");
    }  

    select_image = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsMultipleSelection:true,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ Image_uri: result.uri},()=>{
                this.Update_Profile()
            })
        }
    };
    
    Open_Camera =async () => {
        const catch_Image = await ImagePicker.launchCameraAsync();
        if(!catch_Image) return alert("Camera didn't reading... ");
        this.setState({Image_uri:catch_Image.uri},()=>{
            this.Update_Profile()
        })
    }

    Update_Profile=()=>{
       that.setState({Loader:true})
        // var fs = require('fs');
        var data = new FormData();
        data.append('username', that.state.user_name);
        data.append('full_name', that.state.full_name);
        data.append('phone_number', that.state.number);
        // data.append('image', fs.createReadStream('/path/to/file'));
        data.append("image", {
            name: "image.jpg",
            type: "image/jpeg",
            uri: Platform.OS === "android" ? that.state.Image_uri : that.state.Image_uri.replace("file://", "")
        })
        console.log(that.state.Image_uri)

        var config = {
        method: 'post',
        url:API+"salvador_app/public/api/update-profile",
        headers: { 
            'Authorization': that.props._token,
        },
        data : data
        };
        console.log(data)
        console.log(that.props._token)

        axios(config)
        .then(function (response) {
            if(response.data.success){
                console.log(JSON.stringify(response.data));
                that.setState({Success: true, Loader:false, visible:true})
            }
            else{
                console.log(JSON.stringify(response.data));
                that.setState({Loader:false , Failed:true,visible:false})

            }
        })
        .catch(function (error) {
            console.log(error);
            that.setState({Loader:false, Failed:true, visible:false})

        });
    }



     render() {
        return (
            <View style={styles.main}>
                <Setting_Header Heading="Edit Account" onpress={()=> this.props.navigation.goBack()} />
                <View style={styles.container} >
                    <ScrollView style={{flex:1}} >

                        <View style={styles.Image_Container} >
                            <View style={styles.Image_Circle} >
                                {
                                    this.state.Image_uri ? 
                                        <Image source={{uri: this.state.Image_uri}}  style={{width:"100%" , height:"100%" , borderRadius:100}}  />
                                        :
                                        <Image source={{uri: this.props._user.image}} style={{width:"100%" , height:"100%" , borderRadius:100}}  />

                                }
                                {/* <Image source={{uri: this.state.Image_uri}}  style={{ width:"100%" , height:"100%" , borderRadius:100 }}  />  */}
                                
                                <TouchableOpacity style={styles.add_btn} onPress={this.toggleModal} >
                                    <Feather name="plus" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    <View style={styles.Input_Container} >
                        <Text style={styles.Txt} >username</Text>
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.state.user_name}
                            onChangeText={(text) => this.setState({user_name: text})}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput.focus()}
                        />
                        <Text style={styles.Txt} >fullname</Text>
                        <TextInput 
                            ref={ref => { this.NextInput = ref; }}
                            style={styles.Input_Style}
                            value={this.state.full_name}
                            onChangeText={(text) => this.setState({full_name: text})}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput2.focus()}
                        />

                        <Text style={styles.Txt} >Phone Number</Text>
                        <TextInput 
                            ref={ref => { this.NextInput2 = ref; }}
                            style={styles.Input_Style}
                            value={this.state.number}
                            onChangeText={(text) => this.setState({number: text})}
                            blurOnSubmit={false}
                        />
                        
                    </View>
                    <View style={styles.Btn_Container} >
                       {
                           this.state.Loader ?
                            <View style={styles.Save_btn}  >
                                <ActivityIndicator size="large" color="black" />
                            </View>
                            :
                            <TouchableOpacity style={styles.Save_btn} onPress={() => this.Update_Profile()}  >
                                <Text style={[styles.Txt,{color:"#000000"}]} > Save &amp; Proceed </Text>
                            </TouchableOpacity>
                       }
                    </View>
                    {
                        this.state.Success?
                        <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                            Successfully Updated
                        </Text>
                        :
                        (
                            this.state.Failed ?
                            <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                                Failed To Update
                            </Text>
                            :       
                            null
                        )
                    }  
                </ScrollView> 
                        <Snackbar style={{backgroundColor:"#18CE73" , width:"90%" , borderRadius:45 }} visible={this.state.visible} onDismiss={this.onDismissSnackBar}  duration={2000} >
                            <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                                Successfully Updated
                            </Text>
                        </Snackbar>
                {/* {
                    this.state.Success?
                    <Snackbar style={{backgroundColor:"#18CE73" , width:"90%" , borderRadius:45 }} visible={this.state.visible} onDismiss={this.onDismissSnackBar}  duration={2000} >
                        <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                            Failed To Update
                        </Text>
                    </Snackbar>
                    :
                    (
                        this.state.Failed ?
                        <Snackbar style={{backgroundColor:"#FF3B30" , width:"90%" , borderRadius:45 }} visible={this.state.visible} onDismiss={this.onDismissSnackBar}  duration={2000} >
                            <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                                Failed To Update
                            </Text>
                        </Snackbar>
                        :
                        null
                    )
                }   */}

                
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
                            <TouchableOpacity style={styles.btn_media} onPress={()=> this.Open_Camera()} >
                                <Feather name="camera" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn_media} onPress={()=> this.select_image()} >
                                <AntDesign name="picture" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                </Modal>
                </View>
            </View>   
         );
     }
 }

function mapStateToProps(state) {
    return{
        _token:state.Login_Reducer.token,
        _user:state.Login_Reducer.user,
    }
}

 export default connect(mapStateToProps, null)(Edit_Accounts)

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16",
        paddingBottom:"0%"
    }, 
    container:{
        flex:1,
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
     Btn_Container:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginTop:"5%"
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
        bottom:"1%"
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