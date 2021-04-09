import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import { AntDesign } from "@expo/vector-icons";
import Chat_Card from "../../ScreenComponents/Chat_Component/Chat_Card";
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../firebase';

class Chats_Screen extends Component {
    state={
        user:[],
        chats:[]
    }
    componentDidMount(){
        AsyncStorage.getItem('user',(err,data)=>{
            this.setState({user:JSON.parse(data)})
            // alert(this.state.user.id)
            this.loadChats(this.state.user.firebase_id)
        })
    }
    loadChats(id){
        firebase.firestore
        .collection('chats')
        .where('fromID','==',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                return this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}]})
            })
        })
        firebase.firestore
        .collection('chats')
        .where('toID','==',id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.map((documentSnapshot)=>{
                const chats = this.state.chats.filter(chat=>chat.id!==documentSnapshot.id)
                return this.setState({chats:[...chats,{id:documentSnapshot.id,data:documentSnapshot.data()}]})

            })
        })
    }
    render() {
        return (
            <View style={styles.main}>
                <Top_Header Heading="Chat" btn={<AntDesign name="search1" size={24} color="#FFB81A" onPress={()=> this.props.navigation.navigate("Search")} />} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Chat_Card 
                        id={this.state.user.firebase_id}
                        image={this.state.user.image}
                        chats={this.state.chats}
                        navigation={this.props.navigation} />
                </ScrollView>
            </View>

        );
    }
}
const mapStateToProps = state => {
    return{
        user: state.Login_Reducer.user,
    }
} 

export default connect(mapStateToProps,null)(Chats_Screen);

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%"
    }
})