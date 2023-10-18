

import { UserStatus } from "src/config/selected"
import { formatTime, getValueLabel } from "src/utils"

export const Columns = [
  {
    title: '用户名称',
    dataIndex: 'username'
  },
 
  {
    title: '状态',
    dataIndex: 'status',
    render: (_: any, record: any) => getValueLabel(UserStatus, record.status)
    
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    render: (_: any,record: any) => formatTime(record.updateTime)
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (_: any,record: any) => formatTime(record.createTime)
  },
  
]

export const FormList = [
  {
    type: 'Input',
    name: 'username',
    label: '用户名称',
    required: true,
    search: true,
  },
  {
    type: 'Select',
    name: 'status',
    label: '状态',
    options: UserStatus,
    required: true,
    search: true,
  },

]