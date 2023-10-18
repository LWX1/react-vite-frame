import { useState, useCallback, useRef, useMemo, memo } from "react";
import { useEffect } from "react";
import { Resizable } from "react-resizable";
import { throttle } from "lodash";

import { TableContent, Tip, Text, TipContent } from "./styled";
import { ITable, ITablePaginationConfig } from "src/interface/table";

const PAGESIZE_OPTIONS = ["5", "10", "20", "40", "50", "100", "200"];

//拖拽的表头
const ResizeableTitle = (props: { [x: string]: any; onResize: any; width: any; scroll: any; }) => {
	const { onResize, width, scroll, ...restProps } = props;

	if (!width) {
		return <th {...restProps} />;
	}

	return (
		<Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }}>
			<th {...restProps} />
		</Resizable>
	);
};

//页面的高度
const UseSize = () => {
	const [clientHeight, setClientHeight] = useState(document.documentElement.clientHeight);

	const onResize = useCallback(() => {
		setClientHeight(document.documentElement.clientHeight);
	}, []);

	const throttleSize = throttle(onResize, 1000);

	useEffect(() => {
		window.addEventListener("resize", throttleSize);
		return () => {
			window.removeEventListener("resize", throttleSize);
		};
	}, [onResize]);

	return [clientHeight];
};

/**
 * @param {Number} cutHeight 可视区域高度-表格的高度
 * @param {Object} columns columns必设置width属性
 * @param 其他参数为表格参数
 * @description 表格组件
 */
const BaseTable = memo((props:ITable) => {
	const { columns, dataSource = [], pagination = true, cutHeight, scroll, ...others } = props;

	//用于计算是够需要tootip
	const span = useRef(null);

	//表格列
	const [baseColumns, setBaseColumns] = useState(columns || []);
	//表格高度
	const [height, setHeight] = useState(0);

	const [clientHeight] = UseSize();
	const isNumber = (val: string) => {
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(val) || regNeg.test(val)) {
			return true;
		} else {
			return false;
		}
	};
	useEffect(() => {
		// 判断 表格初始的高度是否是数字 如果不是数字  则表明是css 字符calc(之类的动态计算属性)
		if (isNumber(cutHeight as string)) {
			const scrollHeight = clientHeight - (cutHeight as number);
			setHeight(scrollHeight);
		}
	}, [cutHeight, clientHeight]);

	useEffect(() => {
		setBaseColumns(columns);
	}, [columns]);

	const components = {
		header: {
			cell: ResizeableTitle
		}
	};

	//拖动表头
	const handleResize =
		( index: string | number) =>
		(e: any, { size }: any) => {
			const nextColumns:any = [...baseColumns];
			nextColumns[index] = {
				...nextColumns[index],
				width: size.width || 200
			};
			setBaseColumns(nextColumns);
		};

	const getSumColumnsWidth = (columns: any[]) => {
		let sum = 0;
		columns &&
			columns.forEach((item: { width: number; children: any; }) => {
				if (item.width && !item.children) {
					sum += item.width;
				} else {
					sum += getSumColumnsWidth(item.children);
				}
			});
		return sum;
	};

	//横向滚动宽度
	const scrollX = useMemo(() => {
		// return sumBy(columns, (item) => item.width);
		return getSumColumnsWidth(columns);
	}, [columns]);

	//计算字符串是否需要提示
	const calculateText = (text: string, width: number) => {
		const dom:any = span.current;
		if (!dom) {
			return false;
		}
		dom.innerText = text;
		return parseFloat(window.getComputedStyle(dom).width) + 10 > width;
	};
	//获取列的数据
	const getColumns = useMemo(() => {
		return (baseColumns as any).map((col: { render: (arg0: any, arg1: any, arg2: any) => any; width: any; }, index: any) => {
			const _col = {
				...col
			};
			_col.render = (text: any, record: any, index: any) => {
				let result = calculateText(text, _col.width);
				let content = text;
				if (col.render) {
					content = col.render(text, record, index);
					result = typeof content === "string" ? calculateText(content, col.width) : false;
				}
				if (result) {
					return (
						<Tip
							title={
								<div
									style={{
										maxHeight: "calc(100vh - 280px)",
										overflow: "auto"
									}}>
									{content}
								</div>
							}>
							<TipContent>{content}</TipContent>
						</Tip>
					);
				}
				return content;
			};

			return {
				..._col,
				ellipsis: true,
				onHeaderCell: (column: { width: any; }) => ({
					width: column.width,
					onResize: handleResize(index)
				})
			};
		});
	}, [baseColumns]);

	//页码
	const paginationConfig = {
		pageSizeOptions: PAGESIZE_OPTIONS,
		showQuickJumper: true,
		showSizeChanger: Boolean(pagination),
		position: ["bottomRight"],
		showTotal: (_: any) => {
			const { pageSize, total = 0 } = (pagination as ITablePaginationConfig)  || {};
			if (pageSize) {
				const pages = Math.ceil(total / pageSize);
				return `共${pages}页/${total}条`;
			}
			return `共${total}条`;
		},
		...(pagination as ITablePaginationConfig),
		current: (pagination as ITablePaginationConfig).pageNum
	};
	return (
		<>
			<TableContent
				style={{ marginTop: "10px" }}
				bordered={false}
				components={components}
				columns={getColumns}
				dataSource={dataSource}
				pagination={pagination ? ({...paginationConfig as ITablePaginationConfig}) : false}
				scroll={{
					x: scrollX
					// y: isNumber(cutHeight) ? height : cutHeight
				}}
				rowKey="id"
				
				{...others}
			/>
			{/* 隐藏的字符用于计算字符串的长度 */}
			<Text ref={span}></Text>
		</>
	);
});

export default BaseTable;
