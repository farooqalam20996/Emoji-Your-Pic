import React, { Component } from 'react';
import { 
    View,
    Text,
    Image
 } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calls_Screen from "../Screens/Calls/Calls_Screen";
import Chat_Screen from "../Screens/Chats/Chat_Screen";
import Contacts_Screen from "../Screens/Contacts/Contacts_Screen";
import Settings_Screen from "../Screens/Settings/Settings_Screen";
import New_Message_Screens from "../Screens/New_Message/New_Message_Screens";
import { Foundation , MaterialIcons , AntDesign , Ionicons, Feather, FontAwesome5 , Fontisto} from '@expo/vector-icons'; 
import { createStackNavigator } from "@react-navigation/stack";
import Main_Chat_Screen from "../Screens/Main_Chat/Main_Chat_Screen";
import Camera_Screen from "../Screens/Camera/Camera_Screen";
import ChatSetting from "../Screens/Settings/Chat_Setting/ChatSetting";
import NotificationSetting from "../Screens/Settings/Notification_Setting/Notification_Setting";
import AccountSetting from '../Screens/Settings/Account_Setting/Account_Setting';
import PrivacySetting from "../Screens/Settings/Account_Setting/Privacy_Setting";
import Search_Screen from "../Screens/Chats/Search_Screen";
import Change_Password from "../Screens/Settings/Account_Setting/Change_Password";
import Edit_Account from "../Screens/Settings/Account_Setting/Edit_Account";


const Tab = createBottomTabNavigator();

function Tab_Navigator(){
     
         return (
             <Tab.Navigator initialRouteName="Chat_Screen" 
                backBehavior
                tabBarOptions={{
                    labelPosition:"below-icon",
                    labelStyle:{marginBottom:5 , marginTop:18, fontFamily:'SemiBold' },
                    activeTintColor:"#FFB81A",
                    keyboardHidesTabBar:true, 
                    style:{
                        width:'100%',
                        height:55,
                        // borderTopRightRadius:8,
                        // borderTopLeftRadius:8,  
                        backgroundColor:'#0C1326',
                        // shadowColor:'#273253',
                        // shadowOffset:{width:0 , height: -3},
                        // shadowRadius:23,
                        // elevation:23,
                        borderTopColor:"#0C1326"
                    }
                }}     
             >
                 <Tab.Screen name="Chat" component={ChatScreen} 
                    options={{
                        tabBarIcon:({focused}) => (
                            focused ?
                            <Ionicons name="chatbubble-ellipses-sharp" size={22} color="#FFB81A" style={{ marginBottom:'-20%' }} />
                            :
                            <Ionicons name="chatbubble-ellipses-sharp" size={22} color="#273253" style={{ marginBottom:'-20%' }} />                                
                        )   
                    }} 
                 />
                 {/* <Tab.Screen name="Calls" component={Calls_Screen} 
                     options={{
                        tabBarIcon:({focused}) => (
                              
                                focused ?
                                <Feather name="phone-call" size={19} color="#FFB81A" style={{ marginBottom:'-20%' }} />
                                :
                                <Feather name="phone-call" size={19} color="#273253" style={{ marginBottom:'-20%' }} />                                
                            )   
                    }} 
                 /> */}
                 <Tab.Screen name="New" component={New_Message_Screens}  
                         options={{
                            tabBarLabel : ()=>null,
                            tabBarIcon:({focused}) => (
                                <View
                                    style={{ 
                                            marginBottom:25,
                                            width:62, 
                                            height:62, 
                                            borderRadius:100,
                                            alignItems:'center' , 
                                            backgroundColor:'#FFB81A',
                                            justifyContent:'center',
                                            // shadowColor:'#2E8BFF80',
                                            // shadowOffset:{width:0 , height: 3},
                                            // shadowRadius:15,
                                            // elevation:15
                                        }} >
                                        <Image source={require('../Imagess/msg.png')} style={{ width:17 , height:17 }} />
                                </View>
                            )
                         }}
                 />
{/* 
                 <Tab.Screen name="Contacts" component={Contacts_Screen} 
                     options={{
                        tabBarIcon:({focused}) => (
                              
                                focused ?
                                <FontAwesome5 name="users" size={18} color="#FFB81A" style={{ marginBottom:'-20%' }} />
                                :
                                <FontAwesome5 name="users" size={18} color="#273253" style={{ marginBottom:'-20%' }} />
                                
                            )   
                    }} 
                 /> */}
                 <Tab.Screen name="Settings" component={Setting_Work} 
                     options={{
                        tabBarIcon:({focused}) => (
                              
                                focused ?
                                <Fontisto name="player-settings" size={22} color="#FFB81A" style={{ marginBottom:'-20%' }} />
                                :
                                <Fontisto name="player-settings" size={22} color="#273253" style={{ marginBottom:'-20%' }} />
                            )   
                    }} 
                 />
             </Tab.Navigator>
         );
     }


function Setting_Work(params) {
    return(
        <Stack.Navigator initialRouteName screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Settings" component={Settings_Screen} />
            {/* <Stack.Screen name="ChatSetting" component={ChatSetting} />
            <Stack.Screen name="AccountSetting" component={AccountSetting} />
            <Stack.Screen name="NotificationSetting" component={NotificationSetting} /> */}
        </Stack.Navigator>
    )
}

function ChatScreen(params) {
    return(
        <Stack.Navigator initialRouteName="Chat" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Chat" component={Chat_Screen}  />
            <Stack.Screen name="Search" component={Search_Screen} />
        </Stack.Navigator>
    )
}


 const Stack = createStackNavigator();
 function App_Routes(params) {
     return(
         <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Tab_Navigator" >
            <Stack.Screen name="Tab_Navigator" component={Tab_Navigator} />
            <Stack.Screen name="Main_Chat_Screen" component={Main_Chat_Screen} />
            <Stack.Screen name="Camera_Screen" component={Camera_Screen} />
            <Stack.Screen name="ChatSetting" component={ChatSetting} />
            <Stack.Screen name="AccountSetting" component={AccountSetting} />
            <Stack.Screen name="NotificationSetting" component={NotificationSetting} />
            <Stack.Screen name="PrivacySetting" component={PrivacySetting} />
            <Stack.Screen name="Change_Password" component={Change_Password} />
            <Stack.Screen name="Edit_Account" component={Edit_Account} />
         </Stack.Navigator>
     )
 }

 export default App_Routes;
