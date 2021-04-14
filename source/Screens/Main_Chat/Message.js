import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
} from 'react-native';

const Message = ({hrs,min,msg, side,photo}) => {
    // const hrs = new Date().getHours();
    // const min = new Date().getMinutes();

    const isLeftSide = side === 'left';
    const long = msg.length > 25;
    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container;
    const textContainerStyles = isLeftSide ?  [styles.textContainer,long && {flex:1} ] : [flattenedStyles.textContainer, long && {flex:1}];
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;

    return(
        // <View style={styles.Reciever} >
        //     <Image source={require('../../Imagess/Profile_Image.png')} style={{ width:35, height:35 , borderRadius:8 }} />
        //     <View style={{ width:'100%',height:'auto',}} >
        //         <View style={styles.Msg_Container_Reciever} >
        //             <Text style={styles.Txt_Message_Reciever} >
        //                 lorem
        //             </Text>
        //         </View>
        //         <View style={{alignSelf:"flex-end"}} >
        //             <Text style={{fontFamily:"Regular"}} > {hrs}:{min} </Text>
        //         </View>
        //     </View>
            
        //     <AntDesign name="down" size={14} color="white" style={{ marginTop:'1.5%', position:"absolute", marginLeft:'85%'}} >
        //         {/* {menu_item} */}
        //     </AntDesign>
        // </View>
        <View style={containerStyles}>
            {isLeftSide && <Image source={{uri:photo}} style={{ width:35, height:35 , borderRadius:8 }} />}
            <View style={textContainerStyles}>
                <Text style={textStyles}>
                    {msg}
                </Text>
            </View>
            {!isLeftSide && <Image source={{uri:photo}} style={{ width:35, height:35 , borderRadius:8 }} />}
        </View>
        
    )
}

export default Message;



const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 3,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textContainer: {
        backgroundColor: '#C63520',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginLeft: 10
    },
    rightContainer: {
        justifyContent: 'flex-end'
    },
    rightTextContainer: {
        backgroundColor: '#FFB81A',
        marginRight: 10
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
        color:'black'
    },
    text: {
        fontSize: 12
    }
    
});

const flattenedStyles = {
    container: StyleSheet.flatten([styles.container, styles.rightContainer]),
    textContainer: StyleSheet.flatten([styles.textContainer, styles.rightTextContainer]),
    leftText: StyleSheet.flatten([styles.leftText, styles.text]),
    rightText: StyleSheet.flatten([styles.rightText, styles.text])
}