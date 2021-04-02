import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    // Modal
 } from 'react-native';
import Modal from "react-native-modal";

 export default class ModalComponent extends Component {

     render() {
         return (
            <Modal
                // visible={this.props.visible}
                // animationType="slide"
                // onTouchCancel={this.props.Back}
                // onDismiss={this.props.drop} 
                isVisible={this.props.visible}        
                animationIn="slideInUp"
                animationInTiming={300}
                animationOutTiming={2000}
                animationOut="slideOutDown"
                onBackdropPress={this.props.drop}
                onBackButtonPress={this.props.Back}
                style={styles.main}
                       
            >
               <View style={{flex:1}} >
                   {this.props.item}
               </View>
            </Modal>
         );
     }
 }

 const styles = StyleSheet.create({
     main:{
        // width:"100%",
        // borderTopRightRadius:12,
        // borderTopLeftRadius:12,
        // backgroundColor:"#0C1326" ,
        // borderTopColor:"#273253",
        // borderTopWidth:2,
        // marginLeft:"-10%"

        top:'50%',
        width:'100%',
        backgroundColor:'#0C1326',
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        height:'auto',
        alignSelf:"center",
        padding:'3%',
        // paddingBottom:'25%'
     }
 })