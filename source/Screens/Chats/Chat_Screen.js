import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import { AntDesign } from "@expo/vector-icons";
import Chat_Card from "../../ScreenComponents/Chat_Component/Chat_Card";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../firebase';
import Chat_Placeholder from "../../ScreenComponents/PlaceHolders/Chat_Placeholder";
import { getBlockedByUsersList, getBlockedUsersList } from '../../Redux/Actions/BlockAction';

class Chats_Screen extends Component {
    state={
        user:[],
        chats:[],
        loading: true,
        // blockedUsers:[],
        // blockedByUsers:[]
    }
    // componentWillUnmount() {
    //     this._unsubscribe();
    // }
    componentDidMount(){
        // AsyncStorage.getItem('chats',(err,data)=>{
        //     this.setState({chats:JSON.parse(data)})
        //     console.log(data)
        // })
        AsyncStorage.getItem('user',(err,data)=>{
            this.setState({user:JSON.parse(data)})
            this.loadChats(this.state.user.firebase_id)
        })
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {

        //     AsyncStorage.getItem('token',(err,data)=>{
        //         // this.setState({user:JSON.parse(data)})
        //         const token = JSON.parse(data)
        //         this.props.getBlockedUsersList('Bearer '+token)
        //         this.props.getBlockedByUsersList('Bearer '+token)
        //     })
        // })
    }
    // componentDidUpdate(prevProps,prevState){
    //     if(this.props.blockedUsers !== prevProps.blockedUsers){
    //         // console.log(JSON.stringify(this.props.blockedUsers))
    //         // const list = this.state.blockList;
    //         // list.push(this.props.blockedByUsers)
    //         this.setState({blockedUsers:this.props.blockedUsers})
    //     }
    //     if(this.props.blockedByUsers !== prevProps.blockedByUsers){
    //         // console.log(JSON.stringify(this.props.blockedByUsers))
    //         this.setState({blockedByUsers:this.props.blockedByUsers})
    //     }
    // }
    loadChats(id){
        firebase.firestore
        .collection('chats')
        .where('fromID','==',id)
        .where('deletedBy','array-contains',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}]})
                // AsyncStorage.setItem('chats',JSON.stringify(this.state.chats),(err)=> err?true:false)
            })
        })
        firebase.firestore
        .collection('chats')
        .where('toID','==',id)
        .where('deletedBy','array-contains',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}]})
                // AsyncStorage.setItem('chats',JSON.stringify(this.state.chats),(err)=> err?true:false)
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
    setUnreadChat = (id) => {
        firebase.firestore
        .collection('chats')
        .doc(id)
        .set({
            read: false,
        },{
            merge:true,
        });
    }
    render() {
        return (
            <View style={styles.main}>
                <Top_Header Heading="Chat" />
                <View style={{ marginBottom:"2%", marginTop:"1%" }} >
                    <TextInput 
                        style={styles.Input_Style}
                        value={this.state.Search}
                        // autoCapitalize
                        onChangeText={(text) => this.setState({Search: text})}
                        placeholder="Search chat"
                        placeholderTextColor="#5B6C9F"
                        onSubmitEditing={()=>alert(JSON.stringify(this.state.blockedByUsers))}
                    />
                </View>
                {
                    
                    this.state.loading?
                    <Chat_Placeholder />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Chat_Card 
                            id={this.state.user.firebase_id}
                            image={this.state.user.image}
                            chats={this.state.chats}
                            navigation={this.props.navigation}
                            onDeletePress={this.onDeletePress}
                            onUnreadPress={this.setUnreadChat}
                            // blockedUsers = {this.state.blockedUsers}
                            // blockedByUsers = {this.state.blockedByUsers}
                        />
                    </ScrollView>    
                }
                
            </View>

        );
    }
}
const mapStateToProps = state => {
    return{

        // blockedUsers: state.BlockReducer.blockedUsers,
        // blockedUsersFailed: state.BlockReducer.blockedUsersFailed,
        // blockedUsersLoading: state.BlockReducer.blockedUsersLoading,
        // blockedByUsers: state.BlockReducer.blockedByUsers,
        // blockedByUsersFailed: state.BlockReducer.blockedByUsersFailed,
        // blockedByUsersLoading: state.BlockReducer.blockedByUsersLoading,
    }
} 
const mapDispatchToProps = dispatch => {
    return{
        // getBlockedUsersList: (token) => dispatch(getBlockedUsersList(token)),
        // getBlockedByUsersList: (token) => dispatch(getBlockedByUsersList(token))
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