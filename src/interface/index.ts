// 定义接口返回值类型
export interface IResponse<T> {
    code: number;
    data: T;
    message: string;
    timestamp: string;
}

// 定义对象
export interface IObject<T> {
    [key: string]: T;
}

