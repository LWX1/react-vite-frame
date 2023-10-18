import { Modal } from "antd";
import { IModalFuncProps, IModalProps } from "src/interface/modal";

const Confirm = Modal.confirm;
const Info = Modal.info;

const ModalConfig = {
    styles: {
        body: {
            maxHeight: 'calc(70vh - 80px)',
            overflow: 'auto'
        }
    }
}

const BaseModal = (props: IModalProps) => {
	return <Modal styles={ModalConfig.styles} {...props}>{props.children}</Modal>;
};

export const BaseConfirm = (props: IModalFuncProps) => {
	Confirm(props);
};

export const BaseInfo = (props: IModalFuncProps) => {
	Info(props);
};

export const BaseDeleteConfirm = (props: IModalFuncProps) => {
    Confirm({
        title: "删除",
        content: "是否确定删除？",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        ...props,
    });
};

export default BaseModal;
