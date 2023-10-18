import { Menu } from "antd";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AntdIcon } from "src/components/baseIcon";
import useReducer from "src/hooks/useReducer";
import { IMenu } from "src/interface/menu";
import { SubInfo } from "src/utils/pubSub";

const formatMenu = (data: any) => {
	return data.map((item: IMenu) => {
		// item.url = item.url?.charAt(0) === "/" ? item.url : `/${item.url}`;
		const obj = {
			label: item.name as string,
			key: `${item.name}__${item.type}__${item.url}`,
			icon: AntdIcon[item.icon as string]
				? React.createElement(AntdIcon[item.icon as string])
				: undefined,
		};

		if (item.children && item.children.length > 0) {
			return {
				...obj,
				children: formatMenu(item.children),
			};
		}
		return obj;
	});
};

const LayoutSider = () => {
	const history = useNavigate();

	const [state, dispatch] = useReducer({
		menuList: [],
	});

	const { menuList } = state;

	useEffect(() => {
		
		SubInfo.subscribe("updateRouter", (values: any) => {
			dispatch({
				menuList: formatMenu(values),
			});
		});
		const menuList = sessionStorage.getItem("menuList");
		if (menuList) {
			dispatch({
				menuList: formatMenu(JSON.parse(menuList)),
			});
		}
	}, []);

	// 选择菜单
	const selectMenu = (values: any) => {
		const data = values.key.split("__");
		const url = data.pop();
		const isOpen = data.pop();

		if (isOpen !== "1") {
			window.open(url);
		} else {
			history(url);
		}
	};

	return (
		<Menu
			mode="inline"
			theme="dark"
			items={menuList}
			onSelect={selectMenu}
		/>
	);
};

export default LayoutSider;
