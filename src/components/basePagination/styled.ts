import styled from "styled-components";

export const ContainerPagiationStyle = styled.div`
	padding: 5px 20px;
	text-align: center;
	background: #fff;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	&.dark {
		background: #0048a8;
		.ant-pagination {
			color: #fff;
		}
		/* .ant-pagination-disabled .ant-pagination-item-link,
		.ant-pagination-disabled:hover .ant-pagination-item-link {
			color: #fff;
		} */
		/* .ant-pagination-item a {
			color: #fff;
		} */
		.ant-pagination-item-active a {
			color: #1890ff;
		}
		/* .ant-pagination-prev,
		.ant-pagination-next,
		.ant-pagination-jump-prev,
		.ant-pagination-jump-next {
			color: #fff;
		} */
		.ant-select-dropdown {
			color: #000;
			.ant-select-item {
				color: #000;
			}
		}
	}
`;