import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'



/**
 * 获取图片验证码
 */

export const getcaptchas = () => '/common/code.jsp?' + Math.random();



/**
 * 发送演示测试
 */

export const sendTest = (called, caller, fileName, pathParam, codeNumber) => fetch('/manage/send_test.c', {
    called,
    caller,
    fileName,
    pathParam,
    codeNumber
}, 'POST');