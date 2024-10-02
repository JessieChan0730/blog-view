import { Pagination } from '@/api/pagination'
import request from '@/utils/request'

const PHOTO_WALL_BASE_API = '/api/front/photos/'
export class PhotosAPI {
  static getPhotos (page?:number) {
    return request<any, Pagination<PhotoWall>>({
      url: `${PHOTO_WALL_BASE_API}`,
      method: 'get',
      params: {
        page,
      },
    })
  }
}

export interface PhotoWall {
  id: number;
  image: string;
  description: string;
}
