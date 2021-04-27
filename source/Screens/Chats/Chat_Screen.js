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
                <Top_Header Heading="Chat" />
                <View style={{ marginBottom:"2%", marginTop:"1%" }} >
                    <TextInput 
                        style={styles.Input_Style}
                        value={this.state.Search}
                        // autoCapitalize
                        onChangeText={(text) => this.setState({Search: text})}
                        placeholder="Search chat"
                        placeholderTextColor="#5B6C9F"
                    />
                </View>
                {
                    
                    false?
                    <Chat_Placeholder />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Chat_Card 
                            id={this.state.user.firebase_id}
                            image={this.state.user.image}
                            chats={this.state.chats}
                            navigation={this.props.navigation} 
                        />
                    </ScrollView>    
                }
                
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