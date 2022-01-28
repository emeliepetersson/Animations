import React from 'react';
import styled from 'styled-components/native';
import { CARDS } from './BoardScreen.types';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';

const BoardScreen: React.FC = (_props) => {
	const [spread, setSpread] = React.useState<boolean>(false);
	const [flipped, setFlipped] = React.useState<boolean>(false);

	/**
     * Renders cards in the CARDS array
     * 
     * @returns {JSX.Element[]} 
     */
	const renderCards = React.useCallback((): JSX.Element[] => {
		return CARDS.map((card, index) => {
			return (
				<Card
					key={card.id}
					image={card.image}
					spread={spread}
					position={index}
					flipped={flipped}
				/>
			);
		});
	}, [flipped, spread]);

	return (
		<ScBoard>
			<ScCardsWrapper>
				{renderCards()}
			</ScCardsWrapper>
			<ScButtonsWrapper>
				<Button
					text={spread ? 'Gather' : 'Spread'}
					pressed={() => setSpread(state => !state)}
				/>
				<Button
					text="Flip"
					pressed={() => setFlipped(state => !state)}
				/>
			</ScButtonsWrapper>
		</ScBoard>
	);

};

export default BoardScreen;

const ScBoard = styled.View`
    flex: 1;
    background-color: #387763;
    justify-content: center;
    align-items: center;
`;

const ScCardsWrapper = styled.View`
    position: relative;
    width: 500px;
    height: 300px;
`;

const ScButtonsWrapper = styled.View`
	background-color: #683e33;
	width: 100%;
	flex-direction: row;
	justify-content: space-evenly;
	position: absolute;
	bottom: 0;
	padding: 15px;
	box-shadow: 0px -5px 5px rgba(0,0,0,0.2);
`;