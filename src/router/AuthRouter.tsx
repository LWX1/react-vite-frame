import { ReactNode, useEffect } from "react";

const AuthRouter = (props: {
	children: ReactNode
}) => {

	useEffect(() => {
		console.log("出发")
	}, [])
	const { children } = props;
	return children;
};

export default AuthRouter;
