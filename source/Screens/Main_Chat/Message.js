import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { manageDate } from '../../utils';

const Message = ({data, side}) => {
    const isLeftSide = side === 'left';
    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container;
    const textContainerStyles = isLeftSide ?  [styles.textContainer, data.image && {marginRight:170}] : [flattenedStyles.textContainer, data.image && {marginLeft:170}];
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;
    
    const getDate = () => {
        const today = manageDate(new Date().getTime());
        const date = manageDate(data.createdAt)
        if(today.split(",")[0] == date.split(",")[0]){
            return date.split(",")[1]
        }
        return date.split(",")[0]
    }

    return(
        <View style={containerStyles}>
            <View style={[textContainerStyles, data.image && {paddingHorizontal:7.25,paddingVertical:7.25}]}>
                {data.image
                    ?
                    <>
                        <Image style={styles.imageStyle} source={{uri: data.image}}/>
                        {data.text ? <Text style={[textStyles,{marginTop:5}]}>{data.text}</Text> : null }
                    </>
                    :
                    <>
                        <Text style={textStyles}>{data.text}</Text>
                    </>
                }
                <Text style={[styles.dateStyle,isLeftSide ? {color:'black'} : { color:'#AC7908'}]}>{getDate()}</Text>
            </View>
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
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginLeft: 10
    },
    rightContainer: {
        justifyContent: 'flex-end',
    },
    rightTextContainer: {
        backgroundColor: '#FFB81A',
        marginRight: 10
    },
    leftText: {
        textAlign: 'left',
        color:'white'
    },
    rightText: {
        // textAlign: 'right',
        color:'black'
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