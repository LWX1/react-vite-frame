import { TablePaginationConfig, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table/interface";

export interface ITable extends TableProps<object>{
    cutHeight?: number | string;
    columns: ColumnsType<object>
}

export interface ITablePaginationConfig extends TablePaginationConfig {
    pageNum: number
}