import React from "react";
import "./statusContainer.style.css";

const StatusContainer = ({currentPlayer, handleResetGame}) => {
	return (
		<div className="status-container">
			<div className="player-icon-container">
				<img src="/x-icon.svg" className="x-icon" />
				<img src="/circle-icon.svg" className="circle-icon" />
			</div>
            <div className="current-turn-container">
                {
                    currentPlayer === "x" ? <img src="/x-icon.svg" className="current-player-icon"/> : <img src="/circle-icon.svg" className="current-player-icon"/>
                }
                
                <p>Turn</p>
            </div>
            <button onClick={handleResetGame}>
                <img src='/replay-icon.svg' />
            </button>
		</div>
	);
};

export default StatusContainer;
