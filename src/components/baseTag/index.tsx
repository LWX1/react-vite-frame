import { Tag } from "antd";
import { ReactNode } from "react";

export const ColorList = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
    'processing',
    'success',
    'error',
    'warning',
]

const BaseTag = (props: { color: string, children: ReactNode }) => {
	const { color, children, ...othres } = props;
	return (
		<Tag
			color={color}
			{...othres}
		>
			{children}
		</Tag>
	);
};

export default BaseTag;
