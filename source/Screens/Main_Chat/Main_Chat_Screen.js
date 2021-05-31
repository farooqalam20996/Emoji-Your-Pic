import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    FlatList,
    Platform,
    Keyboard,
 } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Message_Header from "../../ScreenComponents/NewMessage_Component/Message_Header";
import Spinner from "react-native-loading-spinner-overlay";
import Message from './Message';
import { Snackbar } from "react-native-paper";
import { API } from '../../Routes_Navigation/MainURL';
import ImageModal from '../../ScreenComponents/common/ImageModal';
import Stickers from '../../ScreenComponents/Chat_Component/Stickers';
import AsyncStorage from '@react-native-community/async-storage';
import data from '../../data/stickers.json';
var axios = require('axios');
var FormData = require('form-data');

var chatID;
var that;
var index;
class Chatting extends Component {
    constructor(props){
        super(props);
        this.state = { 
            token:'',
            err:false,
            spinner:false,
            isBlocked:this.props.route.params.person.isBlocked,
            blockedBy:this.props.route.params.person.blockedBy,
            InputTxt:"",
            msgs:[],
            image:"",
            visible:false,
            online: false,
            sticker:false,
            stickers:[],
            stickersOpen:false,
            search:'',
            // index:0,
        } 
    }
    stickersHolder = [];

    componentWillUnmount() {
        this._unsubscribe();
    }
    componentDidMount(){
        chatID = null;
        index = 0;
        that = this;

        this.checkOnline();
        this.createChat();
        this.fetchMessages();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('emojiToken',(err,data)=>{
                this.setState({token:JSON.parse(data)},()=>{
                    // this.loadStickers()
                })
            })
        })
    }
    componentWillUnmount(){
        const {firebase_id} = this.props.user;
        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .get()
        .then((chat)=>{
            const data = chat.data()
            if(!data.readBy.includes(firebase_id)){
                firebase.firestore.collection('chats')
                .doc(chatID)
                .set(
                    {
                        readBy: [...data.readBy,firebase_id],
                    },
                    {
                        merge:true
                    }
                ).then((res)=>console.log(res)).catch((err)=>console.log(err))
            }    
        })
    }
    checkOnline = () => {
        const {id} = this.props.route.params.person
        
        firebase.firestore
        .collection('users')
        .doc(id)
        .onSnapshot((snapshot)=>{
            this.setState({online: snapshot.data().online})
        })
    }
    checkChatExists = async (firebase_id,userID) => {
        var ch1,ch2 = false;
        await firebase.firestore.collection('chats').doc(`${firebase_id}_${userID}`)
        .get().then((chat)=>{
            if(chat.exists){
                ch1 = true;
            }
        })
        await firebase.firestore.collection('chats').doc(`${userID}_${firebase_id}`)
        .get().then((chat)=>{
            if(chat.exists){
                ch2 = true;                
            }
        })
        if(ch1 || ch2){
            return true
        }else{
            return false;
        }
    }
    createChat = async () => {
        const user = this.props.route.params.person
        const {firebase_id,full_name,id,image} = this.props.user;
        var check = await this.checkChatExists(firebase_id,user.id)
        if(!check){
            chatID = `${firebase_id}_${user.id}`;
            firebase.firestore.collection('chats').doc(`${firebase_id}_${user.id}`).set({
                lastMessage: new Date().getTime(),
                lastMessageBy: ``,
                lastMessageText: ``,
                fromID: firebase_id,
                fromName: full_name,
                fromPhoto:image,
                toID: user.id,
                toPhoto:user.image,
                toName: user.name,
                isBlocked: false,
                blockedBy: '',
                deletedBy: [firebase_id,user.id],
                read: false,
                readBy: [],
            }).then(()=>{
                firebase.firestore.collection('chats').doc(`${firebase_id}_${user.id}`)
                .collection('messages')
                .add({})
                .then(()=>{ 
                    console.log('chat created')
                })
                .catch((err)=>alert(err))
            }).catch((err)=>{
                alert(err)
            })
        }else{
            console.log('chat already exists')
        }   

    }
    
    select_image = async () => {
        this.setState({stickersOpen:false})
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsMultipleSelection:true,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
    });
        console.log(result);
        if (result.cancelled) {
            this.setState({ image: "",visible:false})
        }else{
            this.setState({ image: result.uri, visible:true})
        }
    };
    sendImage = (uri) => {
        that.input.clear()
        this.setState({visible:false, stickersOpen:false})
        var tempID = new Date().getTime();
        const fromID = this.props.user.firebase_id;
        const toID = this.props.route.params.person.id;

        this.setState({msgs:[{id:tempID,data:{
            image: uri,
            text:this.state.sticker ? "" : this.state.InputTxt,
            createdAt: tempID,
            fromID:fromID,
            toID: toID,
        }},...this.state.msgs]});

        var data = new FormData();
        data.append('firebase_id', this.props.user.firebase_id );
        data.append("c_image", {
            name: "image.jpg",
            type: "image/jpeg",
            uri: Platform.OS === "android" ? uri : uri.replace("file://", "")
        })
        var config = {
            method: 'post',
            url: API+'salvador_app/public/api/chat-image',
            headers: { 
                'Authorization': this.props.token
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            if(response.data.success){
                that.onSend(response.data.imageUrl)
            }else{
                alert("cant send")
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    blockUser = () => {
        this.setState({stickersOpen:false})
        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .set({
            isBlocked:true,
            blockedBy: this.props.user.firebase_id
        },{
            merge:true
        })
    }
    unblockUser = () => {
        // this.setState({stickersOpen:false})
        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .set({
            isBlocked:false,
            blockedBy: ''
        },{
            merge:true
        })
    }
    fetchMessages = async () => {

        const {firebase_id} = this.props.user;
        const {id} = this.props.route.params.person;
        
        await firebase.firestore.collection('chats').doc(`${firebase_id}_${id}`)
        .get().then((chat)=>{
            if(chat.exists){
                chatID = `${firebase_id}_${id}`
            }
        })
        await firebase.firestore.collection('chats').doc(`${id}_${firebase_id}`)
        .get().then((chat)=>{
            if(chat.exists){
                chatID = `${id}_${firebase_id}`
            }
        })

        //to get chat messages
        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .collection('messages')
        .orderBy("createdAt","desc")
        .onSnapshot((snapshot)=>{
            const messages = snapshot.docs.map(doc=>{
                const data = {
                    id:doc.id,
                    data:doc.data(),
                }
                return data;
            });
            this.setState({msgs:messages})
        });   
        // firebase.firestore
        // .collection('chats')
        // .doc(chatID)
        // .collection('messages')
        // .orderBy("createdAt","desc")
        // .onSnapshot((snapshot)=>{
        //     snapshot.docs.map(doc=>{
        //         if(this.state.msgs.some(msg => msg.id == doc.id)){
        //             if(doc.data().toID === firebase_id ){
        //                 firebase.firestore
        //                 .collection('chats')
        //                 .doc(chatID)
        //                 .collection('messages')
        //                 .doc(doc.id)
        //                 .set({
        //                     seen:true
        //                 },{merge:true})
        //             }
        //         }
        //     })
        // })
        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .onSnapshot((snapshot)=>{
            const data = snapshot.data();
            if(this.state.isBlocked !== data.isBlocked){
                this.setState({isBlocked: data.isBlocked, blockedBy: data.blockedBy, stickersOpen:false})
            }
        });

        firebase.firestore
        .collection('chats')
        .doc(chatID)
        .onSnapshot((snapshot)=>{
            const data = snapshot.data()
            if(data.lastMessageBy !== firebase_id){
                firebase.firestore.collection('chats')
                .doc(chatID)
                .set(
                    {
                        read:true
                    },
                    {
                        merge:true
                    }
                ).then((res)=>console.log(res)).catch((err)=>console.log(err))
            }
        })
        
    }
    onSend = (image) => {
        if(this.state.InputTxt !== "" || image){

            const text = this.state.sticker ? "" : this.state.InputTxt.trim();
            this.setState({InputTxt:''})
            const fromID = this.props.user.firebase_id;
            const toID = this.props.route.params.person.id;

            const obj = image ? 
            {
                image: image,
                text:text,
                createdAt: new Date().getTime(),
                seen:false,
                fromID: fromID,
                toID: toID,
            }
            :
            {
                text: text,
                createdAt: new Date().getTime(),
                fromID: fromID,
                seen:false,
                toID: toID,
            }

            firebase.firestore.collection('chats').
            doc(chatID)
            .collection('messages')
            .add(
            obj
            ).then(()=> {
                
            }).catch((err)=>console.log(err))

            firebase.firestore.collection('chats')
            .doc(chatID)
            .set(
                {
                    lastMessage: new Date().getTime(),
                    lastMessageBy: fromID,
                    lastMessageText: this.state.sticker ? "Sticker" : image ? "Image" : this.state.InputTxt.trim(),
                    deletedBy: [fromID,toID],
                    read: false,
                    readBy: [fromID],
                },
                {
                    merge:true
                }
            ).then((res)=>{
                this.setState({sticker:false})
                console.log(res)
            }).catch((err)=>console.log(err))
        }
    }
    onStickerToggle = () => {
        Keyboard.dismiss()
        this.setState({stickersOpen:!this.state.stickersOpen})
    }
    onKeyBoardFocus = () => {
        this.setState({stickersOpen:false})
    }
    onStickerPress = (url) => {
        console.log('Sending')
        this.setState({stickersOpen:false, sticker:true},()=>{
            this.onSend(url)
        })
    }
    loadStickers = () => {
        const {face_id} = this.props.user; 

        if(index < data.length && this.state.token && face_id !== null){

            var config = {
                method: 'get',
                url: `https://mirror-ai.p.rapidapi.com/sticker?face_id=${face_id}&sticker=${data[index].name}`,
                headers: {
                    'x-token': this.state.token,
                    'x-rapidapi-key': '3ca768db05mshf967ccfe8d3d836p153cabjsnce21c5e3d1cc',
                    'x-rapidapi-host': 'mirror-ai.p.rapidapi.com',
                },
            };
            console.log(config)
            axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                if(response.data.ok){
                    that.stickersHolder.push({id:index+1, name: data[index].name, url: response.data.url})
                    that.setState({
                        stickers:[...that.state.stickers,{id:index+1, name: data[index].name, url: response.data.url}],
                        // index:that.state.index+1
                    })
                    index += 1; 
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    contains = (name, query) => {
        // const squery = String(query).toLocaleLowerCase()
        // const check = name.length > 1 ? String(name[1]).toLocaleLowerCase().includes(squery) : false
        
        // if (String(name[0]).toLocaleLowerCase().includes(squery) || check) {
        //   return true
        // }
        // return false
        const squery = String(query).toLocaleLowerCase()
        const check = String(name).toLocaleLowerCase().includes(squery)
        
        if (check) {
          return true
        }
        return false
    }
    search = (text) => {
        const stickers = this.stickersHolder.filter(sticker => {
            return this.contains(sticker.name, text)
        })
        this.setState({ stickers, search:text})
    }
    render() {
        const {firebase_id} = this.props.user; 
        const name = this.props.route.params.person.name.charAt(0).toUpperCase()+this.props.route.params.person.name.substr(1).toLowerCase();;
        const blockedText = this.state.blockedBy == firebase_id ? name+" has been blocked by you" : "You have been blocked by "+name;
        return (
            <>
                <Snackbar style={{backgroundColor:"#18CE73", width:"90%", borderRadius:45 }} visible={this.state.err} onDismiss={this.onDismissSnackBar}  duration={3500} >
                    <Text style={[styles.Txt,{color:'#FFFFFF' , fontFamily:"Bold"}]} >
                        Some Problem Occurred!
                    </Text>
                </Snackbar>
                <Spinner
                    visible={this.state.spinner}
                    // textContent={'Blocking '+name}
                    // textStyle={{color:'#FFCF30' , fontFamily:"Bold" }}
                />
                <ImageModal 
                    visible={this.state.visible}
                    name={name}
                    close={()=>this.setState({visible:false})}
                    input={this.state.InputTxt}
                    inputChange={(text)=>this.setState({InputTxt:text})}
                    send={this.sendImage}
                    image={this.state.image}
                />
                <View style={styles.Chat_Head} >
                    <Message_Header
                        userID={firebase_id}
                        person={this.props.route.params.person}
                        name={name}
                        online={this.state.online}
                        onpress={()=> this.props.navigation.goBack()}
                        onBlockPress={this.blockUser}
                        onUnBlockPress={this.unblockUser}
                        isBlocked={this.state.isBlocked}
                        blockedBy = {this.state.blockedBy}
                    />
                </View>
                <View style={styles.main} >
                    <View style={styles.First} >
                        <FlatList 
                            inverted
                            data={this.state.msgs}
                            renderItem={({item})=>
                                <Message 
                                    data={item.data} 
                                    side={item.data.fromID == this.props.user.firebase_id ? 'right':'left'}
                                    // photo={item.data.fromID == this.props.user.firebase_id ? this.props.user.image: this.props.route.params.person.image}
                                />
                            }
                        />
                    </View>
                    <View>
                        {this.state.isBlocked
                            ?
                            <Text style={{textAlign:'center',color:'#FFB81A',padding:'3%'}}>{blockedText}</Text>
                            :
                            <View style={styles.Outer_Area}>
                        
                                <TouchableOpacity style={styles.trigger} onPress={this.onStickerToggle}>
                                    {/* <Image source={require("../../Imagess/camera.png")} style={{width:'50%' , height:"50%"}} /> */}
                                    <MaterialIcons name="tag-faces" size={26} color="#C63520" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.trigger} onPress={this.select_image}>
                                    <Entypo name="images" size={22} color="#C63520" />
                                </TouchableOpacity>

                                <TextInput
                                    onFocus={this.onKeyBoardFocus}
                                    ref={input=> this.input = input}
                                    style={styles.Input_style}
                                    value={this.state.InputTxt}
                                    onChangeText={(text)=> this.setState({InputTxt: text})}
                                    placeholder="Type to start chat"
                                    placeholderTextColor="#FFFFFF"
                                    clearTextOnFocus={true}
                                    // autoFocus={true}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    blurOnSubmit={false}
                                    multiline
                                    scrollEnabled={true}
                                />
                                <TouchableOpacity disabled={this.state.InputTxt.trim() == ""} style={styles.trigger} onPress={()=>this.onSend(null)} >
                                    <Image source={require("../../Imagess/send.png")} style={{width:'50%' , height:"50%"}} />
                                </TouchableOpacity>
                            </View>
                        }
                        {/* {this.state.stickersOpen
                            && */}
                            <Stickers
                                search={this.state.search}
                                onChange={(text)=>this.search(text)}
                                navigation={this.props.navigation}
                                onPress={this.onStickerPress}
                                stickers={this.state.stickers}
                                load={this.loadStickers}
                                faceID={this.props.user.face_id}
                                visible={this.state.stickersOpen}
                                modalToggle={()=>this.setState({stickersOpen:false})}
                            />
                        {/* } */}
                    </View>    
                </View>
            </>
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.Login_Reducer.user,
        token: state.Login_Reducer.token,
    }
}

export default connect(mapStateToProps,null)(Chatting)

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        // padding:'5%',
    },
    // scrollableModal: {
    //     height: '50%',
    //     backgroundColor:'white',
    //     borderTopLeftRadius:8,
    //     borderTopRightRadius:8,
    //     paddingLeft:'2%',
    //     paddingRight:'2%',
    //     paddingTop:'2%'
    // },
    Txt:{
        fontSize:14,
        lineHeight:16,
        fontFamily:"Regular",
        color:'#FFFFFF',
        textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
     }, 
    Chat_Head:{
        width:"100%",
        // height:130,
        justifyContent:'center',
        padding:'5%',
        paddingBottom:'1%',
        borderBottomColor:"#060A16",
        borderBottomWidth:2,
        backgroundColor:"#060A16"
    },
    First:{
        width:'100%',
        flex:1,
        backgroundColor:"#060A16",
    },
    Outer_Area:{
        width:"100%",
        // height:47,
        backgroundColor:"#7676801F",
        alignItems:"center",
        flexDirection:'row',
        // justifyContent:"",
        alignSelf:"flex-end",
        // paddingTop:"1%",
        borderTopColor:"#273253",
        borderTopWidth:1
    },
    Input_style:{
        width:"70%",
        // height:47,
        maxHeight:120,
        minHeight:47,
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        alignItems:"center",
        paddingLeft:"3%",
        fontFamily:'Regular',
        fontSize:14,
        color:'#FFFFFF',
        letterSpacing:0,
        lineHeight:16,
        paddingTop:"2%",
    },
    trigger:{
        backgroundColor:'#0C1326',
        width:35,
        height:35,
        borderRadius:8,
        justifyContent:'center',
        alignItems:"center",
        alignSelf:"flex-end"
    },
    Reciever:{
        flexDirection:'row',
        justifyContent:'center',
        padding:'10%'
    },
    Sender:{
        flexDirection:'row',
        justifyContent:'center',
        padding:'10%',
    },
    Msg_Container_Reciever:{
        width:'100%',
        height:'auto',
        backgroundColor:'#C63520',
        borderRadius:12,
        marginLeft:"3%",
        padding:'5%'
    },
    Txt_Message:{
        fontFamily:'Regular',
        fontSize:13,
        letterSpacing:0,
        lineHeight:15,
        textAlign:'left'
    },
    Msg_Container_Sender:{
        width:'100%',
        height:'auto',
        backgroundColor:'#FFB81A',
        borderRadius:12,
        padding:'5%'
    },
    Review_Btn:{
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#2E8BFF",
        borderRadius:8,
    },
    image:{
        width:"100%",
        height:"70%",
        marginTop:"20%"
    },
    
})


