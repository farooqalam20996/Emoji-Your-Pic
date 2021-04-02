import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
 } from 'react-native';
import Top_Header from "../../ScreenComponents/Header_Component/Header";
import { AntDesign } from "@expo/vector-icons";
import Contact_Card from "../../ScreenComponents/Contact_Component/Contact_Card";
import * as Contacts from "expo-contacts";
// import { AlphabetList } from "react-native-section-alphabet-list";

export default class Contact_Screen extends Component {

    state={
        contact_list:[],
        image: null
    }

    componentDidMount(){
      this.contacts_Permission()
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
                this.setState({ image: [...this.state.image, {image:item.image }] })
            })
    }

     render() {
         const contacts = this.state.contact_list.map(item => (
           <View key={item.id} >
                <Contact_Card Name={item.name}  Number={item.number} img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} />
           </View>
         ))
         return (
            <View style={styles.main}>
                <Top_Header Heading="Contacts" btn={<AntDesign name="search1" size={24} color="#FFB81A" />} />
                <ScrollView showsVerticalScrollIndicator={false} >
                   
                    <Contact_Card Name="Kiera" Number="+1 3463249871" img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} />
                    <Contact_Card Name="rosen"  Number="+1 3072011925" img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} />
                    <Contact_Card Name="rosen"  Number="+1 3072011925" img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} />
                  {
                      contacts
                  }
                </ScrollView>
                 {/* <AlphabetList
                    data={contacts}
                    indexLetterColor={'#FFB81A'}
                    renderCustomItem={(item)=>(
                        <Contact_Card Name={item.name}  Number={item.number} />
                    )}
                /> */}
            </View>

         );
     }
 }

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"-2%"
     }
 })