import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { CardProps, CardStyleProps } from './Card.types';

const Card: React.FC<CardProps> = (props) => {
	const { position } = props;

	// Animated values
	const rotationZ = useSharedValue(0);
	const posX = useSharedValue(0);
	const rotationY = useSharedValue(0);

	/**
     * Animates posX and rotate when spread state changes
     */
	React.useEffect(() => {
		if(props.spread) {
			rotationZ.value = withTiming(10 * position);
			posX.value = withTiming(10 * position);
		} else {
			rotationZ.value = withTiming(0);
			posX.value = withTiming(0);
		}
	}, [rotationZ, position, props.spread, posX]);

	/**
     * Animates rotate when flipped state changes
     */
	React.useEffect(() => {
		if(props.flipped) {
			rotationY.value = withDelay(position * 200, withTiming(180));
			posX.value = withTiming(10 * position);
		} else {
			rotationY.value = withTiming(0);
			posX.value = withTiming(0);
		}
	}, [posX, props.flipped, position, rotationY]);

	/**
     * Returns an animated style
     */
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ 
					rotateZ: `${rotationZ.value}deg` 
				}, 
				{ 
					translateX:  posX.value 
				},
				{
					rotateY: `${rotationY.value}deg` 
				}
			],
			perspective: '1000px'
		};
	});

	return (
		<ScCard style={animatedStyle}>
			<ScCardInner>
				<ScCardFront flipped={props.flipped}>
					<ScFrontImage source={props.image} />
				</ScCardFront>
				<ScCardBack>
					<ScBackImage source={require('../../../assets/card-back.png')} />
				</ScCardBack>
			</ScCardInner>
		</ScCard>
	);
};

export default Card;

const ScCard = styled(Animated.View)`
    position: absolute;
    left: 30%;
	background-color: transparent;
  	width: 200px;
  	height: 300px;
`;

const ScCardInner = styled.View`
	position: relative;
  	width: 100%;
  	height: 100%;
  	text-align: center;
  	box-shadow: 0 3px 4px rgba(0,0,0,0.2);
`;

const ScCardFront = styled.View<CardStyleProps>`
 	position: absolute;
  	width: 100%;
  	height: 100%;
  	backface-visibility: hidden;
	z-index: ${props => props.flipped ? 10 : 0};
`;

const ScCardBack = styled.View`
	background-color: #2980b9;
  	color: white;
	position: absolute;
  	width: 100%;
  	height: 100%;
  	backface-visibility: hidden;
`;

const ScBackImage = styled.Image`
	width: 100%;
	height: 100%;
`;

const ScFrontImage = styled.Image`
	width: 100%;
	height: 100%;
`;