import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function Chat_Placeholder() {
    return(
            <>
            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder backgroundColor={"#273253"} speed={1000} >
                    <SkeletonPlaceholder.Item height={60} marginBottom={15} >
                        <View style={styles.main}>
                            <View style={styles.img} />
                            <View >
                                <SkeletonPlaceholder.Item  width={100} height={10} marginBottom={7} />
                                <SkeletonPlaceholder.Item  width={270} height={10} marginBottom={7} />
                            </View>
                        </View>
                    </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </>
    )
}

const styles = StyleSheet.create({
    main:{
        width:"100%",
        height:60,
        padding:"2.5%",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        // backgroundColor:"#0C1326",
        borderRadius:12,
        // borderColor:"#273253",
        borderWidth:1,
        marginTop:"3%",
    },
    img:{
        width:35, 
        height:35, 
        borderRadius:100,
    }
})