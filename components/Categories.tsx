import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCatChanged: (category: string) => void;
  }

const Categories = ({onCatChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<(typeof TouchableOpacity)[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x: any) => {
            scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
        });

        onCatChanged(newsCategoryList[index].slug);
    }
    return (
        <View>
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsWrapper}
            >
                {newsCategoryList?.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        ref={(el) => itemRef.current[index] === el}
                        style={[styles.item, activeIndex === index && styles.itemActive]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemText: {
        color: Colors.darkGrey,
        fontSize: 14,
        letterSpacing: 0.5,
    },
    itemTextActive: {
        fontWeight: '600',
        color: Colors.white,
    }
})

export default Categories