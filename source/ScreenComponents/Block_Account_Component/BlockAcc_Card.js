import React from 'react';
import { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';


 function BlockAcc_Card({name , number , image , onpress}) {

    // const[Name , setName] = useState("John Aker");
    // const[Number , setNumber] = useState(+125354456);

     return (
         <View style={styles.main} >
            <View style={{flexDirection:"row" , alignItems:"center"}} >
                <Image source={{image}} style={{ width:55 , height:55 , borderRadius:100 }} />
                <View style={{ marginLeft:"5%" }} >
                    <Text style={[styles.Txt,{color:'#FFB81A' , fontSize:17 , lineHeight:18}]} >{name}</Text>
                    <Text style={styles.Txt} >{number}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onpress} > 
                <Text style={[styles.Txt,{color:'#5B6C9F' , fontFamily:"Italic" , fontSize:14 , lineHeight:15}]} >Unblock</Text>
            </TouchableOpacity>
         </View>
     );
 }

 const styles = StyleSheet.create({
    main:{
        width:"100%",
        padding:5,
        borderRadius:12,
        backgroundColor:"#0C1326",
        borderColor:"#273253",
        borderWidth:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:"5%"
    },
    Txt:{
        fontSize:14,
        lineHeight:20,
        fontFamily:"Regular",
        color:'#5B6C9F', 
        textAlign:"left"
    }  

 })
 
 export default BlockAcc_Card;