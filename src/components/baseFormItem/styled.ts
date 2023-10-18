import { Form } from "antd";
import styled from "styled-components";

export const FormItemStyle = styled(Form.Item)`
	.ant-input[disabled],
	.ant-radio-disabled + span,
	.ant-select-disabled.ant-select .ant-select-selector,
	.ant-radio-disabled .ant-radio-inner::after,
	.ant-input-number-disabled {
		color: rgb(0 0 0);
	}
`;