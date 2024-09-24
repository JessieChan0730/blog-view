import { Tags } from '@/api/tags'
import request from '@/utils/request'

const RECOMMEND_BASE_URL = '/api/front/article'
export class ArticleAPI {
  static getRecommendArticle () {
    return request<any, Article[]>({
      url: `${RECOMMEND_BASE_URL}/recommend/`,
      method: 'get',
    })
  }
}

export interface Article {
  id: number;
  title: string;
  content: string;
  intro: string;
  cover_url: string;
  recommend: boolean;
  category: Category;
  tags: Tags[];
  create_date: string;
  update_date: string;
}

export interface Category {
  id: number;
  name: string;
  display: boolean;
}
