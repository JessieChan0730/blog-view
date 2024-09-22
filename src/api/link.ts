import request from '@/utils/request'

const LINK_BASE_API = '/api/front/link/'
const STATEMENT_BASE_API = '/api/front/statement/show/'

export class LinkAPI {
  static getAllLinks () {
    return request<any, LinksVo[]>({
      url: `${LINK_BASE_API}`,
      method: 'get',
    })
  }

  static applyLinks (form:LinksForm) {
    return request<any, LinksVo>({
      url: `${LINK_BASE_API}`,
      method: 'post',
      data: form,
    })
  }
}

export class StatementAPI {
  static getAllStatements () {
    return request<any, Statement>({
      url: `${STATEMENT_BASE_API}`,
      method: 'get',
    })
  }
}

export interface LinksVo{
  id: number;
  name:string;
  intro:string;
  link:string;
  avatar:string;
}

export interface LinksForm {
  name:string,
  intro:string,
  link:string,
  avatar:string,
  email: string
}

export interface Statement{
  statement:string
}
