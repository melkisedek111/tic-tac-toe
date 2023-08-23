import React from "react";
import "./scoreContainer.style.css";

const ScoreContainer = ({playerXName, playerOName, gameData}) => {
	return (
		<div className="score-container">
			<div className="score player-x">
				<span>X ({playerXName || "No Player"})</span>
				<p>{gameData?.playerX?.win || 0}</p>
			</div>
			<div className="score ties">
				<span>Ties</span>
				<p>{gameData?.draws|| 0}</p>
			</div>
			<div className="score player-o">
				<span>O ({playerOName || "No Player"})</span>
				<p>{gameData?.playerO?.win || 0}</p>
			</div>
		</div>
	);
};

export default ScoreContainer;
