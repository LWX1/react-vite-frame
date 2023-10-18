import { Button, Form } from "antd";
import { IForm } from "../../interface/form";
import FormItem from "../baseFormItem/formItem";
import { forwardRef, useImperativeHandle } from "react";

const BaseForm = forwardRef((props: IForm, ref) => {
	const {
		formList,
		onOk,
		onCancel,
		okText = "提交",
		cancelText = "重置",
		isFooter = true,
		...others
	} = props;
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => {
		return form
	});

	const cancel = (event: any) => {
		form.resetFields();
		onCancel && onCancel(event);
	};

	return (
		<Form
			form={form}
			onFinish={onOk}
			{...others}
		>
			{formList.map((item) => (
				<FormItem
					key={item.name}
					{...item}
				/>
			))}
			{isFooter && (
				<Form.Item style={{ marginBottom: 0 }}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: 10,
						}}
					>
						<Button
							shape="round"
							type="primary"
							htmlType="submit"
						>
							{okText}
						</Button>
						<Button
							shape="round"
							htmlType="button"
							onClick={cancel}
						>
							{cancelText}
						</Button>
					</div>
				</Form.Item>
			)}
		</Form>
	);
});

export default BaseForm
