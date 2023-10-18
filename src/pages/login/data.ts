export const FormList = [
    {
        type: "input",
        label: "账号",
        name: "username",
        rules: [
          { required: true, message: "请输入账号" },
          { max: 10, message: "不能超过10个字" },
        ],
    },
    {
        type: "input",
        label: "密码",
        name: "password",
        rules: [
          { required: true, message: "请输入密码" },
          { min: 6, message: "至少为6位数" },
          { max: 20, message: "至多为20位数" },
        ],
    },
]