import { BorderOuterOutlined, LockFilled, UserOutlined } from "@ant-design/icons";
import { InputStyle, LoginBoxStyle, LoginStyle } from "./styled";
import { Button, Form } from "antd";
import useReducer from "../../hooks/useReducer";
import api from "src/api";
import { publicKeyEncrypt } from "src/utils/aes";
import CodeComponent from "./component/CodeComponent";
import { RequiredConfig } from "src/config/required";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { SubInfo } from "src/utils/pubSub";

const Login = () => {
	const history = useNavigate()
	const refCode = useRef({
		getCode: () => {}
	});
	const [form] = Form.useForm();
	const [state, dispatch] = useReducer({
		activeType: 0,
	});
	const { activeType } = state;

	// 登录类型
	const changeLoginType = (activeType: number) => {
		dispatch({
			activeType,
		});
	};

	// 获取盐
	const getProfile = (token: string) => {
		localStorage.setItem("token", token);
		api.login.profile().then((res: any) => {
			if (res.code === 200) {
				const { username, userId } = res.data;
				localStorage.setItem("username", username);
				localStorage.setItem("userId", userId);
				if(sessionStorage.getItem("callbackUrl")) {
					history(sessionStorage.getItem("callbackUrl") as string);
				} else {
					// true 表示跳转到第一个路由
					SubInfo.publish("menuList", true);
				}
			}
		});
	};

	// 登录
	const startLogin = () => {
		form.validateFields().then(values => {
			api.login
			.doLogin({
				...values,
				password: publicKeyEncrypt(values.password),
			})
			.then((res: any) => {
				if (res.code === 200) {
					getProfile(res.data.access_token);
				} else {
				}
			})
			.catch((res: any) => {
				refCode.current.getCode()
			});
		})
		
	};

	useEffect(() => {
		form.setFieldsValue({
			username: sessionStorage.getItem("username") || undefined
		})
	}, [])

	return (
		<LoginStyle className="flex-between">
			<LoginBoxStyle>
				<div className="flex-between login-type">
					<span
						className={`cursor ${activeType === 0 ? "active" : ""}`}
						onClick={() => {
							changeLoginType(0);
						}}
					>
						账号登录
					</span>
					<span
						className={`cursor ${activeType === 1 ? "active" : ""}`}
						onClick={() => {
							changeLoginType(1);
						}}
					>
						扫码登录
					</span>
				</div>
				<Form form={form} onFinish={startLogin} autoComplete="on" name="login" >
					<Form.Item name="username" rules={RequiredConfig.accountRequired}>
						<InputStyle
							prefix={<UserOutlined />}
							bordered
							placeholder="账号"
						/>
					</Form.Item>
					<Form.Item name="password" rules={RequiredConfig.passwordRequired}>
						<InputStyle.Password
							className="password"
							prefix={<LockFilled />}
							bordered
							placeholder="密码"
						/>
					</Form.Item>
					<Form.Item name="code" rules={RequiredConfig.codeRequired}>
						<InputStyle
							className="code"
							prefix={<BorderOuterOutlined  />}
							bordered
							placeholder="验证码"
							suffix={<CodeComponent ref={refCode}/>}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							shape="round"
							htmlType="submit"
							block={true}
						>
							登录
						</Button>
					</Form.Item>
				</Form>
				<div className="flex-between">
					<span className="cursor">创建账号</span>
					<span className="cursor">忘记密码</span>
				</div>
			</LoginBoxStyle>
		</LoginStyle>
	);
};

export default Login;
