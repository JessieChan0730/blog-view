import { Pagination } from '@/api/pagination'
import request from '@/utils/request'

const COMMENTS_BASE_URL = '/api/front/comments'

export class CommentsAPI {
  static getComments (params?: CommentsParams) {
    return request<any, Pagination<CommentsVo>>({
      url: `${COMMENTS_BASE_URL}/`,
      method: 'get',
      params,
    })
  }

  static publishComments (data: CommentsForms) {
    return request<any, Pagination<CommentsVo>>({
      url: `${COMMENTS_BASE_URL}/publish/`,
      method: 'post',
      data,
    })
  }

  static getCommentsTotal (articleId: number) {
    return request<any, TotalVo>({
      url: `${COMMENTS_BASE_URL}/total/`,
      method: 'get',
      params: {
        article_id: articleId,
      },
    })
  }
}

export interface CommentsVo {
  id: number;
  article_pk: number;
  nickname: string;
  avatar: string;
  content: string;
  notification: boolean;
  parent_comment: number | null;
  parent_comment_nickname: string | null;
  admin_comment: boolean;
  create_time: string;
  reply_comments: CommentsVo[];
}

export interface CommentsParams {
  article_pk: number;
  page: number;
}

export interface CommentsForms {
  article_pk: number;
  nickname: string;
  avatar: string;
  email: string;
  content: string;
  parent_comment: number | null;
  notification: boolean;
}

export interface TotalVo {
  total: number;
}
