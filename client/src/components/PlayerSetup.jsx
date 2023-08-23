import React, { useState } from "react";
import "./playerSetup.style.css";

const PlayerSetup = ({ setIsPlay, setPlayerX, setPlayerO }) => {
	const [isError, setIsError] = useState(false);

	const [playerXName, setPlayerXName] = useState("");
	const [playerOName, setPlayerOName] = useState("");

	/**
	 * DOCUMENT: This functions is used handle the inputting of the name <br>
	 * Triggered: when typing on the inputs <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf PlayerSetup
	 * @param event - event
	 * @param player - state function
	 * @author Mel
	 */
	const handleChange = (event, player) => {
		const name = event.target.value;
		player(name);
	};

	/**
	 * DOCUMENT: This functions is used handle the setting the names <br>
	 * Triggered: when typing on the inputs <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf PlayerSetup
	 * @param event - event
	 * @author Mel
	 */
	const handleSubmit = (event) => {
		event.preventDefault();

		if (playerXName && playerOName) {
			setIsPlay(true);
			setPlayerX(playerXName);
			setPlayerO(playerOName);
			setIsError(false);
		} else {
			setIsError(true);
		}
	};
	return (
		<div className="player-setup-container">
			<div className="form-container">
				<h1>Please set your names</h1>
				<div className="input-container">
					<img src="/x-icon.svg" className="x-icon-input" />
					<input
						type="text"
						value={playerXName}
						placeholder="Player name for X"
						onChange={(e) => handleChange(e, setPlayerXName)}
					/>
				</div>
				{isError && playerXName === "" ? (
					<p className="error">Player X name is required!</p>
				) : null}
				<div className="input-container">
					<img src="/circle-icon.svg" className="circle-icon-input" />
					<input
						type="text"
						value={playerOName}
						placeholder="Player name for O"
						onChange={(e) => handleChange(e, setPlayerOName)}
					/>
				</div>
				{isError && playerOName === "" ? (
					<p className="error">Player O name is required!</p>
				) : null}
				<div className="button-container">
					<button onClick={handleSubmit}>Start Game</button>
				</div>
			</div>
		</div>
	);
};

export default PlayerSetup;
