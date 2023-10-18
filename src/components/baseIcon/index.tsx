import * as Icon from '@ant-design/icons';
import React from 'react';

export const AntdIcon: {[key: string]: any} = Icon;

const BaseIcon = (props: { icon: string; }) => {
    if(AntdIcon[props.icon])
        return React.createElement(AntdIcon[props.icon])
    return null;
}

export default BaseIcon;