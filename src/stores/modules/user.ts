import { User, UserAPI } from '@/api/user'
import { isInitialState } from '@/utils/tools'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    nickname: '',
    signature: '',
    avatar: '',
    more_info: {
      hobby: [],
      media: {
        github: '',
        csdn: '',
        tiktok: '',
        bilibili: '',
      },
    },
  })

  const get = async () => {
    // 检查当前内存中是否有缓存
    if (!isInitialState(user)) {
      return user
    } else {
      const response = await UserAPI.getUserInfo()
      if (response) {
        Object.assign(user, { ...response })
      }
      return user
    }
  }
  return {
    get,
  }
})
