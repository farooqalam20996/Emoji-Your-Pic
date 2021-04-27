import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator
 } from 'react-native';
import Setting_Header from "../Setting_Header";
import Block_Card from "../../../ScreenComponents/Block_Account_Component/BlockAcc_Card";
import { API } from '../../../Routes_Navigation/MainURL';
import { connect } from "react-redux";
import { getBlockedUsersList } from '../../../Redux/Actions/BlockAction';
import firebase from '../../../firebase';
var axios = require('axios');
var FormData = require('form-data');


var that;
class Block_List extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            Loader:true,
            toggle:false,
            blockedUsersFailed:false,
            List:[],
        }
    }

    componentDidMount(){
        that = this;
        this.BlockAccount_List();

    }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.blockedUsers !== this.props.blockedUsers){
    //         this.setState({List:this.props.blockedUsers})
    //     }
    //     // alert(this.props.blockedUsersLoading)
    // }
    unblockUser = (id) => () => {
        // this.setState({Loader:true})
        // const prevState = this.state.List;
        const list = this.state.List.filter(list=>list.docID!==id);
        this.setState({List:list});

        firebase.firestore
        .collection('chats')
        .doc(id)
        .set({
            isBlocked:false,
            blockedBy:''
        },{
            merge:true
        }).then(()=>{
            // const list = this.state.List.filter(list=>list.docID!==id);
            // this.setState({List:list});
            console.log("Unblocked")
        })
        .catch((err)=>{
            this.setState({blockedUsersFailed:true, Loader:false})
            console.log(err)
        })
    }
    BlockAccount_List = () => {
        const {firebase_id} = this.props.user;
        firebase.firestore
        .collection('chats')
        .where('blockedBy','==',firebase_id)
        .orderBy('lastMessage',"desc")
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.map((documentSnapshot)=>{
                // const users = this.state.List.filter(list=>list.docID!==documentSnapshot.id);
                const users = this.state.List
                var id;
                if(documentSnapshot.data().toID == this.props.user.firebase_id){
                    id=documentSnapshot.data().fromID
                }else{
                    id = documentSnapshot.data().toID;
                }
                // alert(id)
                firebase.firestore
                .collection('users')
                .doc(id)
                .get()
                .then((user)=>{
                    var data = user.data();
                    this.setState({List:[...users,{docID:documentSnapshot.id,id:data.uid,name:data.name,phone:data.phone,image:data.image}],Loader:false})
                }).catch((err)=>{this.setState({blockedUsersFailed:true,Loader:false})})
                // return this.setState({List:[...users,{id:documentSnapshot.id,data:documentSnapshot.data()}]})

            })
            this.setState({Loader:false})
        })
    }

     render() {
         return (
            <View style={styles.main} >
                <Setting_Header Heading="Blocked Account List" onpress={()=> this.props.navigation.goBack()} />
                    {
                        this.state.Loader
                        ?
                            <View style={{ flex:1, justifyContent:"center" , alignItems:"center" }}>
                                    <ActivityIndicator size="large" color="white" />
                            </View>
                        :
                            this.state.blockedUsersFailed 
                            ?
                                <View style={{ flex:1, justifyContent:"center" , alignItems:"center" }} >
                                    <Text style={styles.Txt} > Some Problem Occurred </Text>
                                </View>
                            :
                                this.state.List.length > 0
                                ?
                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.List}
                                        keyExtractor={(item,index)=> index.toString()}
                                        renderItem={({item}) => 
                                            <Block_Card 
                                                name={item.name}
                                                number={item.phone}
                                                image={item.image}
                                                onPress={this.unblockUser(item.docID)}
                                            />
                                        }
                                    />
                                :
                                <View style={{ flex:1, justifyContent:"center" , alignItems:"center" }}>
                                    <Text style={styles.Txt} > Empty Block List </Text>
                                </View>
                    }
            </View>        
         );
     }
 }

function mapStateToProps(state) {
    return{
        _token:state.Login_Reducer.token,
        user:state.Login_Reducer.user,
        // blockedUsers: state.BlockReducer.blockedUsers,
        // blockedUsersFailed: state.BlockReducer.blockedUsersFailed,
        // blockedUsersLoading: state.BlockReducer.blockedUsersLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        // loadList: (token) => dispatch(getBlockedUsersList(token)),
    }
}
 export default connect(mapStateToProps , mapDispatchToProps)(Block_List);

 const styles = StyleSheet.create({
     main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
     },
     Txt:{
        fontSize:16,
        lineHeight:18,
        fontFamily:"Bold",
        color:'#FFB81A', 
     }
 })