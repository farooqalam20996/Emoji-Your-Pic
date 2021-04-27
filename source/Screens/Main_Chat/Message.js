import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

const Message = ({data, side}) => {
    const isLeftSide = side === 'left';
    const long = data.text.length > 25;
    const containerStyles = isLeftSide ? styles.container : flattenedStyles.container;
    const textContainerStyles = isLeftSide ?  [styles.textContainer,long && {flex:1} ] : [flattenedStyles.textContainer, long && {flex:1}];
    const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText;
    
    return(
        <View style={containerStyles}>
            <View style={textContainerStyles}>
                {data.image
                    ?
                    <>
                        <Image style={styles.imageStyle} source={{uri: data.image}}/>
                        {data.text ? <Text style={textStyles}>{data.text}</Text> : null }
                    </>
                    :
                    <Text style={textStyles}>{data.text}</Text>
                }
                
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
    imageStyle:{
        height:100,
        width:100,
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