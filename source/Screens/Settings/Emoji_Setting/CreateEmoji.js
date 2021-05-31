import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { API } from '../../../Routes_Navigation/MainURL';
import AuthContext from '../../../Routes_Navigation/Context';
import Spinner from "react-native-loading-spinner-overlay";
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';
var axios = require('axios');
var FormData = require('form-data');

var that;

class CreateEmoji extends Component {
    state={
        face:'',
        loading:false,
        btnLoading:false,
        err:'',
        token:'',
    }
    componentDidMount(){
        that = this;
        AsyncStorage.getItem('emojiToken',(err,data)=>{
            this.setState({token:JSON.parse(data)})
        })
        if(this.props.user.face_id !== "null"){
            this.setState({face: {id: this.props.user.face_id, url: this.props.user.emojiUrl}})
        }
     
        // this.select_image()
    }
    select_image = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [2,2],
        });
        if (!result.cancelled) {
            this.setState({loading:true,err:''})
            console.log(result)
            var data = new FormData();
            data.append("imageData", {
                name: "image.jpg",
                type: "image/jpeg",
                uri: Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
            })
            var config = {
                method: 'post',
                url: API+'salvador_app/public/api/compress-image',
                data : data
            };
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if(response.data.success){
                    that.createEmoji(response.data.imageUrl) 
                }else{
                    that.setState({err: "Some Problem Occurred, Try Again", loading: false, face:''})
                }
            })
            .catch(function (error) {
                console.log(error);
                that.setState({err: "Some Problem Occurred, Try Again", loading: false, face:''})
            });

        }
    };
    createEmoji = (image) => {
        console.log('creating emoji');
        var data = new FormData();
        data.append("photo", {
            name: "image.jpg",
            type: "image/jpeg",
            uri: image
        })
        console.log(data)
        const options = {
            method: 'POST',
            url: 'https://mirror-ai.p.rapidapi.com/generate',
            headers: {
              'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
              'x-token': this.state.token,
              'x-rapidapi-key': '3ca768db05mshf967ccfe8d3d836p153cabjsnce21c5e3d1cc',
              'x-rapidapi-host': 'mirror-ai.p.rapidapi.com'
            },
            data: data
        };
        axios.request(options)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.ok){
                that.setState({face:response.data.face, loading:false})
            }else{
                that.setState({err: "Face not detected", loading: false, face:''})
            }
        })
        .catch(function (error) {
            that.setState({err: "Some Problem Occurred, Try Again", loading: false, face:''})
            console.log(error);
        });
    }
    onSavePress = () => {
        if(this.state.face.id){
            this.setState({btnLoading:true})
            var data = new FormData();
            data.append('face_id', that.state.face.id);

            var config = {
                method: 'post',
                url: 'https://mirror-ai.p.rapidapi.com/add_face',
                headers: { 
                    // 'content-type': 'application/x-www-form-urlencoded',
                    'x-token': that.state.token,
                    'x-rapidapi-key': '3ca768db05mshf967ccfe8d3d836p153cabjsnce21c5e3d1cc',
                    'x-rapidapi-host': 'mirror-ai.p.rapidapi.com',
                },
                data : data
            };
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if(response.data.ok){
                    var data2 = new FormData();
                    data2.append('username', that.props.user.username);
                    data2.append('full_name', that.props.user.full_name);
                    data2.append('phone_number', that.props.user.full_name);
                    data2.append('emojiUrl', that.state.face.url);
                    data2.append('face_id', that.state.face.id);
                    data2.append('emojiToken', that.state.token);

                    var config2 = {
                        method: 'post',
                        url: API+'salvador_app/public/api/update-profile',
                        headers: { 
                            'Authorization': that.props.token, 
                        },
                        data : data2
                    };

                    axios(config2)
                    .then(function (res) {
                        if(res.data.success){
                            that.setState({btnLoading:false})
                            AsyncStorage.setItem('user',JSON.stringify(res.data.userData), (err)=> err? true:false )
                            that.context.updateState()
                        }else{
                            that.setState({btnLoading:false})
                            alert('cant save, try again')
                        }
                        console.log(JSON.stringify(res.data));
                    })
                    .catch(function (error) {
                        that.setState({btnLoading:false})
                        alert('cant save, try again')
                        console.log(error);
                    });
                }else{
                    that.setState({btnLoading:false})
                    alert('cant save, try again')
                }
            })
            .catch(function (error) {
                that.setState({btnLoading:false})
                alert('cant save, try again')
                console.log(error);
            });

        }else{
            this.setState({btnLoading:false})
            alert('Image not found')
        }
    }
    render(){
        return(
            <View style={styles.main}>
                <Spinner
                    visible={this.state.btnLoading}
                    textContent={'Saving Your Emoji'}
                    textStyle={{color:'#FFCF30' , fontFamily:"Bold" }}
                />
                {
                    this.state.err
                    ? <Text style={{color:'white', textAlign:'center'}}>{this.state.err}</Text>
                    : (
                    this.state.loading 
                        ? <ActivityIndicator size={"large"} color="white" style={{flex:1}}/>
                        : <Image style={styles.imageStyle} source={this.state.face.id ? {uri: this.state.face.url} : require('../../../Imagess/Profile.png')}/>
                    )
                }
                {/* {this.state.image 
                    ? 
                    <Image style={styles.imageStyle} source={this.state.image}/>
                    :
                    <TouchableOpacity>
                        <Text>Open Camera</Text>
                    </TouchableOpacity>
                } */}
                <View>
                    <TouchableOpacity disabled={this.state.loading || this.state.btnLoading} onPress={()=>this.select_image()} style={styles.camButton}>
                        <Text style={{color:'white'}}>{this.state.face.id ? "Try Another" : "Create Emoji"} </Text>
                        <Entypo style={{marginLeft:8}} name="camera" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',height:40,marginTop:'2%', justifyContent:'space-between'}}>
                        <TouchableOpacity disabled={this.state.loading || this.state.btnLoading} onPress={()=>this.props.navigation.goBack()} style={[styles.buttonStyle,{backgroundColor:'orange'}]} >
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={this.state.loading || this.state.btnLoading} onPress={()=>this.onSavePress()} style={styles.buttonStyle}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return{
        user: state.Login_Reducer.user,
        token: state.Login_Reducer.token
    }
}

CreateEmoji.contextType = AuthContext;

export default connect(mapStateToProps,null)(CreateEmoji);

const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16",
        justifyContent:'space-between'
    },
    imageStyle:{
        height:300,
        width:'100%',
        marginTop:'15%'
    },
    camButton:{
        flexDirection:'row',
        height:40,
        width:'100%',
        borderRadius:10,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonStyle:{
        height:40,
        backgroundColor:'white',
        flex:1,
        margin:'1%',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }
})