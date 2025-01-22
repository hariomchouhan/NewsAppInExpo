import { FlatList, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import SliderItem from './SliderItem'
import { NewsDataType } from '@/types'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import Pagination from './Pagination'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState<NewsDataType[]>(newsList);
    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const offset = useSharedValue(0);
    const width = useWindowDimensions();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        },
    })

    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width.width;
            }, 3000);
        } else {
            clearInterval(interval.current as NodeJS.Timeout);
        }
        return () => {
            clearInterval(interval.current as NodeJS.Timeout);
        };
    }, [isAutoPlay, offset, width]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    })
    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (Array.isArray(viewableItems) && viewableItems.length > 0) {
            const firstItem = viewableItems[0];
            if (firstItem && firstItem.index !== undefined && firstItem.index !== null) {
                setPaginationIndex(firstItem.index % newsList.length);
            }
        } else {
            console.warn('viewableItems is empty or not properly formatted:', viewableItems);
        }
    };
    
    
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };
    
    const viewablityConfigCallbackPairs = useRef([
        {
            viewabilityConfig,
            onViewableItemsChanged,
        },
    ]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BreakingNews</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setData([...data, ...newsList])}
                    viewabilityConfigCallbackPairs={
                        viewablityConfigCallbackPairs.current
                    }

                    // It disables the scroll when the user starts to scroll
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}
                    
                />
                <Pagination item={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: 'center',
    },
})

export default BreakingNews