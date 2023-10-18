import { NonIndexRouteObject } from "react-router-dom";

export interface IRouterObject extends NonIndexRouteObject{
    name: string;
    redirect?: string;
	children?: IRouterObject[];
	url?:string
}

export type RoutesItems = {
	name?: string;
	path: string;
	element?: React.LazyExoticComponent<() => JSX.Element>;
	children?: RoutesItems[];
	redirect?: string;
};