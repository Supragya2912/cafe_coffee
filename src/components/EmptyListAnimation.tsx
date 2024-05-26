import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';

interface EmptyListAnimationProps {
    title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({
    title
}) => {
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView
                source={require('../lottie/coffeecup.json')}
                style={styles.lottieStyles}
                autoPlay
                loop
            />
            <Text style={
                styles.lottieText
            }>{title}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    lottieStyles: {
        height: 200,
    },
    lottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 20,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
    }
})
export default EmptyListAnimation