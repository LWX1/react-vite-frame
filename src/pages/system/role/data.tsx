

import { formatTime } from "src/utils"

export const Columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
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
    name: 'name',
    label: '角色名称',
    required: true,
    search: true
  }
]