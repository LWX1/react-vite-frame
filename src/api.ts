import { get, post, del } from './utils/axios'

const prefix = '/api'

const api = {
  login: {
    // 获取验证码
    getCode: () => get(`${prefix}/code`),
    // 登录
    doLogin: (params: any) => post(`${prefix}/login`, params),
    // 获取token
    profile: () => get(`${prefix}/profile`)
  },
  // 系统管理
  system: {
    user: {
      // 获取用户
      list: (params:any) => get(`${prefix}/user`, params),
      // 获取所有的角色
      all: (params:any) => get(`${prefix}/user/all/list`, params),
      // 创建用户
      insert: (params: any) => post(`${prefix}/user`, params),
      // 更新用户
      update: (id: number, params: any) => post(`${prefix}/user/${id}`, params),
      // 删除用户
      delete: (id: number) => del(`${prefix}/user/${id}`),
      // 获取用户详情
      detail: (id: number) => get(`${prefix}/user/${id}`),
      // 批量删除用户
      deleteList: () => post(`${prefix}/user/delete/list`),
    },
    menu: {
      // 获取菜单
      list: () => get(`${prefix}/menu`, ),
      // 创建菜单
      insert: (params: any) => post(`${prefix}/menu`, params),
      // 更新菜单
      update: (id: number, params: any) => post(`${prefix}/menu/${id}`, params),
      // 删除菜单
      delete: (id: number) => del(`${prefix}/menu/${id}`),
      // 获取菜单详情
      detail: (id: number) => get(`${prefix}/menu/${id}`),
      // 批量删除菜单
      deleteList: () => post(`${prefix}/menu/delete/list`),
      // 获取菜单树
      getTree: () => get(`${prefix}/menu/tree/list`),
      // 获取权限菜单树
      getAuthTree: () => get(`${prefix}/menu/role/tree/list`),
    },
    role: {
      // 获取角色
      list: (params:any) => get(`${prefix}/role`, params),
      // 获取所有的角色
      all: () => get(`${prefix}/role/all/list`),
      // 创建角色
      insert: (params: any) => post(`${prefix}/role`, params),
      // 更新角色
      update: (id: number, params: any) => post(`${prefix}/role/${id}`, params),
      // 删除角色
      delete: (id: number) => del(`${prefix}/role/${id}`),
      // 获取角色详情
      detail: (id: number) => get(`${prefix}/role/${id}`),
      // 批量删除角色
      deleteList: () => post(`${prefix}/role/delete/list`),
      // 获取角色树
      getTree: (params:any) => get(`${prefix}/role/tree/list`, params),
      // 保存结构树
      saveTree: (params:any) => post(`${prefix}/role/tree/save`, params)
    }
  },
 
}

export default api
