import { ResultEnum } from '@/enums/ResultEnum'
import { Toast } from '@/utils/toast'
import axios, { AxiosResponse } from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (
      response.config.responseType === 'blob' ||
      response.config.responseType === 'arraybuffer'
    ) {
      return response
    }
    // 判断是否有响应数据
    if (response.data) {
      const { code, data } = response.data
      if (code === ResultEnum.SUCCESS || code === ResultEnum.CREATE) {
        return data
      }
    } else if (response.status === ResultEnum.NOT_CONtTENT) {
      // ElMessage.success('删除成功')
      Toast.success('删除成功')
      // 结束
    } else {
      Toast.error('系统出错')
      return Promise.reject(new Error('系统出错'))
    }
  },
  (error: any) => {
    // 异常处理
    // 登录信息过期
    if (error.response.data) {
      const { code, msg, exps } = error.response.data
      if (code === ResultEnum.TOKEN_INVALID) {
        Toast.info(exps.detail)
        return
      } else if (code === ResultEnum.BAD_REQUEST) {
        const { exps } = error.response.data
        showBadRequestErrorMessage(exps)
        return
      } else if (code === ResultEnum.ERROR) {
        Toast.error('服务器出错，请联系管理员')
        return
      } else if (code === ResultEnum.ALLOW_REQUEST) {
        Toast.error('请求方法不被允许')
        // 结束
        return
      } else {
        Toast.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  }
)

function showBadRequestErrorMessage (fields: any) {
  const firstKey = Object.keys(fields as Object)[0]
  const message = fields?.[firstKey][0]
  Toast.error(`${firstKey}:${message}`)
}

// 导出 axios 实例
export default service
