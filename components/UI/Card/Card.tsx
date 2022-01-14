import React from 'react';
import { Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = (props) => {
	const rotation = useSharedValue(0);
	const posX = useSharedValue(0);

	/**
     * Animates posX and rotate when shuffle state changes
     */
	React.useEffect(() => {
		if(props.shuffled) {
			rotation.value = withTiming(10 * props.position);
			posX.value = withTiming(10 * props.position);
		} else {
			rotation.value = withTiming(0);
			posX.value = withTiming(0);
		}
	}, [rotation, props.position, props.shuffled, posX]);

	/**
     * Returns an animated style
     */
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ 
					rotateZ: `${rotation.value}deg` 
				}, 
				{ 
					translateX:  posX.value 
				}]
		};
	});

	return (
		<ScCard style={animatedStyle}>
			<Image source={props.image} />
		</ScCard>
	);
};

export default Card;

const ScCard = styled(Animated.View)`
    position: absolute;
    left: 30%;
`;