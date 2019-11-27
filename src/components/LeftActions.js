import React from 'react';
import {
	View,
	Animated,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

const LeftActions = ({ progress, dragX, onPress }) => {
	const scale = dragX.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 1],
		extrapolate: 'clamp'
	});

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.leftAction}>
				<Animated.Text
					style={[styles.actionText,
					{
						transform: [{ scale }]
					}]}>
					Rebuy
				</Animated.Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	leftAction: {
		backgroundColor: '#4caf50',
		alignItems: 'flex-start',
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

export default LeftActions;