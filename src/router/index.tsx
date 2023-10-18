import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import {
	PublicRouter,
} from "./allRouters";
import { useEffect, useMemo } from "react";
import { RoutesItems } from "src/interface/router";
import useReducer from "src/hooks/useReducer";
import { SubInfo } from "src/utils/pubSub";
import { getRouterData } from "src/utils/getRouterData";

const renderRoutes = (routes: RoutesItems[]) => {
	return routes.map((item: RoutesItems) => {
		if (item.redirect) {
			return (
				<Route
					path={item.path}
					key={item.path || item.name}
					element={<Navigate to={item.redirect} />}
				/>
			);
		} else if (item.element) {
			if (item.children && item.children.length) {
				return (
					<Route
						path={item.path}
						element={<item.element />}
						key={item.path || item.name}
					>
						{renderRoutes(item.children)}
					</Route>
				);
			} else {
				return (
					<Route
						path={item.path}
						element={<item.element />}
						key={item.path || item.name}
					></Route>
				);
			}
		}
		return null;
	});
};

const BaseRouter = () => {

	const history = useNavigate();
	const [state, dispatch] = useReducer({
		routerList: PublicRouter,
	});
	const { routerList } = state;

	// 获取路由 bool true 跳转到第一个路由
	const getRouter = (bool?: boolean) => {
		getRouterData((routerList: any, firstRouter: any) => {
			dispatch({
				routerList
			});
			if (bool) {
				history(firstRouter.path)
			}
		});
	}
	
	useEffect(() => {
		getRouter()
		SubInfo.subscribe("menuList", getRouter);
	}, []);
	const template = useMemo(() => {
		return <Routes>{renderRoutes(routerList)}</Routes>;
	}, [routerList]);

	return template;
};

export default BaseRouter;
