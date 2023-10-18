import { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import "./index.scss";
import Side from "./components/Side";
import useReducer from "src/hooks/useReducer";
import LayoutHeader from "./components/Header";

const { Header } = Layout;

const { Sider, Content } = Layout;

const BaseLayout = () => {
	const [state, dispatch] = useReducer({
		collapsed: false,
	});

	const { collapsed } = state;

	useEffect(() => {}, []);
	return (
		<Layout className="home">
			<Header className="layout-header">
				<LayoutHeader
					dispatch={dispatch}
					collapsed={collapsed}
				/>
			</Header>
			<Layout
				className="body"
				style={{
					background: "#FAFAFA",
				}}
			>
				<Sider
					className="layout-sider"
					collapsible
					collapsed={collapsed}
					onCollapse={(collapsed) => {
						dispatch({
							collapsed
						})
					}}
				>
					<Side />
				</Sider>
				<Content className="layout-content">
					<Suspense fallback={<p>加载中..</p>}>
						<Outlet />
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
