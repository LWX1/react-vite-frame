import api from "src/api";
import { IObject, IResponse } from "src/interface";
import { IMenu } from "src/interface/menu";
import { IRouterObject } from "src/interface/router";
import { LayoutRouterComponentList, NotTemplateRouterPath, PublicRouter, RouterComponentList } from "src/router/allRouters";
import { SubInfo } from "./pubSub";

// 获取自定义的路由和404路由
const PublicRouters = [...PublicRouter];

// 获取所有的组件
const allRouter: IObject<any> = {};
// 普通组件
RouterComponentList.forEach((item) => {
	allRouter[item.value] = item;
});
// 布局组件
LayoutRouterComponentList.forEach((item) => {
	allRouter[item.value] = item;
});


// 获取第一个路由
export const getFirstRouter = (dataList: IRouterObject[]) => {
	if (dataList.length) {
		let result= dataList[0];
		while (result.children && result.children.length) {
			result = result.children[0]
		}
		return result;
	}
}

// 格式化路由
const formatRouter = (data: Array<IMenu>) => {
	// 布局组件
	const layoutComponentObject: IObject<IRouterObject[]> = {};
	// 常规组件
	const commonComponent: IRouterObject[] = [];

	const fun = (data: IMenu[]): Array<IRouterObject> => {
		return data.map((item: IMenu) => {
			const obj: IRouterObject = {
				path: item.url as string,
				name: item.name,
				redirect: item.redirect,
				element:
					allRouter[item.componentPath || NotTemplateRouterPath.value]
						.component,
				children: [],
			};

			// 存在则为布局组件
			if (item.layout) {
				if (!layoutComponentObject[item.layout]) {
					layoutComponentObject[item.layout] = [obj];
				} else {
					layoutComponentObject[item.layout].push(obj);
				}
				// 常规布局
			} else {
				if (item.children && item.children.length === 0)
					commonComponent.push(obj);
			}

			if (item.children && item.children.length > 0) {
				return {
					...obj,
					children: fun(item.children),
				};
			}
			return obj;
		});
	};
	
	fun(data);
	Object.keys(layoutComponentObject).forEach((item) => {
		allRouter[item].children = layoutComponentObject[item];
		const data = allRouter[item];
		commonComponent.push({
			element: data.component,
			// path: data.value,
			name: data.label,
			redirect: data.redirect,
			children: allRouter[item].children,
		});
	});
	const firstRouter = getFirstRouter(commonComponent);

	const redirectRouter = {
		name: firstRouter?.name as string,
		path: '',
		redirect: firstRouter?.path,
	
	}
	commonComponent.push(redirectRouter)
	return [commonComponent, firstRouter];
};

// 获取路由数据 回调
export const getRouterData = (callback: Function) => {
    api.system.menu.getAuthTree().then((res: IResponse<Array<IMenu>>) => {
        if (res.code === 200) {
            const [rusult, firstRouter] = formatRouter(res.data);
            // 创建菜单
			sessionStorage.setItem("menuList", JSON.stringify(res.data));
            // 通知sider
            SubInfo.publish("updateRouter", res.data);
            callback && callback( [...PublicRouters, ...rusult as IRouterObject[]], firstRouter)
        }
    });
};

// 修改菜单，推送路由数据
export const publishChangeMenuList = (bool=false) => {
	SubInfo.publish("menuList", bool);
}