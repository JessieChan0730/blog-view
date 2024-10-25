import request from '@/utils/request'

const SETTING_BASE_URL = '/api/settings/front'
export class SettingsAPI {
  static getSettings () {
    return request<any, FrontSetting>({
      url: `${SETTING_BASE_URL}/`,
      method: 'get',
    })
  }
}
export interface FrontSetting {
  website_title: Setting;
  website_cover: Setting;
  record_info: Setting;
  copyright: Setting;
  category: FrontCategorySettings;
  tags: FrontTagsSettings;
  blog: FrontBlogSettings;
  photo_wall: PaginationSetting;
  comments: PaginationSetting;
}

export interface Setting {
  id: number;
  value: string;
}

export interface FrontCategorySettings {
  visible_max_num: Setting;
}

export interface FrontTagsSettings {
  quote_max_num: Setting;
}

export interface FrontBlogSettings extends PaginationSetting {
  recommend_max_num: Setting;
}

export interface PaginationSetting {
  page_size: Setting;
  max_page_size: Setting;
}
