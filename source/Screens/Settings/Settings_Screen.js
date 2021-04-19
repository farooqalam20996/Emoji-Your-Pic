import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity
 } from 'react-native';
import AuthContext from '../../Routes_Navigation/Context';
 import Top_Header from "../../ScreenComponents/Header_Component/Header";
 import Setting_Card from "../../ScreenComponents/Setting_Component/Setting_Card";
 import { connect  } from "react-redux";
 import ImageViewer from "react-native-image-zoom-viewer";
import { Feather } from '@expo/vector-icons';

class Settings_Screen extends Component {

    constructor(props){
        super(props);
        this.state={
            isVisible:false
        }
    }

    LogOut = async() =>{
        await AsyncStorage.removeItem('user'),
        await AsyncStorage.removeItem('token'),
        this.context.updateState()
    }

     render() {
         return (
            <View style={styles.main}>
                <Top_Header Heading="Settings" />
                <View style={styles.container} >
                    <TouchableOpacity style={styles.Image_Container} onPress={() => this.setState({isVisible: true})} >
                        <Image source={{uri: this.props.user_name.image}} style={{width:55 , height:55, borderRadius:100}} />
                    </TouchableOpacity>
                    <Text style={styles.Profile_Name} adjustsFontSizeToFit={true} > 
                            {this.props.user_name.full_name}
                    </Text>
                </View>
                <View style={{ width:"100%" ,height:2 , backgroundColor:"#273253", marginBottom:"8%" }} />
                <ScrollView>
                    {/* <Setting_Card Txt="Chats" Press={() => this.props.navigation.navigate("ChatSetting")} /> */}
                    <Setting_Card Txt="Account Settings" Press={()=> this.props.navigation.navigate("AccountSetting")} />
                    <Setting_Card Txt="Notifications" Press={() => alert("Press")} />
                    {/* <Setting_Card Txt="Storage &amp; Data" Press={() => alert("Press")} /> */}
                    <Setting_Card Txt="Help" Press={() => this.props.navigation.navigate("Help_Page")} />
                    {/* <Setting_Card Txt="Tell a Friend" Press={() => alert("Press")} /> */}
                    <Setting_Card Txt="Log out" Press={() => this.LogOut()} />
                </ScrollView>

               <Modal
                    onRequestClose={()=>this.setState({isVisible:false})}
                    visible={this.state.isVisible}
                    transparent
               >
                    <ImageViewer 
                        imageUrls={[{url: this.props.user_name.image}]}
                        onLongPress={()=>this.setState({isVisible:false})}
                        renderHeader={()=>
                            <TouchableOpacity style={{top: 0, position: "absolute", zIndex: 9999,alignSelf:'flex-end'}} onPress={()=>this.setState({isVisible:false})}>
                                <Feather name="x" size={25} style={{margin:20}} color="white"/>
                            </TouchableOpacity>
                        }
                        enablePreload
                        enableImageZoom
                        onSwipeDown={()=>this.setState({isVisible:false})}
                        enableSwipeDown
                    />
               </Modal>
            </View>

         );
     }
 }

 Settings_Screen.contextType = AuthContext;

function mapStateToProps(state) {
    return{
        user_name:state.Login_Reducer.user,
        token:state.Login_Reducer.token,
    }
}

 export default connect(mapStateToProps, null)(Settings_Screen);
 const styles = StyleSheet.create({
     main:{
         flex:1,
         padding:'6%',
         backgroundColor:"#060A16"
     },
     container:{
         width:"100%",
         height:85,
         flexDirection:"row",
         alignItems:"center",
         justifyContent:"flex-start",
         padding:"5%",
         backgroundColor:"#0C1326",
         borderColor:"#273253",
         borderWidth:1,
         borderRadius:12,
         marginBottom:"10%",
     },
     Image_Container:{
         width:60,
         height:60,
         borderRadius:100,
         backgroundColor:"#FFB81A",
         alignItems:"center",
         justifyContent:"center",
         marginRight:"5%"
     },
     Profile_Name:{
        fontSize:24,
        lineHeight:25,
        fontFamily:"SemiBold",
        color:'#FFB81A', 
        textAlign:"left"
     }
 })