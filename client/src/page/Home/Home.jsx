import React, { useEffect, useState } from "react";
import "./home.style.css";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const Home = () => {
	const [gameDataList, setGameDataList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * DOCUMENT: This functions is used handle the retrieving of the game data <br>
	 * Triggered: when home page onload <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @memberOf Home
	 * @author Mel
	 */
	const getGameData = async () => {
		try {
			setIsLoading(true);
			const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/home`);
			const response = await request.json();

			if (response?.success) {
				setTimeout(() => {
					setGameDataList(response.data);
					setIsLoading(false);
				}, 1500);
			}
		} catch (error) {
			console.log("Error on retrieving game data.");
		}
	};

	useEffect(() => {
		getGameData();
	}, []);

	return (
		<div className="home-container">
			<h1>Game Session Lists</h1>
			<Link className="start-new-game" to="/game">
				Start New Game
			</Link>
			<table border={1} className="table">
				<thead>
					<tr>
						<th>Game No.</th>
						<th>Player X</th>
						<th>Win (X)</th>
						<th>Player O</th>
						<th>Win (O)</th>
						<th>Draws</th>
						<th>Total Games</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan={7}>
								<Loading />
							</td>
						</tr>
					) : (
						gameDataList.map((item) => (
							<tr key={item._id}>
								<td>{item._id}</td>
								<td>{item.playerX}</td>
								<td>{item.winX}</td>
								<td>{item.playerO}</td>
								<td>{item.winO}</td>
								<td>{item.draws}</td>
								<td>{item.totalGames}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Home;
