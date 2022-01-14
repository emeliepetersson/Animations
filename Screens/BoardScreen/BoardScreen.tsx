import React from 'react';
import styled from 'styled-components/native';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';

const CARDS = [
	{ 
		id: 'card1', image: require('../../assets/card.png')
	},
	{ 
		id: 'card2', image: require('../../assets/card.png')
	},
	{ 
		id: 'card3', image: require('../../assets/card.png')
	},
	{ 
		id: 'card4', image: require('../../assets/card.png')
	}
];

const BoardScreen: React.FC = (_props) => {
	const [shuffled, setShuffled] = React.useState<boolean>(false);

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
					shuffled={shuffled}
					position={index}
				/>
			);
		});
	}, [shuffled]);

	/**
     * Shuffles the cards
     * 
     * @returns {void}
     */
	const shuffleCardsHandler = React.useCallback(() => {
		setShuffled(state => !state);
	}, []);

	return (
		<ScBoard>
			<ScCardsWrapper>
				{renderCards()}
			</ScCardsWrapper>
			<Button
				text={shuffled ? 'Hide' : 'Show'}
				pressed={shuffleCardsHandler}
			/>
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