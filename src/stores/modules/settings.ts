import { FrontSetting, SettingsAPI } from '@/api/settings'
import { FRONT_SETTING_KEY } from '@/enums/CacheEnum'
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
      if (
        localStorage.getItem(FRONT_SETTING_KEY) &&
        localStorage.getItem(FRONT_SETTING_KEY)?.trim() !== '' &&
        localStorage.getItem(FRONT_SETTING_KEY)?.trim() !== 'undefined'
      ) {
        const frontSettingsObj = JSON.parse(
          localStorage.getItem(FRONT_SETTING_KEY) as string
        ) as FrontSetting
        Object.assign(frontSetting, { ...frontSettingsObj })
        resolve(frontSettingsObj)
      } else {
        SettingsAPI.getSettings()
          .then(data => {
            Object.assign(frontSetting, { ...data })
            const frontSettingJSON = JSON.stringify(data)
            localStorage.setItem(FRONT_SETTING_KEY, frontSettingJSON)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      }
    })
  }

  async function refresh () {
    localStorage.removeItem(FRONT_SETTING_KEY)
    await get()
  }

  return {
    frontSetting,
    get,
    refresh,
  }
})
