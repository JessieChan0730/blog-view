import { Category } from '@/api/category'
import { Pagination } from '@/api/pagination'
import { Tags } from '@/api/tags'
import request from '@/utils/request'

const ARTICLE_BASE_URL = '/api/front/article'
export class ArticleAPI {
  static getRecommendArticle () {
    return request<any, Article[]>({
      url: `${ARTICLE_BASE_URL}/recommend/`,
      method: 'get',
    })
  }

  static getArticles (params?: ArticleParams) {
    return request<any, Pagination<Article>>({
      url: `${ARTICLE_BASE_URL}/`,
      method: 'get',
      params,
    })
  }

  static viewArticle (id:number | string) {
    return request< any, Article>({
      url: `${ARTICLE_BASE_URL}/${id}`,
      method: 'get',
    })
  }
}

export interface ArticleParams {
  category?:number;
  search?:string;
  page?:string | number;
  ordering?:string;
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
