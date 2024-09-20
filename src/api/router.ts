import request from '@/utils/request'

export class DynamicRouter {
  static getRouter (path:string) {
    return request<any, any>({
      url: path,
      method: 'get',
    })
  }
}
