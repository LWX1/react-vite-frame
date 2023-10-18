import { Table, Tooltip } from "antd";
import styled from "styled-components";



/*表格*/
export const TableContent = styled(Table)`
	overflow: auto;
	flex: 1;
	.ant-table-tbody > tr.ant-table-row-selected > td {
		background-color: transparent;
	}
	.ant-spin-nested-loading {
		height: 100%;
	}

	.ant-spin-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		.ant-table {
			flex: 1;
			overflow: auto;
		}
	}
	
	position: relative;
	.react-resizable {
		position: relative;
		background-clip: padding-box;
	}
	.react-resizable-handle {
		position: absolute;
		width: 10px;
		height: 100%;
		bottom: 0;
		right: -6px;
		cursor: col-resize;
		z-index: 1;
	}
	
	tr {
		td {
			white-space: pre-wrap !important;
		}
	}

	.ant-table-tbody > tr {
		&:nth-child(even) {
			// background: #162f4e;
			background: rgba(22, 201, 255, 0.05);
		}
		&:hover {
			td {
				// background: #4c6481 !important;
				/* background: rgba(22, 201, 255, 0.3) !important; */
			}
		}
	}


	// .ant-table-pagination.ant-pagination {
	// 	float: none;
	// 	text-align: center;
	// }
	.ant-table-fixed-header .ant-table-scroll .ant-table-header {
		margin-right: 5px !important;
		margin-bottom: -6px !important;
		::-webkit-scrollbar {
			width: 6px;
			/*对垂直流动条有效*/
			height: 6px;
			/*对水平流动条有效*/
		}
	}
	.ant-pagination-options-quick-jumper input,
	.ant-select-selection-selected-value,
	.ant-pagination-options-quick-jumper {
		height: 26px;
		line-height: 26px;
	}
	.ant-select-selection--single {
		height: 26px;
	}

	.ant-table-bordered .ant-table-body > table {
		border: none;
	}

	.ant-select-dropdown {
		top: 0 !important;
		left: 0 !important;
		margin-top: -200% !important;
	}
`;

/*提示*/
export const Tip = styled(Tooltip)`
	cursor: pointer;
`;

export const TipContent = styled.div`
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const Text = styled.span`
	display: inline-block;
	visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
	color: #fff;
`;
