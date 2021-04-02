import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput
 } from 'react-native';
 import Top_Header from "../../ScreenComponents/Header_Component/Header";
 import {AntDesign} from '@expo/vector-icons'; 

 export default class Search_Screen extends Component {
        
    constructor(props){
        super(props);
        this.state={
            Search:""
        }
    }

     render() {
         return (
            <View style={styles.main} >
                <Top_Header Heading="Search" btn={<AntDesign name="back" size={24} color="#FFB81A" onPress={()=> this.props.navigation.goBack()} />} />        
                
                <View style={{ marginBottom:"10%", marginTop:"5%" }} >
                    <TextInput 
                        style={styles.Input_Style}
                        value={this.state.Search}
                        onChangeText={(text) => this.setState({ Search: text })}
                        placeholder="Search "
                        placeholderTextColor="#5B6C9F"
                    />
                </View>

                
            
            </View>

         );
     }
 }

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"#060A16",
        padding:'6%',
        paddingBottom:"0%"
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
 })