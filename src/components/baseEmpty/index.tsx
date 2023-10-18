import { Empty, Spin } from 'antd';

const BaseEmpty = (props: { [x: string]: any; dataList?: any; children?: any; loading?: any; }) => {
    const {dataList,children,loading, ...others} = props;
    if(loading) {
        return <Spin size='large' spinning={loading} style={{position: 'fixed', top: "50%", left: '50%', transform: "translate(-50%, -50%)"}}/>
    }
    if(dataList && dataList.length) {
        return children;
    }
    return <Empty {...others}/>
}

export default BaseEmpty;
