import { lazy } from "react";
import { RouterPrefix } from "../config";

// 暂无模板
export const NotTemplateRouterPath = {
	label: "无模板",
	value: "../pages/NotFound",
	component: lazy(() => import("../layout")),
};

// 公共路由
export const PublicRouter = [
	{
		name: "登录",
		path: `${RouterPrefix}login`,
		index: true,
		element: lazy(() => import("../pages/login")),
	},
	{
		name: "全局",
		path: "*",
		element: lazy(() => import("../pages/NotFound")),
	},
];

// 组件
export const RouterComponentList = [
	
	{
		label: "首页",
		value: "../pages/home",
		component: lazy(() => import("../pages/home")),
	},
	{
		label: "菜单管理",
		value: "../pages/system/menu",
		component: lazy(() => import("../pages/system/menu")),
	},
	{
		label: "用户管理",
		value: "../pages/system/user",
		component: lazy(() => import("../pages/system/user")),
	},
	{
		label: "角色管理",
		value: "../pages/system/role",
		component: lazy(() => import("../pages/system/role")),
	},
	NotTemplateRouterPath,
];

// 布局组件
export const LayoutRouterComponentList = [
	{
		label: "布局",
		value: "../layout",
		component: lazy(() => import("../layout")),
		children: []
	},
]

// 布局
// export const LayoutComponent = {
// 	name: "布局",
// 	path: RouterPrefix,
// 	element: lazy(() => import("../layout")) as unknown as ReactNode,
// 	children: [],
// };

// const allRouter = [
// 	{
// 		name: "主页",
// 		path: '',
// 		redirect: `${RouterPrefix}home`
// 	},
// 	{
// 		name: "布局",
// 		path: RouterPrefix,
// 		element: lazy(() => import("../layout")),
// 		children: [
// 		  	{
// 				name: "首页",
// 				path: RouterPrefix + "home",
// 				element:  lazy(() => import("../pages/baseMenu")),
// 			},
// 			/***************** 系统管理 ***************************/
// 			{
// 				name: "",
// 				path: RouterPrefix + "menuManage",
// 				element:  lazy(() => import("../pages/system/menu")),
// 			}
// 		]
// 	},

// ];

// export default allRouter;
