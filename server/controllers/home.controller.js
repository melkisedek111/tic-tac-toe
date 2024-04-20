import connect from "../utils/mongoose-connect.js";
import GameDataModel from "../models/GameData.model.js";

const homeController = {
	/**
	 * DOCUMENT: This functions is used handle to fetch game from the db <br>
	 * Last Updated Date: August 23, 2023
	 * @function
	 * @author Mel
	 */
	home: async (req, res) => {
		const responseData = { success: false, data: {}, message: "" };
		try {
			await connect();
			const gameData = await GameDataModel.find().sort({ _id: -1 });

			responseData.success = true;
			responseData.data = gameData;
		} catch (error) {
			console.log(error);
			responseData.message = "Game data has not been retrieved.";
		}

		res.json(responseData);
	},
};

export default homeController;
