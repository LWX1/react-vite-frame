import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import api from "src/api";

const CodeComponent = forwardRef((_, ref) => {
	const [svgTemplate, setSvgTemplate] = useState("");

    useImperativeHandle(ref, () => {
        return {
            getCode
        }
    })

	const getCode = () => {
		api.login.getCode().then((res: any) => {
			setSvgTemplate(res);
		});
	};

	useEffect(() => {
		getCode();
	}, []);

	return (
		<div
			className="code-box flex-between cursor"
			onClick={getCode}
			dangerouslySetInnerHTML={{
				__html: svgTemplate,
			}}
		></div>
	);
});

export default CodeComponent;
