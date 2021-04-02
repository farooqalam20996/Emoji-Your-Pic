import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';  
// import LottieView from "lottie-react-native";

export default class SignUp_Success extends Component {

    render() {
        const { navigation } = this.props;  
        // const User_ID = navigation.getParam('userID','26')

        // const userid = navigation.getParam('userID')
        const userid = this.props.route.params.userID
        
        return ( 
            <View style={styles.main}>
                <View style={styles.first} >
                    <Image source={require('../../Imagess/done.png')} style={{ width:100 , height:100 }} />
                </View>
                <View style={styles.second}>
                    <TouchableOpacity style={styles.Next_btn} onPress={() => this.props.navigation.navigate("SignUp_Profile" ,{id:JSON.stringify(userid)}) }  >
                    {/* <TouchableOpacity style={styles.Next_btn} onPress={() => this.props.navigation.navigate("SignUp_Profile")}  > */}
                        <Text style={styles.Txt} > Next </Text>
                    </TouchableOpacity>
                    <Text style={{ color:"yellow" }} > USer ID: {JSON.stringify(userid)} </Text>
                </View>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        padding:'6%',
        backgroundColor:"#060A16"
    },
    first:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'green'
    },
    second:{
        flex:0.3,
        alignItems:"center",
        justifyContent:'center',
        // backgroundColor:"red"
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
    Next_btn:{
        width:"100%",
        height:45,
        borderRadius:12,
        backgroundColor:"#C63520",
        alignItems:'center',
        justifyContent:"center",
        marginTop:"5%"
     }
})