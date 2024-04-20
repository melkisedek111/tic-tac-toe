import React, { useState } from "react";
import "./alert.style.css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Alert = ({
	currentPlayer,
	isWin,
	isDraw,
	handleContinue,
	gameData,
	handleResetGame,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	/**
	 * DOCUMENT: This functions is used handle the saving of the game data <br>
	 * Triggered: when click the quit button <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf Alert
	 * @author Mel
	 */
	const handleSaveGamePlayData = async () => {
		try {
			setIsLoading(true);

			const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/saveGameData`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(gameData),
			});

			const response = await request.json();

			if (response?.success) {
				setTimeout(() => {
					setIsLoading(false);
					handleResetGame(true);
					navigate("/");
				}, 1500);
			}
		} catch (error) {
			console.log("Error on saving game data.");
		}
	};
	return (
		<div className="alert-container">
			<div className="details-container">
				{isLoading ? (
					<Loading />
				) : (
					<>
						<h3>You Won!</h3>
						<div className="description">
							{isWin && (
								<>
									{currentPlayer === "x" ? (
										<img src="/x-icon.svg" />
									) : (
										<img src="/circle-icon.svg" />
									)}

									<h1>Takes the Round</h1>
								</>
							)}
							{isDraw && (
								<>
									<img src="/x-icon.svg" /> <h1>And</h1>{" "}
									<img src="/circle-icon.svg" /> <h1>Draw!</h1>
								</>
							)}
						</div>
						<div className="alert-button-container">
							<button className="quit" onClick={handleSaveGamePlayData}>
								Quit
							</button>
							<button className="continue" onClick={handleContinue}>
								Continue
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Alert;
