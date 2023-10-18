import { Anchor } from "antd";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
const { Link } = Anchor;

const AnchorItem = (props: { dataList: any; }) => {
	const { dataList } = props;
	return dataList.map((item: { href: any; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; children: any; }) => (
		<Link href={`#${item.href}`} title={item.title} key={item.href + item.title}>
			{item.children && <AnchorItem dataList={item.children} />}
		</Link>
	));
};

const BaseAnchor = (props: { [x: string]: any; dataList?: never[] | undefined; }) => {
	const { dataList = [], ...others } = props;
	return (
		<Anchor
			showInkInFixed={true}
			onClick={(e, link) => {
				e.preventDefault();
				const scroll = document.querySelector(link.href) as Element;
				scroll.scrollIntoView({
					block: "start",
					behavior: "smooth"
				});
			}}
			{...others}>
			<AnchorItem dataList={dataList} />
		</Anchor>
	);
};

export default BaseAnchor;
