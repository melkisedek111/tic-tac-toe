import mongoose from "mongoose";

/**
 * DOCUMENT: This functions is used handle to connect mongo db <br>
 * Last Updated Date: August 23, 2023
 * @function
 * @author Mel
 */
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
	} catch (error) {
		throw new Error(error);
	}
};

export default connect;
