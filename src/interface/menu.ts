// 定义接口菜单
export interface IMenu{
	createTime?: string;
	id?: number;
	name: string;
	parentId?: number;
	updateTime?: string;
	url?: string;
	children?: Array<IMenu>;
    componentPath?: string;
    layout?: string;
    redirect?: string;
	icon?:string;
	type?:number;
}

// 定义aside数据
export interface IAside {
    name: string;
    path: string;
    children?: Array<IAside>;
}