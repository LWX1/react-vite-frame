import { Button, Form } from "antd";
import { IForm } from "../../interface/form";
import FormItem from "../baseFormItem/formItem";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { SearchFormStyle } from "./styled";
import { cloneDeep } from "lodash";


const BaseSearchForm = forwardRef((props: IForm, ref) => {
	const {
		formList,
		onOk,
		onCancel,
		okText = "查询",
		cancelText = "重置",
		isFooter = true,
		...others
	} = props;
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => {
		return form;
	});

	const cancel = (event: any) => {
		form.resetFields();
		onCancel && onCancel(event);
	};

	// 查询
	const search = () => {
		form.validateFields().then(values => {
			onOk && onOk(values);
		})
	}

	const searchFormList = useMemo(() => {
		
		return cloneDeep(formList)
			.map((item: any) => {
				item.width = item.width || 160;
				item.required = undefined;
				item.rules = undefined;
				
				return item;
			})
			.filter((item: any) => item.search);
	}, [formList]);

	return (
		<SearchFormStyle
			layout="inline"
			form={form}
			{...others}
		>
			<div className="form-left">
				{searchFormList.map((item) => (
					<FormItem
						key={item.name}
						{...item}
						formItemLayout={{
							labelCol: undefined,
							wrapperCol: undefined,
						}}
					/>
				))}
			</div>
			<div className="form-right">
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
								htmlType="button"
								onClick={cancel}
							>
								{cancelText}
							</Button>
							<Button
								shape="round"
								type="primary"
								htmlType="submit"
								onClick={search}
							>
								{okText}
							</Button>
						</div>
					</Form.Item>
				)}
			</div>
		</SearchFormStyle>
	);
});

export default BaseSearchForm;
