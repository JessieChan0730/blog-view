import request from '@/utils/request'
const TAGS_BASE_URL = '/api/front/tag'
export class TagsAPI {
  static getAllTags () {
    return request<any, Tags[]>({
      url: `${TAGS_BASE_URL}/`,
      method: 'get',
    })
  }
}
export interface Tags {
  id: number;
  name: string;
  color: string;
}
