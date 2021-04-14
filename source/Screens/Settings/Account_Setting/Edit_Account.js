import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import Setting_Header from "../Setting_Header";
 import Modal from "react-native-modal";
 import { Feather , AntDesign} from '@expo/vector-icons'; 
 
 
 export default class Edit_Accounts extends Component {
     
    constructor(props){
        super(props);
        this.state = {
            user_name:"",
            full_name:"",
            Email:"",
            phoneNumber:"",
            IsModalVisible:false
        }
    }

    toggleModal = () => {
        this.setState({ IsModalVisible: !this.state.IsModalVisible  })
    }
     render() {
        return (
            <View style={styles.main}>
                <Setting_Header Heading="Edit Account" onpress={()=> this.props.navigation.goBack()} />
                <View style={styles.container} >
                    <ScrollView style={{flex:1}} >

                <View style={styles.Image_Container} >
                        <View style={styles.Image_Circle} >
                            <Image source={require("../../../Imagess/Profile.png")}  style={{ width:"100%" , height:"100%" , borderRadius:100 }}  /> 
                            
                            <TouchableOpacity style={styles.add_btn} onPress={this.toggleModal} >
                                <Feather name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.Input_Container} >
                        <Text style={styles.Txt} >username</Text>
                        <TextInput 
                            style={styles.Input_Style}
                            value={this.state.user_name}
                            onChangeText={(text) => this.setState({user_name: text})}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput.focus()}
                        />
                        <Text style={styles.Txt} >fullname</Text>
                        <TextInput 
                            ref={ref => { this.NextInput = ref; }}
                            style={styles.Input_Style}
                            value={this.state.full_name}
                            onChangeText={(text) => this.setState({full_name: text})}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.NextInput1.focus()}
                        />
                        
                    </View>
                    <View style={styles.Btn_Container} >
                        <TouchableOpacity style={styles.Save_btn} onPress={() => alert("enter")}  >
                            <Text style={[styles.Txt,{color:"#000000"}]} > Save &amp; Proceed </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>   
                <Modal 
                        isVisible={this.state.IsModalVisible}        
                        animationIn="slideInUp"
                        animationInTiming={300}
                        animationOutTiming={2000}
                        animationOut="slideOutDown"
                        onBackdropPress={this.toggleModal}
                        onBackButtonPress={this.toggleModal}
                        style={{width:"100%"}}
                    >
                    <View style={styles.media_style}>
                        <View style={{ width:"15%" , height:5 , borderRadius:10 , backgroundColor:"#D8D8D8" , alignSelf:"center" , marginTop:'3%' }} />     
                        <View style={{ flexDirection:'row' , alignItems:"center" , justifyContent:"space-between" }} >
                            <TouchableOpacity style={styles.btn_media}  >
                                <Feather name="camera" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn_media}  >
                                <AntDesign name="picture" size={32} color="#FFB81A" />
                                <Text style={styles.media_Txt} >Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                </Modal>
                </View>
            </View>   
         );
     }
 }

 const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16",
        paddingBottom:"0%"
    }, 
    container:{
        flex:1,
    },
    Image_Container:{
        // flex:1,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
        // backgroundColor:'red'
     },
     Image_Circle:{
        width:120,
        height:120,
        borderRadius:100,
        backgroundColor:"#FFB81A",
        padding:"2%"
     },
     Input_Container:{
        //  flex:2,
        width:"100%"
        //  backgroundColor:"blue"
     },
     Input_Style:{
        // width:wp('80%'),
        // height:hp('6%'),
        width:"100%",
        height:45,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderRadius:12,
        borderWidth:1,  
        fontSize:16,
        lineHeight:17,
        fontFamily:"Regular",
        color:'#FFFFFF',
        paddingLeft:"2%"
     },
     Txt:{
        fontSize:14,
        lineHeight:16,
        fontFamily:"Regular",
        color:'#FFFFFF',
        textAlign:"left",
        marginBottom:"3%",
        marginTop:"4%"
     },
     Btn_Container:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginTop:"10%"
       //  backgroundColor:"green"
    },
     Save_btn:{
        width:"100%",
        height:55,
        borderRadius:12,
        backgroundColor:"#FFB81A",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     },
     add_btn:{
        position:"absolute",
        width:30,
        height:30,
        backgroundColor:"#273253",
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:"flex-end",
        bottom:"1%"
    },
     media_style:{
        top:'50%',
        width:'100%',
        backgroundColor:'#0C1326',
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        height:'40%',
        alignSelf:"center",
        marginLeft:"-10%",
        padding:'3%',
        paddingBottom:'25%'
    },
    btn_media:{ 
        width:'50%' , 
        height:'100%' , 
        alignItems:"center" , 
        justifyContent:'center' ,  
    },
    media_Txt:{
        fontFamily:'SemiBold',
        fontSize:14,
        color:'#FFB81A',
        letterSpacing:0,
        lineHeight:16
    }
 })