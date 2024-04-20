import "./gameSession.style.css";
import StatusContainer from "../../components/StatusContainer";
import ScoreContainer from "../../components/ScoreContainer";
import PlayerSetup from "../../components/PlayerSetup";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { Link } from "react-router-dom";

function GameSession() {
	const playerX = "x";
	const playerO = "o";
	const [isWin, setIsWin] = useState(false);
	const [isGameDraw, setIsGameDraw] = useState(false);
	const [isPlay, setIsPlay] = useState(false);
	const [playerXName, setPlayerXName] = useState("");
	const [playerOName, setPlayerOName] = useState("");
	const [currentPlayer, setCurrentPlayer] = useState("x");
	const [currentWinnerPlayer, setCurrentWinnerPlayer] = useState(undefined);
	const [cells, setCells] = useState([]);

	const WINNING_COMBINATIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const [gamePlayData, setGamePlayData] = useState(undefined);

	/**
	 * DOCUMENT: This functions is used handle on winning combination of the game <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @param currentPlayer - string
	 * @author Mel
	 */
	const handleCheckWinCombination = (currentPlayer) => {
		return WINNING_COMBINATIONS.some((combination) =>
			combination.every((index) => {
				return cells[index].classList.contains(currentPlayer);
			})
		);
	};

	/**
	 * DOCUMENT: This functions is used handle the draw if both players does not met the winning combination <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @author Mel
	 */
	const handleIsDraw = () => {
		return [...cells].every(
			(cell) =>
				cell.classList.contains(playerX) || cell.classList.contains(playerO)
		);
	};

	/**
	 * DOCUMENT: This functions is used handle on winning combination of the game <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @param winningPlayer - string
	 * @param isDraw - boolean
	 * @author Mel
	 */
	const handleGameData = (winningPlayer, isDraw) => {
		let data = {};

		// check if the gameData is undefined then initialized
		if (gamePlayData === undefined) {
			data = {
				playerX: {
					name: playerXName,
					win: winningPlayer === playerX ? 1 : 0,
				},
				playerO: {
					name: playerOName,
					win: winningPlayer === playerO ? 1 : 0,
				},
				draws: isDraw ? 1 : 0,
				totalGames: 1,
			};
		} else {
			// append values
			const gameData = { ...gamePlayData };
			gameData.playerX.win =
				winningPlayer === playerX
					? gameData.playerX.win + 1
					: gameData.playerX.win;
			gameData.playerO.win =
				winningPlayer === playerO
					? gameData.playerO.win + 1
					: gameData.playerO.win;
			gameData.draws = isDraw ? gameData.draws + 1 : gameData.draws;
			data = { ...gameData };
		}

		setGamePlayData(data);
	};

	/**
	 * DOCUMENT: This functions is used handle win for players <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @param currentTurnPlayer - string
	 * @author Mel
	 */
	const handleWin = (currentTurnPlayer) => {
		//check if the winning combination have been met either of the player
		if (handleCheckWinCombination(currentTurnPlayer)) {
			setIsWin(true);
			setCurrentWinnerPlayer(currentTurnPlayer);
			handleGameData(currentTurnPlayer, false);
			setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
		}
		// check if there is a draw
		else if (handleIsDraw()) {
			setIsGameDraw(true);
			handleGameData("", true);
		}
	};

	/**
	 * DOCUMENT: This functions is used handle the resetting the entire game <br>
	 * Triggered: when click the reset button continue button <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @param isResetAll - boolean
	 * @author Mel
	 */
	const handleResetGame = (isResetAll = false) => {
		// remove all class for both X and O
		cells.forEach((cell) => {
			cell.classList.remove(playerX);
			cell.classList.remove(playerO);
			cell.innerHTML = "";
		});

		setIsGameDraw(false);
		setIsWin(false);
		setCurrentWinnerPlayer(undefined);

		// set the values to default values
		if (isResetAll) {
			setPlayerOName("");
			setPlayerXName("");
			setGamePlayData(undefined);
			setIsWin(false);
			setIsGameDraw(false);
			setIsPlay(false);
		}
	};

	/**
	 * DOCUMENT: This functions is used handle the game continue <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @author Mel
	 */
	const handleContinue = () => {
		const data = { ...gamePlayData };
		data.totalGames++;

		setGamePlayData(data);
		handleResetGame();
	};

	/**
	 * DOCUMENT: This functions is used handle the gameplay of the game <br>
	 * Triggered: when click the cells <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf GameSession
	 * @param event - event
	 * @author Mel
	 */
	const handleClickCell = (event) => {
		let player = currentPlayer;

		// check if there is no player clicked the each of the cell
		if (event.target.innerHTML === "") {
			if (player === playerX) {
				event.target.classList.add(playerX);

				// appending the X marking
				event.target.innerHTML =
					'<img src="/x-icon.svg" class="player-icon child" />';
				setCurrentPlayer(playerO);
				handleWin(playerX);
			} else {
				event.target.classList.add(playerO);

				// appending the O marking
				event.target.innerHTML =
					'<img src="/circle-icon.svg" class="player-icon child" />';
				setCurrentPlayer(playerX);
				handleWin(playerO);
			}
		}
	};

	useEffect(() => {
		const cellElements = document.querySelectorAll(".cell");
		setCells(cellElements);
	}, []);

	return (
		<div className="game-container">
			<Link className="home-link" to="/">
				Home
			</Link>
			<div>
				{(isWin || isGameDraw) && (
					<Alert
						currentPlayer={currentWinnerPlayer}
						isDraw={isGameDraw}
						isWin={isWin}
						handleContinue={handleContinue}
						gameData={gamePlayData}
						handleResetGame={handleResetGame}
					/>
				)}
				{!isPlay && playerXName === "" && playerOName === "" ? (
					<PlayerSetup
						setIsPlay={setIsPlay}
						setPlayerX={setPlayerXName}
						setPlayerO={setPlayerOName}
					/>
				) : null}
				<StatusContainer
					playerX={playerXName}
					playerO={playerOName}
					currentPlayer={currentPlayer}
					handleResetGame={handleResetGame}
				/>
				<div className="container">
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="1"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="2"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="3"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="4"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="5"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="6"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="7"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="8"
					></div>
					<div
						className="cell"
						onClick={handleClickCell}
						data-cell-value="9"
					></div>
				</div>
				<ScoreContainer
					playerXName={playerXName}
					playerOName={playerOName}
					gameData={gamePlayData}
				/>
			</div>
		</div>
	);
}

export default GameSession;
