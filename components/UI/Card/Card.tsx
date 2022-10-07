import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { CardProps, CardStyleProps } from './Card.types';

const Card: React.FC<CardProps> = (props) => {
	const { position } = props;

	// Animated values
	const rotationZ = useSharedValue(0);
	const posX = useSharedValue(0);
	const rotationY = useSharedValue(0);

	const timerRef = React.useRef<NodeJS.Timeout>();

	// State used to change the z-index of the front-card when card is halfway through the flip
	const [halfFlipped, setHalfFlipped] = React.useState<boolean>(false);
	
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
		if(timerRef.current) clearTimeout(timerRef.current);

		// The delay is based on the cards position to make som space between the cards while flipping
		const delay = position * 250;
		const duration = 500;

		if(props.flipped) {
			// Shows the front of the cards
			rotationY.value = withDelay(delay, withTiming(180, { duration }));
			posX.value = withDelay(delay, withTiming(250, { duration }));
			
			timerRef.current = setTimeout(() => {
				setHalfFlipped(true);
			}, delay + (duration / 2));

		} else {
			// Shows the back of the cards
			rotationY.value = withDelay(delay, withTiming(0, { duration }));
			posX.value = withDelay(delay, withTiming(0, { duration }));
			
			timerRef.current = setTimeout(() => {
				setHalfFlipped(false);
			}, delay + (duration / 2));
		}
	}, [posX, props.flipped, position, rotationY]);

	/**
     * Returns an animated style for the card
     */
	const animatedCardStyle = useAnimatedStyle(() => {
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

	const gestureHandler = useAnimatedGestureHandler({
		// TODO: Move card around on drag
		// Pan gesture: https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pan-gesture
	});

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<ScCard style={animatedCardStyle}>
				<ScCardInner>
					<ScCardFront flipped={halfFlipped}>
						<ScFrontImage source={props.image} />
					</ScCardFront>
					<ScCardBack>
						<ScBackImage source={require('../../../assets/card-back.png')} />
					</ScCardBack>
				</ScCardInner>
			</ScCard>
		</PanGestureHandler>
	);
};

export default Card;

const ScCard = styled(Animated.View)`
    position: absolute;
    left: 5%;
	background-color: transparent;
  	width: 200px;
  	height: 300px;
	border-radius: 10px;
	overflow: hidden;
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