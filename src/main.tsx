import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import BaseEmpty from "./components/baseEmpty/index.tsx";
import "src/assets/css/public.scss";
import { Suspense } from "react";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<ConfigProvider
		locale={zhCN}
		renderEmpty={() => {
			return <BaseEmpty>暂无数据</BaseEmpty>;
		}}
	>
		<BrowserRouter>
			<Suspense>
				<App />
			</Suspense>
		</BrowserRouter>
	</ConfigProvider>
	// </React.StrictMode>
);
