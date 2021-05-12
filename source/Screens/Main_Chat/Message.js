import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';
import { ImageViewer } from "react-native-image-zoom-viewer";
import { manageDate } from '../../utils';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Message = ({data, side}) => {
    const isLeftSide = side === 'left';
    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container;
    const textContainerStyles = isLeftSide ?  [styles.textContainer, data.image && {marginRight:"55%"}] : [flattenedStyles.textContainer, data.image && {marginLeft:"55%"}];
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;
    
    const getDate = () => {
        const today = manageDate(new Date().getTime());
        const date = manageDate(data.createdAt)
        if(today.split(",")[0] == date.split(",")[0]){
            return date.split(",")[1]
        }
        return date.split(",")[0]
    }

    const [Visible , SetVisible] = useState(false);

    const ToggleModal=()=>{
        SetVisible(!Visible);
    }

    return(
        <>
            <View style={containerStyles}>
                <View style={[textContainerStyles, data.image && {paddingHorizontal:7.25,paddingVertical:7.25}]}>
                    {data.image
                        ?
                        <>
                            <TouchableOpacity onPress={()=> SetVisible(true)} >
                                <Image style={styles.imageStyle} source={{uri: data.image}} />
                            </TouchableOpacity>
                            {data.text ? <Text style={[textStyles,{marginTop:5}]}>{data.text}</Text> : null }
                        </>
                        :
                        <>
                            <Text style={textStyles}>{data.text}</Text>
                        </>
                    }
                   
                    <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={[styles.dateStyle,isLeftSide ? {color:'black'} : { color:'#AC7908'}]}>{getDate()}</Text>
                        {!isLeftSide &&
                            (data.seen 
                                ?                                
                                <Ionicons style={{marginLeft:3}} name="md-checkmark-done-sharp" size={14} color="black" />
                                :
                                <Ionicons style={{marginLeft:3}} name="md-checkmark-sharp" size={14} color="black" />
                            )
                        }
                    </View>
                </View>
            </View>
            <Modal 
                visible={Visible} 
                onDismiss={()=> SetVisible(false)} 
                onBackButtonPress={()=>SetVisible(false)}
                transparent 
            >
                <ImageViewer
                    imageUrls={[{url: data.image}]}
                    // onLongPress={()=>SetVisible(true)}
                    renderHeader={()=>
                        <View style={{flexDirection:"row",top:0,width:"100%", position:"absolute", alignItems:"center",zIndex:1 , justifyContent:"space-between"}} >
                            <Text style={{color:"white" , fontSize:18 , fontFamily:"Medium", marginLeft:"3%"}} ></Text>
                            <TouchableOpacity onPress={()=>SetVisible(false)}  >
                                <Feather name="x" size={25} style={{margin:20}} color="white"/>
                            </TouchableOpacity>
                        </View>
                    }
                    enablePreload
                    enableImageZoom
                    onSwipeDown={()=>SetVisible(false)}
                    enableSwipeDown
                    renderIndicator={()=> null}
                />
            </Modal>
        </>
    )
}

export default Message;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textContainer: {
        backgroundColor: '#C63520',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginLeft: 10,
        maxWidth:"80%"
    },
    rightContainer: {
        justifyContent: 'flex-end',
    },
    rightTextContainer: {
        backgroundColor: '#FFB81A',
        marginRight: 10,
    },
    leftText: {
        textAlign: 'left',
        color:'white',
        
    },
    rightText: {
        // textAlign: 'right',
        color:'black',
    },
    imageStyle:{
        height:150,
        width:145,
        borderRadius:10
    },
    text: {
        fontSize: 15
    },
    dateStyle:{
        color:'gray',
        fontSize:9,
        textAlign:'right',
        marginTop:5,
    }
    
});

const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer]),
    textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.rightText, styles.text])
}