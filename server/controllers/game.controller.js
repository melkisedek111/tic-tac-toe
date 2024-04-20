import connect from "../utils/mongoose-connect.js";
import GameDataSchema from "../models/GameData.model.js";

const gameController = {
	/**
	 * DOCUMENT: This functions is used handle to save game data to the db <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @author Mel
	 */
	saveGameData: async (req, res) => {
		const responseData = { success: false, data: {}, message: "" };
		try {
			await connect();
			if (req?.body) {
				const body = req?.body;
				const saveGameData = new GameDataSchema({
					playerX: body.playerX.name,
					winX: body.playerX.win,
					playerO: body.playerO.name,
					winO: body.playerO.win,
					draws: body.draws,
					totalGames: body.totalGames,
				});

				saveGameData.save();
				responseData.success = true;
				responseData.message = "Game data has been saved.";
			}
		} catch (error) {
			console.log(error);
			responseData.message = "Game data has not been saved.";
		}

		res.json(responseData);
	},
};

export default gameController;
