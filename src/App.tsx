import { useEffect } from "react";
import BaseRouter from "./router";
import AuthRouter from "./router/AuthRouter";

function App() {
	useEffect(() => {
		
	}, [])
	return (
		<AuthRouter>
			<BaseRouter />
		</AuthRouter>
	);
}

export default App;
