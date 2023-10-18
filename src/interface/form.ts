interface IFormItem {
    type: string;
    name: string;
}

export interface IForm {
    onOk?: React.MouseEventHandler<HTMLElement> | undefined;
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    formList: IFormItem[];
    cancelText?: string;
    okText?: string;
    isFooter?: boolean;
}