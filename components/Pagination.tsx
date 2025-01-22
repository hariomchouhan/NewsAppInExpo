import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

type Props = {
    item: NewsDataType[],
    paginationIndex: number,
    scrollX: SharedValue<number>,
}

const Pagination = ({item, paginationIndex, scrollX}: Props) => {
    return (
        <View style={styles.container}>
            {item?.map((_, index) => {
                return (
                    <Animated.View style={[styles.dot, {backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey}]} key={index}></Animated.View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    dot: {
        backgroundColor: '#333',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    }
})

export default Pagination