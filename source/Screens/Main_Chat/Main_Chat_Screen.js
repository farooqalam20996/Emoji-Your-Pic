import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    FlatList,
 } from 'react-native';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Message_Header from "../../ScreenComponents/NewMessage_Component/Message_Header";
import Message from './Message';

var chatID;
class Chatting extends Component {
    constructor(props){
        super(props);
        this.state = { 
            InputTxt:"",
            image:null,
            msgs:[]
        } 
    }

    hrs = new Date().getHours();
    min = new Date().getMinutes();

    componentDidMount(){
        chatID = null;
        this.fetchMessages()
    }
    // urlToBlob(url) {
    //     return new Promise((resolve, reject) => {
    //         var xhr = new XMLHttpRequest();
    //         xhr.onerror = reject;
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState === 4) {
    //                 resolve(xhr.response);
    //             }
    //         };
    //         xhr.open('GET', url);
    //         xhr.responseType = 'blob'; // convert type
    //         xhr.send();
    //     })
    // }
    select_image = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsMultipleSelection:true,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
    });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ image: result},()=>{
                this.sendImage()
            })
        }
    };
    sendImage = async () => {
        // const imageFile = await this.urlToBlob(this.state.image.uri);
        // console.log(imageFile)
        // const img = {
        //     name: "image.jpg",
        //     type: "image/jpeg",
        //     uri: Platform.OS === "android" ? this.state.image.uri : this.state.image.uri.replace("file://", "")
        // }
        // firebase.storage.ref('asda/iamgename.jpg').put(imageFile)
        // const imageRef = storage().ref(`asdasd/${'imagename.jpg'}`)
        // await imageRef.putFile(this.state.image.uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
        // const url = await imageRef.getDownloadURL().catch((error) => { throw error });
        // console.log(url)
        // return url
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
       firebase.firestore.collection('chats')
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
       })
    }
    onSend = async () => {
        this.input.clear();
        const fromID = this.props.user.firebase_id;
        const toID = this.props.route.params.person.id

        // alert(toID)

        firebase.firestore.collection('chats').
        doc(chatID)
        .collection('messages')
        .add(
            {
                text: this.state.InputTxt,
                createdAt: new Date().getTime(),
                fromID: fromID,
                toID: toID,
            }
        ).then(()=>this.setState({InputTxt:''})).catch((err)=>console.log(err))

        await firebase.firestore.collection('chats')
        .doc(chatID)
        .set(
            {
                lastMessage: new Date().getTime(),
                lastMessageText: this.state.InputTxt,
                // fromID: fromID,
                // fromName: this.state.user.name,
                // toID: 'qJm6HqhfHmbKnsKhQFmqi9332BF2',
                // toName: 'asad',
            },
            {
                merge:true
            }
        ).then((res)=>console.log(res)).catch((err)=>console.log(err))
    }
    
    render() {
        return (
            <>
                <View style={styles.Chat_Head} >
                    <Message_Header 
                        name={this.props.route.params.person.name}
                        onpress={()=> this.props.navigation.goBack()}
                        image={this.props.route.params.person.image}
                    />
                </View>
                    <View style={styles.main} >
                        <View style={styles.First} >
                            <FlatList 
                                inverted
                                // style={{backgroundColor:'red'}}
                                data={this.state.msgs}
                                renderItem={({item})=>
                                    <Message 
                                        msg={item.data.text} 
                                        side={item.data.fromID == this.props.user.firebase_id ? 'right':'left'}
                                        // photo={item.data.fromID == this.props.user.firebase_id ? this.props.user.image: this.props.route.params.person.image}
                                    />
                                }

                            />
                        </View>
                    
                        <View style={styles.Outer_Area}>
                        
                            <TouchableOpacity style={styles.trigger} onPress={()=> this.props.navigation.navigate("Camera_Screen")}>
                                <Image source={require("../../Imagess/camera.png")} style={{width:'50%' , height:"50%"}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.trigger} onPress={this.select_image}>
                                <Entypo name="images" size={22} color="#C63520" />
                            </TouchableOpacity>

                            <TextInput  
                                ref={input=> this.input = input}
                                style={styles.Input_style}
                                value={this.state.InputTxt}
                                onChangeText={(text)=> this.setState({InputTxt: text})}
                                placeholder="Type to start chat"
                                placeholderTextColor="#FFFFFF"
                                clearTextOnFocus={true}
                                // autoFocus={true}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity style={styles.trigger} onPress={this.onSend} >
                                <Image source={require("../../Imagess/send.png")} style={{width:'50%' , height:"50%"}} />
                            </TouchableOpacity>
                        </View>
              
                    </View>
            
                
                    
         </>
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.Login_Reducer.user,
    }
}

export default connect(mapStateToProps,null)(Chatting)

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        // padding:'5%',
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
        height:47,
        backgroundColor:"#7676801F",
        alignItems:"center",
        flexDirection:'row',
        // justifyContent:"",
        alignSelf:"flex-end",
    },
    Input_style:{
        width:"70%",
        height:45   ,
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
        lineHeight:16
    },
    trigger:{
        backgroundColor:'#0C1326',
        width:35,
        height:35,
        borderRadius:8,
        justifyContent:'center',
        alignItems:"center",
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
   
})


