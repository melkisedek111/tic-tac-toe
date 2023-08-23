import "./App.css";
import GameSession from "./page/GameSession/GameSession";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/game",
		element: <GameSession />
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
