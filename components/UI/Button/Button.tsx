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
    background-color: #1f5052;
    padding: 15px 30px;
    border-radius: 5px;
`;

const ScText = styled.Text`
    color: #ffffff;
    font-size: 20px;
`;
