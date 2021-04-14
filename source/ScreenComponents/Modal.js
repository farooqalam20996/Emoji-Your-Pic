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
        top:'50%',
        width:'100%',
        backgroundColor:'#0C1326',
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        height:'auto',
        alignSelf:"center",
        padding:'3%',
     }
 })