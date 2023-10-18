import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RouterPrefix } from "src/config";

const LayoutHeader = (props: any) => {
	const { collapsed, dispatch } = props;
	const history = useNavigate();
	const loginOut = () => {
		localStorage.clear();
		sessionStorage.clear();
		history(`${RouterPrefix}login`);
	};
	const headerList = useMemo(() => {
		return [
			
			{
				key: 2,
				label: <span onClick={loginOut}>退出登录</span>,
			},
		];
	}, []);

	return (
		<div className="flex-between">
			<div className="header-left">
				<span
					className="cursor"
					onClick={() => {
						dispatch({
							collapsed: !collapsed,
						});
					}}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</span>
			</div>
			<div className="header-right">
				<Dropdown menu={{ items: headerList }} arrow={true}>
					<span className="flex-center">
						<Avatar icon={<UserOutlined />} />
						{localStorage.getItem("username") || ""}
					</span>
				</Dropdown>
			</div>
		</div>
	);
};

export default LayoutHeader;
