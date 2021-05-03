import React from 'react';
import {
    Modal,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


const ImageModal = (props) => {
    return(
        <Modal 
            visible={props.visible}
            onRequestClose={props.close}
        >
            <View style ={{flex:1,backgroundColor:"#060A16",justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.Back_Btn} onPress={props.close} >
                        <Ionicons name="md-arrow-back" size={18} color="black" />
                    </TouchableOpacity>
                    <Text style={{color:"white"}}>Send to {props.name}</Text>
                </View>
                <Image 
                    source={{uri:props.image}}
                    style={[styles.image]}
                />
                <View style={styles.Outer_Area}>
                    <TextInput
                        style={styles.Input_style}
                        value={props.input}
                        onChangeText={props.inputChange}
                        placeholder="Enter Message Here"
                        placeholderTextColor="#FFFFFF"
                        clearTextOnFocus={true}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        multiline
                    />
                    <TouchableOpacity style={styles.trigger} onPress={()=>props.send(props.image)} >
                        <Image source={require("../../Imagess/send.png")} style={{width:'50%' , height:"50%"}} />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}
export default ImageModal;

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:"70%",
    },
    Outer_Area:{
        width:"100%",
        height:47,
        backgroundColor:"#7676801F",
        alignItems:"center",
        flexDirection:'row',
        // justifyContent:"",
        alignSelf:"flex-end",
    },
    Input_style:{
        width:"90%",
        height:45   ,
        backgroundColor:"#0C1326",
        borderRadius:12,
        borderColor:"#273253",
        borderWidth:1,
        alignItems:"center",
        paddingLeft:"3%",
        fontFamily:'Regular',
        fontSize:14,
        color:'#FFFFFF',
        letterSpacing:0,
        lineHeight:16
    },
    trigger:{
        backgroundColor:'#0C1326',
        width:35,
        height:35,
        borderRadius:8,
        justifyContent:'center',
        alignItems:"center",
    },
    Back_Btn:{
        marginRight:"3%",
        width:20,
        height:20,
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:"#FFB81A",
        borderRadius:7,
        marginRight:"5%",
    }
})