import dayjs from "dayjs";

// 格式化时间
export const formatTime = (
	time?: string | number | Date | dayjs.Dayjs | null | undefined
) => dayjs(time).format("YYYY-MM-DD HH:mm:ss");

// 根据value 获取label
export const getValueLabel = (dataList: any[], value: any) => {
	const result = dataList.find((item: { value: any; }) => item.value === value);
	return (result || {}).label
}