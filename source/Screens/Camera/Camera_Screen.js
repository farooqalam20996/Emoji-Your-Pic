import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Animated
 } from 'react-native';
// import Animated from "react-native-reanimated";
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { Camera } from "expo-camera";


export default class Camera_Screen extends Component {
     state = {
        hasPermission:null,
        type:Camera.Constants.Type.back,
        _flashmode:Camera.Constants.FlashMode.off,
        index: 0,
        routes: [
            { key: 'first', title: 'Normal' },
            { key: 'second', title: 'Avatar' },
            { key: 'third', title: 'Filter' },
        ],
      };

      componentDidMount(){  
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            this.setState({hasPermission: status === 'granted'});
          })();
      };

      Flip_Camera = () => {
        this.setState({ type: 
            this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
         });
      }

    //   Flash_Mode=()=>{
    //     this.setState({ _flashmode: 
    //         this.state._flashmode === Camera.Constants.FlashMode.off
    //         ? Camera.Constants.FlashMode.on
    //         : Camera.Constants.FlashMode.off
    //      });
    //   }

        // _handleIndexChange = (index) => this.setState({ index });

        // _renderTabBar = (props) => {
        //     const inputRange = props.navigationState.routes.map((x, i) => i);

        //     return (
        //     <View style={styles.tabBar}>
        //         {props.navigationState.routes.map((route, i) => {
        //         const opacity = props.position.interpolate({
        //             inputRange,
        //             outputRange: inputRange.map((inputIndex) =>
        //             inputIndex === i ? 1 : 0.5
        //             ),
        //         });

        //         return (
        //             <TouchableOpacity
        //                 style={styles.tabItem}
        //                 onPress={() => this.setState({ index: i })}>
        //                 <Animated.Text style={{ 
        //                                     opacity,
        //                                     fontFamily:"Regular", 
        //                                     fontSize:14,
        //                                     lineHeight:16,
        //                                     color:"white",
        //                                     shadowColor:"#000000A6",
        //                                     textAlign:"center",
        //                                     elevation:10
        //                                 }}>{route.title}</Animated.Text>
        //             </TouchableOpacity>
        //         );
        //         })}
        //     </View>
        //     );
        // };

        // _renderScene = SceneMap({
        //     first: FirstRoute,
        //     second: SecondRoute,
        //     third: ThirdRoute,
        // });
     
     render() {
            if (this.state.hasPermission === null) {
                return <View />;
            }
            if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
            }

           
         return (
             <View style={styles.main} >
                <View style={styles.Camera_Container} >
                    <Camera 
                        style={styles.camera} 
                        type={this.state.type} 
                        // flashMode={this.state._flashmode} 
                    />
                </View>
                 
                <View style={styles.Options_Container} >
                {/* <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    key={(i) => this.setState({ routes: [i] })}
                /> */}
                    <View style={styles.Options} >
                        <TouchableOpacity>
                            <Text style={[styles.Tab_Txt,{color:"#273253"}]} > Normal </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.Tab_Txt}>Avatar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.Tab_Txt,{color:"#273253"}]} > Filter </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.container, { backgroundColor: '#0C1326' }]}>
                        <TouchableOpacity style={styles.btn} onPress={()=> alert("work in progress")} />  
                        <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"space-around" }} >
                            <TouchableOpacity style={{ width:35 , height:35 , alignItems:"center", justifyContent:"center" , backgroundColor:"gray", borderRadius:100 }} >
                                <FontAwesome5 name="video" size={18} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> this.Flip_Camera()} style={{ width:35 , height:35 , alignItems:"center", justifyContent:"center" , backgroundColor:"gray", borderRadius:100 }}>
                                <Ionicons name="ios-camera-reverse" size={22} color="white"  />
                            </TouchableOpacity>
                        </View>
                    </View>
                 </View>
             </View>
         );
     }
 }

 const FirstRoute = () => (
    <View style={[styles.container, { backgroundColor: '#0C1326' }]}>
        <TouchableOpacity style={styles.btn} />  
        <View style={{ flexDirection:"row", alignItems:"center", justifyContent:"space-around" }} >
            <TouchableOpacity style={{ width:35 , height:35 , alignItems:"center", justifyContent:"center" , backgroundColor:"gray", borderRadius:100 }} >
                <FontAwesome5 name="video" size={18} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{ width:35 , height:35 , alignItems:"center", justifyContent:"center" , backgroundColor:"gray", borderRadius:100 }}>
                <Ionicons name="ios-camera-reverse" size={22} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  );
  const SecondRoute = () => (
   <FirstRoute />
  );
  const ThirdRoute = () => (
   <FirstRoute />
  );

 const styles = StyleSheet.create({
     main:{
        flex:1,
        backgroundColor:"transparent"
     },
     Camera_Container:{
        //  flex:2,
        //  backgroundColor:"red"
        flex: 2,
        flexDirection: 'column',
        marginBottom:"-5%",
        // top:"10%"
     },
     Options_Container:{
        flex:0.75,
        backgroundColor:"black",
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
     },
     Options:{
        width:"100%",
        height:35,
        backgroundColor:"#0C1326",
        borderBottomColor:"#273253",
        borderBottomWidth:1,
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-evenly"
     }, 
     preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      container: {
        flex: 1,
      },
      tabBar: {
        flexDirection: 'row',
        paddingTop:"0%",
        backgroundColor:"#0C1326",
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        borderBottomColor:"#273253",
        borderBottomWidth:1,
      },
      tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
      },
      btn:{
          width:80,
          height:80,
          borderRadius:100,
          borderColor:"#FFB81A",
          borderWidth:4,
          backgroundColor:"#060A16",
          opacity:1,
          alignSelf:"center",
          marginTop:"5%"
      },
      Tab_Txt:{
        opacity:1,
        fontFamily:"Regular", 
        fontSize:14,
        lineHeight:16,
        color:"white",
        shadowColor:"#000000A6",
        textAlign:"center",
        elevation:10
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
 })