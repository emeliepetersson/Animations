import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<ScButton onPress={props.pressed}>
			<ScText>
				{props.text}
			</ScText>
		</ScButton>
	);
};

export default Button;

const ScButton = styled.TouchableOpacity`
    background-color: #e8e0da;
    padding: 15px 30px;
    border-radius: 5px;
`;

const ScText = styled.Text`
    color: #683e33;
    font-size: 20px;
`;
