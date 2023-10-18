import { Button, FormInstance, message } from "antd";
import { useEffect, useMemo, useRef } from "react";
import api from "src/api";
import BaseTable from "src/components/baseTable";
import useReducer from "src/hooks/useReducer";
import { Columns, FormList } from "./data";
import BaseModal, { BaseDeleteConfirm } from "src/components/baseModal";
import { publishChangeMenuList } from "src/utils/getRouterData";
import BaseForm from "src/components/baseForm";

const DEFAULT_API = api.system.menu;

// 格式化树节点
const formatTreeData = (data: any) => {
	return data.map((item: any) => {
		if (item.children && item.children.length > 0) {
			return {
				id: item.id,
				value: item.id,
				label: item.name,
				children: formatTreeData(item.children),
			};
		}
		return {
			id: item.id,
			value: item.id,
			label: item.name,
			children: item.children,
		};
	});
};

const MenuManage = () => {
	const refForm = useRef<FormInstance>();

	const [state, dispatch] = useReducer({
		treeData: [],
		dataSource: [],
		title: "",
		visible: false,
		detail: {},
	});

	const { treeData, dataSource, title, visible, detail } = state;

	useEffect(() => {
		getTreeNode();
	}, []);

	const columns = useMemo(() => {
		return [
			...Columns,
			{
				title: "操作",
				dataIndex: "action",
				render: (_: any, record: any) => {
					return (
						<div className="btn-list">
							<span
								onClick={() => {
									editData(record);
								}}
								className="edit"
							>
	
								修改
							</span>
							<span
								onClick={() => {
									removeData(record);
								}}
								className="delete"
							>
								删除
							</span>
						</div>
					);
				},
			},
		];
	}, []);

	const formList = useMemo(() => {
		return [
			{
				type: "TreeSelect",
				name: "parentId",
				label: "父级菜单",
				required: true,
				options: [
					{
						id: 0,
						value: 0,
						label: "顶级菜单",
						children: treeData,
					},
				],
			},
			...FormList,
		];
	}, [treeData]);

	// 获取树节点
	const getTreeNode = () => {
		DEFAULT_API.getTree().then((res) => {
			if (res.code === 200) {
				dispatch({
					dataSource: res.data,
					treeData: formatTreeData(res.data),
				});
			}
		});
	};
	// 提交
	const submitModalForm = () => {
		refForm.current!.validateFields().then((values) => {
			if (detail.id) {
				// 修改
				DEFAULT_API.update(detail.id, values).then((res) => {
					if (res.code === 200) {
						// visible.value = false;
						dispatch({
							detail: {},
							visible: false,
						});
						getTreeNode();
						message.success("修改成功");
						publishChangeMenuList();
					} else {
						message.error(res.msg);
					}
				});
			} else {
				// 新增
				DEFAULT_API.insert(values).then((res) => {
					if (res.code === 200) {
						dispatch({
							detail: {},
							visible: false,
						});
						getTreeNode();
						message.success("新增成功");
						publishChangeMenuList();
					} else {
						message.error(res.msg);
					}
				});
			}
		});
	};

	// 关闭
	const close = () => {
		
		dispatch({
			visible: false,
		});
	};

	// 打开或者关闭弹框
	const changModal = (bool: Boolean) => {
		if (bool === true) {
			refForm.current?.setFieldsValue(detail);
		} else {
			refForm.current?.resetFields();
		}
	}

	/********* 新增、修改、删除 */
	const editData = (values: any) => {
		DEFAULT_API.detail(values.id).then((res) => {
			if (res.code === 200) {
				dispatch({
					title: "修改菜单",
					visible: true,
					detail: res.data,
				});
				
			} else {
				message.error(res.msg);
			}
		});
	};

	const removeData = (values: any) => {
		BaseDeleteConfirm({
			onOk: () => {
				DEFAULT_API.delete(values.id).then((res: any) => {
					if (res.code === 200) {
						getTreeNode();
						message.success("删除成功");
						publishChangeMenuList();
					} else {
						message.error(res.msg);
					}
				});
			},
		});
	};

	const addData = () => {
		dispatch({
			title: "新增",
			visible: true,
			detail: {},
		});
	};
	return (
		<>
			<div className="flex-end">
				<Button
					type="primary"
					onClick={addData}
				>
					新增
				</Button>
			</div>
			<BaseTable
				columns={columns}
				dataSource={dataSource}
				pagination={false}
			/>
			<BaseModal
				open={visible}
				title={title}
				onCancel={close}
				onOk={submitModalForm}
				afterOpenChange={changModal}
			>
				<BaseForm
					ref={refForm}
					formList={formList}
					isFooter={false}
				/>
			</BaseModal>
		</>
	);
};

export default MenuManage;
