
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { SpinStyle } from "./styled";

const BaseIframe = forwardRef((props:any, ref) => {
	const { ifraneProps, src, ...others } = props;
	const { style } = ifraneProps || {};
	const refIframe = useRef<HTMLIFrameElement>();
	const [loading, setLoading] = useState(true);
	useImperativeHandle(ref, () => {
		return {
			dom: refIframe.current
		};
	});
	useEffect(() => {
		setLoading(true);
		if (src) {
			(refIframe.current as HTMLIFrameElement).onload = () => {
				setLoading(false);
			};
		}
	}, [src]);
	return (
		<>
			{loading && <SpinStyle wrapperClassName={`my-base-spin ${loading ? "loading" : ""}`} {...(others || {})} spinning={loading} size="large"></SpinStyle>}
			<iframe id="mapIframe" ref={refIframe} {...(ifraneProps || {})} src={src} style={{ ...style, visibility: loading ? "hidden" : "visible" }} />
		</>
	);
});

export default BaseIframe;
