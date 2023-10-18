import { Tree, message } from "antd";
import { useEffect } from "react";
import api from "src/api";
import BaseModal from "src/components/baseModal";
import useReducer from "src/hooks/useReducer";

const DEFAULT_API = api.system.menu;
const DEFAULT_API_ROLE = api.system.role;

// 获取每个节点
const nodeObj: {
	[key: number]: number;
} = {};
// 格式化树节点
const formatTreeData = (data: any) => {
	return data.map((item: any) => {
		nodeObj[item.id] = item.parentId;
		if (item.children && item.children.length > 0) {
			return {
				key: item.id,
				title: item.name,
				children: formatTreeData(item.children),
			};
		}
		return {
			key: item.id,
			title: item.name,
			children: item.children,
		};
	});
};

// 获取所有的节点及其父节点
const getCurrentNode = (menuIds: Number[]) => {
	const result: Number[] = [];
	menuIds.forEach((item: any) => {
		result.push(item);
		let parent = nodeObj[item];
		while (parent) {
			result.push(parent);
			parent = nodeObj[parent];
		}
	});

	return Array.from(new Set(result));
};

const MenuAuth = (props: { id: number, visible: boolean, closeMenu: any, title: string }) => {
	const { id, visible, closeMenu, title } = props;
	const [state, dispatch] = useReducer({
		open: visible,
		treeData: [],
		checkedKeys: [],
	});
	const { open, checkedKeys, treeData } = state;

	useEffect(() => {
		getTreeNode();
	}, []);

	useEffect(() => {
		dispatch({
			open: visible
		})
		if (id && visible) {
			getCurrentTree();
		}
	}, [id, visible]);

	// 获取树节点
	const getTreeNode = () => {
		DEFAULT_API.getTree().then((res) => {
			if (res.code === 200) {
				dispatch({
					treeData: formatTreeData(res.data),
					
				});
			}
		});
	};

	// 获取当前树选择节点
	const getCurrentTree = () => {
		DEFAULT_API_ROLE.getTree({
			id,
		}).then((res) => {
			if (res.code === 200) {
				dispatch({
					checkedKeys: (res.data || []).filter((item:number) => nodeObj[item]),
				});
			}
		});
	};
	// 提交
	const submit = () => {
		const menuParentIds = getCurrentNode(checkedKeys);
		DEFAULT_API_ROLE.saveTree({
			id: id,
			menuIds: checkedKeys,
			menuParentIds,
		}).then((res) => {
			if (res.code === 200) {
				dispatch({
					checkedKeys: [],
				});
				message.success("授权成功");
				closeMenu()
			} else {
				message.error(res.msg);
			}
		});
	};
	
	// 选中
	const onCheck = (checkedKeys: any) => {
		dispatch({
			checkedKeys,
		});
	};
	return (
		<BaseModal
			open={open}
			title={title}
			onCancel={closeMenu}
			onOk={submit}
		>
			<Tree
				checkable
				defaultExpandAll={true}
				checkedKeys={checkedKeys}
				onCheck={onCheck}
				treeData={treeData}
			/>
		</BaseModal>
	);
};

export default MenuAuth;
