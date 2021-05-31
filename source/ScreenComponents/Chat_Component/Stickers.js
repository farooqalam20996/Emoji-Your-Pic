import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';


const Stickers = (props) => {

    const navigate = () => {
        props.modalToggle()
        props.navigation.navigate('CreateEmoji');
    }
    return(
        // <View style={styles.stickerContainer}>
        //     {props.faceID 
        //         ?
        //         <>
        //             <View style={styles.searchBox}>
        //                 <TextInput
        //                     style={styles.inputStyle}
        //                     placeholder={"Search Stickers"}
        //                     showSoftInputOnFocus={false}
        //                 />
        //                 <Feather name="search" size={24} color="white" />
        //             </View>
        //             <FlatList
        //                 numColumns={3}
        //                 data={image}
        //                 keyExtractor={(item, index) => item.id}
        //                 renderItem={({item})=>(
        //                     <TouchableOpacity onPress={() => props.onPress(item.url)}>
        //                         <Image style={styles.imageStyle} source={{uri: item.url}}/>
        //                     </TouchableOpacity>
        //                 )}
        //                 ListFooterComponent={()=><ActivityIndicator style={{color:'white'}}/>}
        //                 onEndReached={props.load()}
        //                 onEndReachedThreshold={0.5}
        //             />
        //         </>
        //         :
        //         <TouchableOpacity onPress={()=>props.navigation.navigate('CreateEmoji')} style={styles.buttonStyle}>
        //             <Text style={styles.textStyle}>Create Your Emoji</Text>
        //         </TouchableOpacity>
        //     }
        // </View>


        <Modal 
            isVisible={props.visible}            
            onBackdropPress={props.modalToggle}
            testID={'modal'}
            onBackButtonPress={props.modalToggle}
            style={styles.stickerContainer}
            backdropTransitionOutTiming={0}
            avoidKeyboard
        >
            
            <View style={styles.scrollableModal}>
                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={"Search Stickers"}
                        placeholderTextColor="gray"
                        value={props.search}
                        onChangeText={props.onChange}
                    />
                    <Feather name="search" size={24} color="white" />
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    {props.faceID !== "null"
                        ?
                        <FlatList
                            numColumns={3}
                            data={props.stickers}
                            // data={image}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={() => props.onPress(item.url)}>
                                    <Image style={styles.imageStyle} source={{uri: item.url}}/>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={()=><ActivityIndicator style={{color:'white'}}/>}
                            onEndReached={props.load()}
                            onEndReachedThreshold={0.1}
                        />
                        :
                        <TouchableOpacity onPress={navigate} style={styles.buttonStyle}>
                            <Text style={styles.textStyle}>Create Your Emoji</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </Modal>

    )
}

export default Stickers;

const styles = StyleSheet.create({
    stickerContainer:{
        // height:250,
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: '50%',
        backgroundColor:"#0C1326",
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        paddingTop:'2%',
    },
    searchBox:{
        flexDirection:'row',
        alignItems:'center',
        padding:'1%',
        paddingRight:'2%',
        paddingLeft:'2%',
    },
    inputStyle:{
        backgroundColor:"#7676801F",
        flex:1,
        marginRight:'2%',
        padding:1,
        paddingLeft:10,
        color:'white',
        fontSize:17,
        borderRadius:10
    },
    imageStyle:{
        height:120,
        width:120
    },
    buttonStyle:{
        height:'12%',
        width:'45%',
        borderRadius:8,
        backgroundColor:'#FFB81A',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        color:'black',
        fontSize:16,
        fontFamily:"Regular"
    }
})