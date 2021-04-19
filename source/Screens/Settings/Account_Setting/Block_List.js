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
var axios = require('axios');

var that;
class Block_List extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            Failed:false,
            Loader:false,
            msg:"",
            // Name:"",
            // Number:"",
            image_uri:null,
            Lsit:[]
        }
    }

    componentDidMount(){
        that = this;
        this.BlockAccount_List();

    }

    // Account_Unblock=()=>{
    //     var axios = require('axios');
    //     var FormData = require('form-data');
    //     var data = new FormData();
    //     data.append('user_id', '131');

    //     var config = {
    //     method: 'post',
    //     url: 'salvador_app/public/api/unblock-user',
    //     headers: { 
    //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcm9qZWN0cy5wYXJhZ29ubG9nby5jb21cL3NhbHZhZG9yX2FwcFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjE4NjA4MjI0LCJleHAiOjE2MTg2MTE4MjQsIm5iZiI6MTYxODYwODIyNCwianRpIjoiOGpRSW54bWNMMXRUckR2USIsInN1YiI6MTM0LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.79A--kW2tXt5vdvUi1x_kt8LL3HjyWG0lAsu61NLkkM', 
    //         ...data.getHeaders()
    //     },
    //     data : data
    //     };

    //     axios(config)
    //     .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //     console.log(error);
    //     });

    
    // }

    BlockAccount_List=()=>{
        that.setState({Loader: true})
        var config = {
        method: 'get',
        url:API+'salvador_app/public/api/blocked-user-list',
        headers: { 
            'Authorization': that.props._token
        }
        };

        axios(config)
        .then(function (response) {
            if(response.data.success){
                console.log(JSON.stringify(response.data));
                that.setState({ 
                            Loader: false, 
                            // Name:response.data.data[0].email, 
                            // Number:response.data.data.phone_number, 
                            List:response.data.data,
                        })
            }
            else{
                console.log(JSON.stringify(response.data));
                that.setState({Loader: false , Failed:true , msg:response.data.message})
            }
        })
        .catch(function (error) {
            console.log(error);
            that.setState({msg:"sdas" , Failed:true})
        });
    }

     render() {
         return (
            <View style={styles.main} >
                <Setting_Header Heading="Blocked Account List" onpress={()=> this.props.navigation.goBack()} />
                {/* <ScrollView showsVerticalScrollIndicator={false} > */}
                    {
                       this.state.Loader ?
                       <View style={{ flex:1, justifyContent:"center" , alignItems:"center" }}>
                            <ActivityIndicator size="large" color="white" />
                       </View>
                       :
                       (
                            this.state.Failed ?
                            <View style={{ flex:1, justifyContent:"center" , alignItems:"center" }} >
                                <Text style={styles.Txt} > {this.state.msg} </Text>
                            </View>
                            :
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                data={this.state.List}
                                keyExtractor={(item,index)=> index.toString()}
                                renderItem={({item}) =>
                                        <Block_Card name={item.full_name} number={item.phone_number} onpress={()=>alert("polo")} image={require("../../../Imagess/chat_profile.png")} />
                                    }
                            />
                       )
                    }
                   
                    
                {/* </ScrollView> */}
               
            </View>        
         );
     }
 }

function mapStateToProps(state) {
    return{
        _token:state.Login_Reducer.token,
    }
}

 export default connect(mapStateToProps , null)(Block_List);

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