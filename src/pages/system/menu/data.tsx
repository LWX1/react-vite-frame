
import React from "react"
import BaseIcon, { AntdIcon } from "src/components/baseIcon"
import { IconList, MenuType } from "src/config/selected"
import { LayoutRouterComponentList, RouterComponentList } from "src/router/allRouters"
import { formatTime, getValueLabel } from "src/utils"

export const Columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      render: (_: any, record: any) => getValueLabel(MenuType, record.type)
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      render: (_: any, record: any) => <BaseIcon icon={record.icon}/> 
    },
    {
      title: '菜单路径',
      dataIndex: 'url',
    },
    {
      title: '布局组件',
      dataIndex: 'layout',
      render: (_: any, record: any) => getValueLabel(LayoutRouterComponentList, record.layout)
    },
    {
      title: '组件',
      dataIndex: 'componentPath',
      render: (_: any, record: any) => getValueLabel(RouterComponentList, record.componentPath)
    },
    {
      title: '顺序',
      dataIndex: 'sort'
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
      label: '菜单名字',
      required: true
    },
    {
      type: 'Select',
      name: 'type',
      label: '类型',
      options: MenuType,
      required: true
    },
    {
      type: 'Input',
      name: 'url',
      label: '菜单路径',
      required: true
    },
    {
      type: 'Select',
      name: 'icon',
      label: '菜单图标',
      options: IconList.map((item) => {
        return {
          label: React.createElement(AntdIcon[item.label]),
          value: item.label,
        }
      })
    },
    {
      type: 'Select',
      name: 'layout',
      label: '布局组件',
      options: LayoutRouterComponentList,
    },
    {
      type: 'Select',
      name: 'componentPath',
      label: '组件',
      options: RouterComponentList,
    },
    {
      type: 'Input',
      name: 'sort',
      label: '排序',
    },
  ]