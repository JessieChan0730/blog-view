import request from '@/utils/request'
const USER_BASE_API = '/api/front/user'

export class UserAPI {
  static getUserInfo () {
    return request<any, User>({
      url: `${USER_BASE_API}/info/`,
      method: 'get',
    })
  }
}
export interface User {
  nickname: string;
  signature: string;
  avatar: string;
  more_info: {
    hobby: Hobby[],
    media: Media
}
}

export interface Hobby {
  name:string;
  detail:string;
}

export interface Media {
  csdn:string;
  github:string;
  tiktok:string;
  bilibili:string;
}
