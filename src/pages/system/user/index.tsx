import { Button, FormInstance, TablePaginationConfig, message } from "antd";
import { useEffect, useMemo, useRef } from "react";
import api from "src/api";
import BaseTable from "src/components/baseTable";
import useReducer from "src/hooks/useReducer";
import { Columns, FormList } from "./data";
import BaseModal, { BaseDeleteConfirm } from "src/components/baseModal";
import { getValueLabel } from "src/utils";
import { PaginationConfig } from "src/config";
import BaseForm from "src/components/baseForm";
import BaseSearchForm from "src/components/baseSearchForm";

const DEFAULT_API = api.system.user;
const DEFAULT_API_ROLE = api.system.role

const UserManage = () => {
	const refForm = useRef<FormInstance>();
	const refSearchForm = useRef<FormInstance>();

	const [state, dispatch] = useReducer({
		userRoleList: [],
		dataSource: [],
		title: "",
		visible: false,
		detail: {},
		pagination: PaginationConfig
	});

	const { userRoleList, dataSource, title, visible, detail, pagination } = state;

	useEffect(() => {
		getRoleList();
		getDataList();
	}, []);

	const columns = useMemo(() => {
		return [
			{
				title: '角色',
				dataIndex: 'roleId',
				render: (_: any, record: any) => getValueLabel(userRoleList, record.roleId)
			  },
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
	}, [userRoleList]);

	const formList = useMemo(() => {
		return [
			
			...FormList,
			{
				type: 'Select',
				name: 'roleId',
				label: '角色',
				options: userRoleList
			}
		];
	}, [userRoleList]);

	
	// 获取所有的角色
	const getRoleList = () => {
		DEFAULT_API_ROLE.all().then((res) => {
		if (res.code === 200) {
			dispatch({
				userRoleList: (res.data || []).map((item: { name: string; id: number }) => ({
					label: item.name,
					value: item.id
				}))
			})
		}
		})
	}

	// 获取表格数据
	const getDataList = (params = {}, pageNum = pagination.pageNum, pageSize = pagination.pageSize) => {
		DEFAULT_API.list({
			...params,
			pageNum: pageNum,
			pageSize: pageSize 
		  }).then((res) => {
			if (res.code === 200) {
				dispatch({
					dataSource: res.data.list || [],
					pagination: {
						pageNum: res.data.pageNum,
						total: res.data.total,
						pageSize: res.data.pageSize
					}
				})
			  
			}
		  })
	};
	// 提交
	const submitModalForm = () => {
		refForm.current!.validateFields().then((values) => {
			if (detail.id) {
				// 修改
				DEFAULT_API.update(detail.id, values).then((res) => {
					if (res.code === 200) {
						dispatch({
							detail: {},
							visible: false,
						});
						getDataList();
						message.success("修改成功");
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
						getDataList();
						message.success("新增成功");
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
					title: "修改",
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
						getDataList();
						message.success("删除成功");
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

	// 更改页码
	const changePage = (pagination: TablePaginationConfig) => {
		const {current, pageSize} = pagination;
		getDataList({}, current, pageSize)
	}


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
			<BaseSearchForm
				ref={refSearchForm}
				formList={formList}
				onOk={getDataList}
				onCancel={getDataList}
			/>
			<BaseTable
				columns={columns}
				dataSource={dataSource}
				pagination={pagination}
				onChange={changePage}
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

export default UserManage;
