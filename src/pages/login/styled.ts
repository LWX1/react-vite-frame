import styled, { css } from "styled-components";
import Bg from 'src/assets/img/login-bg.png';
import { Input } from "antd";

const BackgroundColor = '#3f789fc4';

export const LoginStyle = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${Bg});
    background-size: auto 100%;
    color: #fff;
    justify-content: center;
    .login-type {
        text-align: center;
        margin-bottom: 24px;
        justify-content: space-evenly;
        height: 30px;
        line-height: 30px;
        >span {
            flex: 1;
            background-color: ${BackgroundColor};
            &.active {
                background-color: #1890ff;
            }
            &:first-child {
                border-radius: 20px 0 0 20px;
            }
            &:last-child {
                border-radius: 0 20px 20px 0;
            }
        }
    }
    .code-box {
        >svg {
            height: 24px;
        }
    }
`;

const publicStyle = css`
    border-radius: 20px;
    background: ${BackgroundColor} !important;
    .ant-input-prefix,.ant-input-suffix span {
        color: #fff;
    }
    input {
        background: transparent;
        color: #fff;
        &:focus {
            background: transparent;
        }
        &:-webkit-autofill {
            -webkit-text-fill-color: #fff;
            -webkit-background-clip: text;
        }
        
    }
`

export const LoginBoxStyle = styled.div`
    /* background-color: #fff; */
    padding: 12px;
    /* border-radius: 10px; */
    /* box-shadow: rgb(29 28 28) 5px 5px 6px, rgb(29 28 28) -5px -5px 6px; */
    .password {
        background: ${BackgroundColor};
        border: none;
        ${publicStyle}
    }
`;

export const InputStyle = styled(Input)`
    background: ${BackgroundColor};
    border: none;
    ${publicStyle}
`