import dayjs from 'dayjs';
import {
	Input,
	Select,
	DatePicker,
	Upload,
	Button,
	Radio,
	Table,
	Checkbox,
	TreeSelect,
	InputNumber,
	Cascader,
	AutoComplete,
} from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react";
import { FormItemStyle } from "./styled";



const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// 默认布局
const FormItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};

// 默认提示 type 判断是否required提示
const getPlaceholder = (item: { type: string | string[]; label: any; }, type = false) => {
	// console.log("item", item);
	if (item.type === "timeRange") {
		if (type) {
			return `请选择${item.label}`;
		}
		return [`请选择开始${item.label}`, `请选择结束${item.label}`];
	}
	const prefix = item.type.indexOf("select") > -1 ? "请选择" : "请输入";
	return `${prefix}${item.label}`;
};

// 上传文件
const othersProps = (item: { type: string; }) => {
	if (item.type === "enclosure") {
		return { getValueFromEvent: (e: any) => normFile(e) };
	}
	return {};
};

// 上传文件
const normFile = (e: { fileList: any; }) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

// 默认规则
const getDefaultRules = (item: { required?: any; type?: string | string[]; label?: any; }) => {
	return [
		{
			required: item.required,
			message: getPlaceholder(item as any, true),
		},
	];
};

const getFormItem = (item: { type: any; width?: any; itemProps?: any; disabled?: any; label: any; mode?: any; onChange?: any; options?: any; onUpload?: any; accept?: any; optionType?: any; dataSource?: any; columns?: any; min?: any; max?: any; maxCount?: any; customRequest?: any; onPreview?: any; fileList?: any; beforeUpload?: any; readOnly?: any; onRemove?: any; labelName?: any; }) => {
	const width = item.width || "100%";
	switch (item.type) {
		case "Input":
			return (
				<Input
					style={{ width  }}
					placeholder={getPlaceholder(item)}
					allowClear
					disabled={item.disabled}
					{...item.itemProps}
				/>
			);

		case "Select":
			return (
				<Select
					style={{ width }}
					showSearch
					optionFilterProp="label"
					placeholder={`请选择${item.label}`}
					allowClear
					// options={item.options || []}
					mode={item.mode}
					maxTagCount={1}
					disabled={item.disabled}
					onChange={(e) => {
						item.onChange && item.onChange(e);
					}}
					{...item.itemProps}
				>
					{(item.options || []).map((d: { value: any; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
						<Option
							key={index}
							value={d.value}
							label={d.label}
						>
							{d.label}
						</Option>
					))}
				</Select>
			);

		case "TextArea":
			return (
				<TextArea
					style={{ width }}
					placeholder={getPlaceholder(item)}
					allowClear
					disabled={item.disabled}
					{...item.itemProps}
				/>
			);

		case "Date":
			return (
				<DatePicker
					style={{ width }}
					placeholder={getPlaceholder(item)}
					allowClear
					disabledDate={(current) => current >= dayjs().endOf("day")}
					disabled={item.disabled}
					{...item.itemProps}
				/>
			);
		case "TimeRange":
			return (
				<RangePicker
					style={{ width }}
					placeholder={getPlaceholder(item)}
					allowClear
					disabledDate={(current) => current >= dayjs().endOf("day")}
					disabled={item.disabled}
					{...item.itemProps}
				/>
			);

		case "Enclosure":
			const UploadProps = {
				name: "file",
				showUploadList: true,
				beforeUpload: (file: any) => {
					item.onUpload && item.onUpload(file);
					return false;
				},
				accept: item.accept,
			};
			return (
				<Upload
					{...UploadProps}
					disabled={item.disabled}
				>
					<Button
						icon={<PlusOutlined />}
						disabled={item.disabled}
					>
						点击上传
					</Button>
				</Upload>
			);

		case "Radio":
			return (
				<Radio.Group
					style={{ width }}
					options={item.options}
					disabled={item.disabled}
					optionType={item.optionType || "default"}
					allowClear
					onChange={item.onChange}
					{...item.itemProps}
				>
					{/* {(item.options || []).map((d: any, index: number) => (
                        <Radio key={index} value={d.value} onChange={item.onChange}>
                            {d.label}
                        </Radio>
                    ))} */}
				</Radio.Group>
			);
		case "Table":
			return (
				<Table
					dataSource={item.dataSource}
					columns={item.columns}
					{...item.itemProps}
				/>
			);
		case "Checkbox":
			return (
				<Checkbox.Group
					disabled={item.disabled}
					options={item.options || []}
					allowClear
					{...item.itemProps}
				/>
			);

		case "TreeSelect":
			return (
				<TreeSelect
					dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
					treeData={item.options || []}
					placeholder={`请选择${item.label}`}
					disabled={item.disabled}
					allowClear
					{...item.itemProps}
				/>
			);
		case "InputNmber":
			return (
				<InputNumber
					style={{ width }}
					disabled={item.disabled}
					min={item.min || 0}
					max={item.max}
					allowClear
					{...item.itemProps}
				/>
			);
		case "Cascader":
			return (
				<Cascader
					style={{ width: "100%" }}
					options={item.options || []}
					onChange={item.onChange}
					multiple={true}
					maxTagCount="responsive"
					allowClear
					{...item.itemProps}
				/>
			);

		case "UploadSimple":
			// 图片格式
			const uploadProps:any = {
				name: "file",
				maxCount: item.maxCount || 1,
				accept: item.accept || ".jpg,.png,.ppt,.doc,.docx,.pdf,.pptx",
				customRequest: (e: any) => {
					item.customRequest && item.customRequest(e, item);
				},
				// onRemove: (file) => {
				//   return item.onRemove && item.onRemove(file, item);
				// },
				onPreview: (file: any) => {
					item.onPreview && item.onPreview(file, item);
				},
				fileList: item.fileList,
				beforeUpload: (file: any) => {
					return item.beforeUpload && item.beforeUpload(file, item);
				},
				openFileDialogOnClick: item.readOnly ? false : true,
				progress: {
					strokeColor: {
						"0%": "#108ee9",
						"100%": "#87d068",
					},
					strokeWidth: 3,
					format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
				},
			};
			return (
				<Upload
					style={{ width }}
					{...uploadProps}
					disabled={item.disabled}
					onChange={(e: { file: { status: string; }; }) => {
						if (e.file.status === "removed") {
							item.onRemove && item.onRemove(e.file, item);
							return;
						}
					}}
				>
					<Button
						icon={<PlusCircleOutlined />}
						disabled={item.disabled}
					>
						{item.labelName || "点击上传"}
					</Button>
				</Upload>
			);
		case "AutoComplete":
			return (
				<AutoComplete
					style={{ width }}
					placeholder={getPlaceholder(item)}
					allowClear
					disabled={item.disabled}
					{...item.itemProps}
				/>
			);
		default:
			return <></>;
	}
};

const FormItem = (props: { render?: any; addonAfter?: any; label?: any; formItemLayout?: any; required?: any; valuePropName?: any; name?: any; rules?: any; className?: any; type?: string; }) => {
	// 自定义
	if (props.render) {
		return props.render();
	}
	if (props.addonAfter) {
		return (
			<FormItemStyle
				label={props.label}
				{...FormItemLayout}
				{...props.formItemLayout}
				required={props.required}
				valuePropName={props.valuePropName || "value"}
				{...othersProps(props as {
					type: string
				})}
			>
				<FormItemStyle
					noStyle
					name={props.name}
					rules={props.rules || getDefaultRules(props)}
				>
					{getFormItem(props as any)}
				</FormItemStyle>
				{props.addonAfter}
			</FormItemStyle>
		);
	}
	return (
		<FormItemStyle
			name={props.name}
			label={props.label}
			{...FormItemLayout}
			{...props.formItemLayout}
			rules={props.rules || getDefaultRules(props)}
			valuePropName={props.valuePropName || "value"}
			className={props.className}
			{...othersProps(props as any)}
		>
			{getFormItem(props as any)}
		</FormItemStyle>
	);
};

export default FormItem;
