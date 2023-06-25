import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";



type ImageProps = {
    images: string[] | undefined
}
export const ImageComponent = ({images}:ImageProps) => {
    const [visible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // @ts-ignore
    const imageSources = images.map(image => ({ uri: image }));

    const handleImagePress = (index:number) => {
        setCurrentImageIndex(index);
        setIsVisible(true);
    }
    return (
        <View>
            {images?.map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: 300, marginTop: 10 }}
                    />
                </TouchableOpacity>
            ))}
            <ImageView
                images={imageSources}
                imageIndex={currentImageIndex}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    );
}
