import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    FlatList
 } from 'react-native';
import Contact_Card from '../../ScreenComponents/Contact_Component/Contact_Card';
 import Top_Header from "../../ScreenComponents/Header_Component/Header";
import * as Contacts from "expo-contacts";
import Communications from 'react-native-communications';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { getBlockedByUsersList, getBlockedUsersList } from '../../Redux/Actions/BlockAction';

var contacts;
var contactObjects;
 class Message_Screen extends Component {
     
    state={
        image: null,
        Search:"",
        contacts:[],
        otherContacts:[],
    }
    
    contactsHolder = [];
    otherContactsHolder = [];

    componentDidMount(){
        contacts=[];
        contactObjects=[];
        this.contacts_Permission()
    }
    getOtherContacts = () => {
        contactObjects.map((contact)=>{
        if(!this.state.contacts.some(e=>e.data.phone==contact.phone)){
            this.setState({otherContacts:[...this.state.otherContacts,contact]})
            this.otherContactsHolder.push(contact)
        }
       })
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
        console.log(data)
        data.map(item => {
            if(item.phoneNumbers){
                contacts.push(item.phoneNumbers[0].number);
                contactObjects.push({id:item.id,name:item.name,phone:item.phoneNumbers[0].number});
            }
        })
        await firebase.firestore
        .collection('users')
        .where('phone','in',contacts)
        .get().then((res)=>{
            res.forEach((contact)=>{
                this.setState({contacts:[...this.state.contacts,{id:contact.id,data:contact.data()}]});
                this.contactsHolder.push({id:contact.id,data:contact.data()})
            })
        }).catch((err)=>{
            console.log(err)
        })
        this.getOtherContacts()
    }
    contains = (name, phone , query) => {
        const squery = String(query).toLocaleLowerCase()
        const check = name.length > 1 ? String(name[1]).toLocaleLowerCase().includes(squery) : false
        
        if (String(name[0]).toLocaleLowerCase().includes(squery) || check || phone.includes(squery)) {
          return true
        }
        return false
    }
    search = (text) => {
        const contacts = this.contactsHolder.filter(contact => {
            return this.contains(contact.data.name.split(" "),contact.data.phone, text)
        })
        const otherContacts = this.otherContactsHolder.filter(contact => {
            return this.contains(contact.name.split(" "),contact.phone, text)
        })
        
        this.setState({ contacts, otherContacts, Search:text})
    }
   
    goToChat = (user) => async () => {
        this.props.navigation.navigate("Main_Chat_Screen",{
            person:{
                id: user.id,
                name:user.data.name,
                image:user.data.image, 
            },
        })
    }
    sendInvite = (item) => () => {
        Communications.text(item.phone,"You are invited to join Emoji Chat App");
    }
     render() {
         return (
                <View style={styles.main}>
                    <Top_Header Heading="New Message" btn={<Text sty={styles.Txt} >Cancel</Text>} />
                    <View style={{  marginBottom:"2%", marginTop:"1%" }} >
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.state.Search}
                            autoCapitalize="none"
                            onChangeText={(text) => this.search(text)}
                            placeholder="Search to start a chat with"
                            placeholderTextColor="#5B6C9F"
                        />
                    </View>

                    {/* {
                        !this.state.loaded ?
                        <Contact_Placeholder />
                        : */}
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {this.state.contacts.length > 0 &&
                            <>
                                <Text style={styles.Heading_Txt} >
                                    Contacts
                                </Text>
                                <View>
                                <FlatList
                                    data={this.state.contacts}
                                    renderItem={({item})=>{
                                        // console.log(item)
                                        if(item.data.uid !== this.props.user.firebase_id){
                                            return(
                                                <Contact_Card 
                                                    Name={item.data.name}  
                                                    Number={item.data.phone} 
                                                    img={{uri:item.data.image}}
                                                    // img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} 
                                                    onpress={this.goToChat(item)} 
                                                />
                                            )
                                        }
                                    }}
                                />
                                
                                    {/* <Message_Cards Press={()=> this.props.navigation.navigate('Main_Chat_Screen')} /> */}
                                    {/* <Message_Cards /> */}
                                </View>
                            </>
                            }
                            {this.state.otherContacts.length > 0 &&
                            <>
                                <Text style={styles.Heading_Txt} >
                                    Other Contacts
                                </Text>
                                <View>
                                <FlatList
                                    data={this.state.otherContacts}
                                    renderItem={({item})=>(
                                        <Contact_Card 
                                            invite
                                            onInvitePress={this.sendInvite(item)}
                                            Name={item.name}  
                                            Number={item.phone} 
                                            img={require("../../Imagess/user.png")}
                                            // img={this.state.image == null ? require("../../Imagess/chat_profile.png") : {uri: item.image }} 
                                            onpress={()=> this.props.navigation.navigate("Main_Chat_Screen")} 
                                        />
                                    )}
                                />
                                
                                    {/* <Message_Cards Press={()=> this.props.navigation.navigate('Main_Chat_Screen')} /> */}
                                    {/* <Message_Cards /> */}
                                </View>
                            </>
                            }
                        </ScrollView>
              
                        {/* } */}
              </View>

         );
     }
 }

const mapStateToProps = state => {
    return{
        user: state.Login_Reducer.user,

        
    }
}
const mapDispatchToProps = dispatch => {
    return{
        getBlockedUsersList: (token) => dispatch(getBlockedUsersList(token)),
        getBlockedByUsersList: (token) => dispatch(getBlockedByUsersList(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Message_Screen)

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
     Heading_Txt:{
        fontSize:18,
        lineHeight:21,
        fontFamily:"Medium",
        color:'#FFB81A', 
        textAlign:"left", 
        marginBottom:"4%",
        marginTop:"4%",
     }
 })