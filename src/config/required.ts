// 必填项配置
export const RequiredConfig = {
    // 密码
    passwordRequired: [
        { required: true, message: '输入密码!' },
        { min: 6, message: '最少为六位！'},
        { max: 20, message: '最多为二十位！'},
    ],
    // 账号
    accountRequired: [
        { required: true, message: '输入账号!' },
        { max: 20, message: '最多为二十位！'},
    ],
    // 验证码
    codeRequired: [
        { required: true, message: '输入验证码!' },
    ]
}


