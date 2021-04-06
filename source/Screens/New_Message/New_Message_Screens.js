import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView
 } from 'react-native';
import Contact_Card from '../../ScreenComponents/Contact_Component/Contact_Card';
 import Top_Header from "../../ScreenComponents/Header_Component/Header";
import * as Contacts from "expo-contacts";

 import Message_Cards from "../../ScreenComponents/NewMessage_Component/Message_Card";
import Contacts_Screen from "../Contacts/Contacts_Screen";
import firebase from '../../firebase';

 export default class Message_Screen extends Component {
     
      state={
        contact_list:[],
        image: null,
        Search:"",
        contacts:[],
    }

    componentDidMount(){
        this.contacts_Permission()
        firebase.firestore.doc().get().then((res)=>console.log(res.data()))
    }

    contacts_Permission = async ()=> {
            const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    this.getContacts()
            }
        }

    getContacts = async ()=>{
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
            data.map(item => {
                console.log(item)
                this.setState({ contact_list: [...this.state.contact_list, {name: item.name, number: item.phoneNumbers[0].number, id:item.id}] })
                // this.setState({ image: [...this.state.image, {image:item.image }] })
            })
        }
     render() {
            const contacts = this.state.contact_list.map(item => (
                <View key={item.id} >
                    <Contact_Card 
                            Name={item.name}  
                            Number={item.number} 
                            img={require("../../Imagess/chat_profile.png")}
                            // img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} 
                            onpress={()=> this.props.navigation.navigate("Main_Chat_Screen")} 
                        />
                </View>
            ))
         return (
                <View style={styles.main}>
                    <Top_Header Heading="New Message" btn={<Text sty={styles.Txt} >Cancel</Text>} />
                    <View style={{ marginBottom:"10%", marginTop:"5%" }} >
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.state.Search}
                            onChangeText={(text) => this.setState({ Search: text })}
                            placeholder="Search to start a chat with"
                            placeholderTextColor="#5B6C9F"
                        />
                    </View>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Text style={styles.Heading_Txt} >
                                Contacts
                            </Text>
                            <View>
                            <Contact_Card img={require("../../Imagess/chat_profile.png")} Name="lol" Number="0346231547" onpress={()=> this.props.navigation.navigate("Main_Chat_Screen")} />

                            {
                                contacts
                            }
                                {/* <Message_Cards Press={()=> this.props.navigation.navigate('Main_Chat_Screen')} /> */}
                                {/* <Message_Cards /> */}
                            </View>
                        </ScrollView>
                </View>

         );
     }
 }

 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:"6%",
         backgroundColor:"#060A16",
         paddingBottom:"-2%"
     },
     Txt:{
        fontSize:14,
        lineHeight:15,
        fontFamily:"Light",
        color:'#C63520', 
        textAlign:"right"
     },
     Input_Style:{
        width:"100%",
        height:45,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:12,
        borderWidth:1,  
        fontSize:13,
        lineHeight:14,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%"
     },
     Heading_Txt:{
        fontSize:18,
        lineHeight:21,
        fontFamily:"Medium",
        color:'#FFB81A', 
        textAlign:"left", 
        marginBottom:"8%",
     }
 })