import request from '@/utils/request'

const SITE_INFO_BASE_URL = '/api/front/siteinfo'
export class SiteInfoAPI {
  static getSiteInfo () {
    return request<any, SiteInfo>({
      url: `${SITE_INFO_BASE_URL}/view/`,
      method: 'get',
    })
  }
}

export interface SiteInfo {
  title: string;
  content: string;
}
