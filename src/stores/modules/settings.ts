import { FrontSetting, SettingsAPI } from '@/api/settings'
import { defineStore } from 'pinia'

export const useFrontSettings = defineStore('frontSetting', () => {
  const frontSetting = reactive<FrontSetting>(<FrontSetting>{
    website_title: {
      id: 0,
      value: '',
    },
    website_cover: {
      id: 0,
      value: '',
    },
    record_info: {
      id: 0,
      value: '',
    },
    copyright: {
      id: 0,
      value: '',
    },
    category: {
      visible_max_num: {
        id: 0,
        value: '',
      },
    },
    tags: {
      quote_max_num: {
        id: 0,
        value: '',
      },
    },
    blog: {
      page_size: {
        id: 0,
        value: '',
      },
      max_page_size: {
        id: 0,
        value: '',
      },
      recommend_max_num: {
        id: 0,
        value: '',
      },
    },
  })

  function get () {
    return new Promise<FrontSetting>((resolve, reject) => {
      SettingsAPI.getSettings()
        .then(data => {
          Object.assign(frontSetting, { ...data })
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  async function refresh () {
    await get()
  }

  return {
    frontSetting,
    get,
    refresh,
  }
})
