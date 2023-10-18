import {
	Button,
	Dropdown,
	FormInstance,
	Space,
	TablePaginationConfig,
	message,
} from "antd";
import { useEffect, useMemo, useRef } from "react";
import api from "src/api";
import BaseTable from "src/components/baseTable";
import useReducer from "src/hooks/useReducer";
import { Columns, FormList } from "./data";
import BaseModal, {
	BaseDeleteConfirm,
	BaseInfo,
} from "src/components/baseModal";
import { PaginationConfig } from "src/config";
import { SmallDashOutlined } from "@ant-design/icons";
import MenuAuth from "./components/MenuAuth";
import BaseForm from "src/components/baseForm";
import BaseSearchForm from "src/components/baseSearchForm";
import BaseTag, { ColorList } from "src/components/baseTag";

const DEFAULT_API = api.system.role;
const DEFAULT_User_API = api.system.user;

const colorLen = ColorList.length;

const UserListComponent = (props: any) => {
	const { dataList } = props;
	return (
		<Space
			size={[0, 8]}
			wrap={true}
		>
			{(dataList || []).map((item: any, index: number) => (
				<BaseTag
					key={item.id}
					color={ColorList[index % colorLen]}
				>
					{item.username}
				</BaseTag>
			))}
		</Space>
	);
};

const RoleManage = () => {
	const refForm = useRef<FormInstance>();
	const refSearchForm = useRef<FormInstance>();

	const [state, dispatch] = useReducer({
		dataSource: [],
		title: "",
		visible: false,
		detail: {},
		pagination: PaginationConfig,
		roleId: 0,
		menuVisible: false,
	});

	const {
		dataSource,
		title,
		visible,
		detail,
		pagination,
		menuVisible,
		roleId,
	} = state;

	useEffect(() => {
		getDataList();
	}, []);

	const menuList = useMemo(() => {
		return [
			{
				key: "1",
				label: <span className="edit">菜单授权</span>,
			},
			{
				key: "2",
				label: <span className="edit">用户列表</span>,
			},
		];
	}, []);

	// 操作
	const getMenuAction = (key: string, record: any) => {
		// console.log(record)
		switch (key) {
			case "1":
				dispatch({
					menuVisible: true,
					roleId: record.id,
					title: "菜单授权",
				});
				break;
			case "2":
				DEFAULT_User_API.all({
					roleId: record.id,
				}).then((res) => {
					if (res.code === 200) {
						if (res.data.length) {
							BaseInfo({
								title: "用户列表",
								content: (
									<UserListComponent dataList={res.data} />
								),
								icon: <></>,
								okText: "关闭",
								okButtonProps: {
									type: "default",
								},
							});
						} else {
							message.warning("暂无用户");
						}
					}
				});
				break;
		}
	};

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
							<Dropdown
								menu={{
									items: menuList,
									onClick: ({ key }) => {
										getMenuAction(key, record);
									},
								}}
							>
								<SmallDashOutlined />
							</Dropdown>
						</div>
					);
				},
			},
		];
	}, []);

	const formList = useMemo(() => {
		return FormList;
	}, []);

	// 获取表格数据
	const getDataList = (
		params = {},
		pageNum = pagination.pageNum,
		pageSize = pagination.pageSize
	) => {
		DEFAULT_API.list({
			...params,
			pageNum: pageNum,
			pageSize: pageSize,
		}).then((res) => {
			if (res.code === 200) {
				dispatch({
					dataSource: res.data.list || [],
					pagination: {
						pageNum: res.data.pageNum,
						total: res.data.total,
						pageSize: res.data.pageSize,
					},
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
	};

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

	// 关闭用户授权
	const closeMenu = () => {
		dispatch({
			menuVisible: false,
		});
	};

	// 更改页码
	const changePage = (pagination: TablePaginationConfig) => {
		const { current, pageSize } = pagination;
		getDataList({}, current, pageSize);
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
			<MenuAuth
				id={roleId}
				visible={menuVisible}
				closeMenu={closeMenu}
				title={title}
			/>
		</>
	);
};

export default RoleManage;
