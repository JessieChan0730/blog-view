import request from '@/utils/request'

const CATEGORY_BASE_API = '/api/front/category'
export class CategoryAPI {
  static getCategoryDetail (id:string | number) {
    return request<any, Category>({
      url: `${CATEGORY_BASE_API}/${id}`,
      method: 'get',
    })
  }
}
export interface Category {
  id: number;
  name: string;
  display: boolean;
}
