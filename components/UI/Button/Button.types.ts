import { GestureResponderEvent } from 'react-native';

export interface ButtonProps {
	text: string;
	pressed: (event: GestureResponderEvent) => void
}