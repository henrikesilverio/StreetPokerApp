import React from 'react';
import {
    View,
    Animated,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.rightAction}>
                <Animated.Text
                    style={[styles.actionText,
                    {
                        transform: [{ scale }]
                    }]}>
                    Eliminar
          </Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rightAction: {
        backgroundColor: '#f44336',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 3.5
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
        fontSize: 20
    }
});

export default RightActions;