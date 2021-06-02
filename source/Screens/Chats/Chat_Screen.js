import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Modal,
    TouchableOpacity,
    AppState
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import Chat_Card from "../../ScreenComponents/Chat_Component/Chat_Card";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../firebase';
import Chat_Placeholder from "../../ScreenComponents/PlaceHolders/Chat_Placeholder";
import { Feather } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { titleName } from '../../utils';

class Chats_Screen extends Component {
    state={
        user:'',
        chats:[],
        loading: true,
        Search:"",
        isVisible:false,
        image:[],
        name:'',
    }

    chatsHolder = [];

    componentDidMount(){
        AsyncStorage.getItem('user',(err,data)=>{
            this.setState({user:JSON.parse(data)})
            this.loadChats(this.state.user.firebase_id)
            this.getOnline(this.state.user.firebase_id)
        })
        AppState.addEventListener("change", this._handleAppStateChange);

    }
    _handleAppStateChange = nextAppState => {
        // console.log(nextAppState)
        if(nextAppState == "background"){
            firebase.firestore
            .collection('users')
            .doc(this.state.user.firebase_id)
            .set({
                online:false
            },{merge:true})
        }else if(nextAppState == "active"){
            this.getOnline(this.state.user.firebase_id)
        }
    };
    getOnline = (id) => {
        firebase.firestore
        .collection('users')
        .doc(id)
        .set({
            online:true
        },{merge:true})
    }
    showImage = (image,name) => {
        const url = [{url:image}]
        // alert(image)
        this.setState({name,image:url,isVisible:true})
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
        
        const chats = this.chatsHolder.filter(chat => {
            console.log(chat)
            var name = chat.data.toName
            if(chat.data.toID == this.state.user.firebase_id){
                name = chat.data.fromName;
            }
            return this.contains(name.split(" "), text)
        })
        this.setState({ chats, Search:text})
    }
    loadChats(id){
        firebase.firestore
        .collection('chats')
        .where('fromID','==',id)
        .where('deletedBy','array-contains',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            if(querySnapshot.docs.length == 0){
                this.setState({loading:false})
            }
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}],loading:false},()=>{
                    this.chatsHolder = this.state.chats;
                })
            })
        })
        firebase.firestore
        .collection('chats')
        .where('toID','==',id)
        .where('deletedBy','array-contains',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            if(querySnapshot.docs.length == 0){
                this.setState({loading:false})
            }
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}],loading:false},()=>{
                    this.chatsHolder = this.state.chats;
                })
            })
        })
        this.setState({loading: false});
    }
    onDeletePress = (id,del) => {
        var otherID;
        if(del.length > 1){
            if(del[0] == this.state.user.firebase_id){
                otherID = del[1];
            }else{
                otherID = del[0];
            }
        }else{
            otherID = "";
        }
        
        firebase.firestore
        .collection('chats')
        .doc(id)
        .set(
            {
                deletedBy: [otherID]
            },
            {
                merge:true
            }
        ).then(()=>{
            this.setState({chats: this.state.chats.filter(chat=>chat.id!==id)})
            console.log('chat deleted')
        })
    }
    setUnreadChat = (id,readBy) => {
        const newArr = readBy.filter(item => item!==this.state.user.firebase_id)
        firebase.firestore
        .collection('chats')
        .doc(id)
        .set({
            readBy:newArr
        },{
            merge:true,
        }).then(()=>{
            console.log(this.state.chats)
        });
    }
    setReadChat = (id,readBy) => {
        if(!readBy.includes(this.state.user.firebase_id)){
            firebase.firestore
                .collection('chats')
                .doc(id)
                .set({
                    readBy:[...readBy,this.state.user.firebase_id]
                },{
                    merge:true,
                }).then(()=>{
                    console.log(this.state.chats)
            });
        }
        
    }
    render() {
        return (
            <View style={styles.main}>
                <Modal 
                    onRequestClose={()=>this.setState({isVisible:false})}
                    visible={this.state.isVisible}
                    transparent
                >
                    <ImageViewer 
                        enablePreload
                        enableImageZoom
                        onLongPress={()=>this.setState({isVisible:false})}
                        renderHeader={()=>
                            <View style={{marginBottom:"5%", position: "absolute",top:0, width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',zIndex: 9999}}>
                                <Text style={{color:'white',fontFamily:"Regular",fontSize:18,paddingLeft:10}}>{titleName(this.state.name)}</Text>
                                <TouchableOpacity  onPress={()=>this.setState({isVisible:false})}>
                                    <Feather name="x" size={25} style={{margin:20}} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                        onSwipeDown={()=>this.setState({isVisible:false})}
                        enableSwipeDown
                        imageUrls={this.state.image}
                        renderIndicator={()=>null}
                    />
                </Modal>

                <Top_Header Heading="Chat" />
                <View style={{ marginBottom:"2%", marginTop:"1%" }} >
                    <TextInput 
                        style={styles.Input_Style}
                        value={this.state.Search}
                        // autoCapitalize
                        onChangeText={(text) => this.search(text)}
                        placeholder="Search Chat"
                        placeholderTextColor="#5B6C9F"
                    />
                </View>
                {
                    
                    this.state.loading
                        ?
                        <Chat_Placeholder />
                        :
                        this.state.chats.length > 0
                            &&
                            <Chat_Card 
                                id={this.state.user.firebase_id}
                                image={this.state.user.image}
                                chats={this.state.chats}
                                navigation={this.props.navigation}
                                onDeletePress={this.onDeletePress}
                                onUnreadPress={this.setUnreadChat}
                                onReadPress={this.setReadChat}
                                onImagePress={this.showImage}
                            />
                }
                
            </View>

        );
    }
}
const mapStateToProps = state => {
    return{
    }
} 
const mapDispatchToProps = dispatch => {
    return{
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chats_Screen);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%"
    },
    Input_Style:{
        width:"100%",
        height:35,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:8,
        borderWidth:1,  
        fontSize:13,
        lineHeight:14,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%"
     },
})

// :
// <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
//     <Text style={{fontSize:20, color:'gray'}}> No Chats </Text>
// </View>