import { Pagination } from "antd";
import { useMemo } from "react";
import { ContainerPagiationStyle } from "./styled";


// 基本分页器
const BasePagination = (props: { pagination?: { pageSize: number; page: number; total: number; } | undefined; onChange: any; style?: {} | undefined; simple?: false | undefined; size?: "default" | undefined; showSizeChanger?: true | undefined; isDark?: false | undefined; }) => {
	const {
		pagination = {
			pageSize: 10,
			page: 1,
			total: 0
		},
		onChange,
		style = {},
		simple = false,
		size = "default",
		showSizeChanger = true,
		isDark = false
	} = props;
	const pageSizeOptions = useMemo(() => {
		return [10, 20, 30, 50, 100];
	}, []);
	return (
		<ContainerPagiationStyle style={style} className={isDark ? "dark" : "light"}>
			<Pagination
				pageSize={pagination.pageSize}
				pageSizeOptions={pageSizeOptions}
				current={pagination.page}
				total={pagination.total}
				showSizeChanger={showSizeChanger}
				showQuickJumper
				simple={simple}
				size={size}
				showTotal={total => `共${total}条`}
				onChange={onChange}
			/>
		</ContainerPagiationStyle>
	);
};

export default BasePagination;
