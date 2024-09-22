<script setup lang="ts">
  import { LinkAPI, LinksForm, LinksVo, StatementAPI } from '@/api/link'
  import { Toast } from '@/utils/toast'
  import { Ref } from 'vue'

  const links = ref<LinksVo[]>([])
  const statement = ref('')
  const valid = ref(false)
  const form = ref()
  const linkForm = reactive<LinksForm>({
    name: '',
    avatar: '',
    intro: '',
    link: '',
    email: '',
  })
  // 表单验证规则
  const rules = reactive<any>({
    nameRules: [
      value => {
        if (value) return true
        return '必须填写网站名'
      },
      value => {
        if (value?.length <= 50) return true
        return '网站名最长为50'
      },
    ],
    emailRules: [
      value => {
        if (value) return true
        return '必须填写邮箱'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true
        return '邮箱格式错误'
      },
    ],
    introRules: [
      value => {
        if (value) return true
        return '必须填写网站简介'
      },
      value => {
        if (value?.length <= 120) return true
        return '网站简介最长为120'
      },
    ],
    urlRules: [
      value => {
        if (value) return true
        return '必须填写链接'
      },
      value => {
        if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(value)) return true
        return '链接格式错误'
      },
    ],
  })

  onMounted(async () => {
    const resLinks = await LinkAPI.getAllLinks()
    const resStatement = await StatementAPI.getAllStatements()
    if (resLinks && resLinks.length > 0) {
      links.value.push(...resLinks)
    }
    if (resStatement) {
      statement.value = resStatement.statement
    }
  })

  // 随机颜色函数
  const getRandomColor = () => {
    const colors = ['red', 'pink', 'red', 'green', 'blue', 'purple', 'indigo', 'teal', 'deep-orange', 'black', 'orange']
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
  // 重置表单
  const resetForm = () => {
    linkForm.link = ''
    linkForm.email = ''
    linkForm.intro = ''
    linkForm.name = ''
    linkForm.avatar = ''
  }
  // 提交表单
  const commit = async (form:any, isActive:Ref<boolean>) => {
    if (!form) return
    const { valid } = await form.validate()
    if (valid) {
      const response = await LinkAPI.applyLinks(linkForm)
      if (response) {
        Toast.success('提交成功,请等待审核')
        isActive.value = false
        resetForm()
      }
    } else {
      Toast.error('表单验证失败')
    }
  }
  // 跳转到其他人的博客中
  const skip = (link:string) => {
    window.location.href = link
  }
</script>

<template>
  <Container>
    <template #default>
      <v-card class="w-100">
        <v-card-item class="d-flex justify-center align-center">
          <v-card-title>
            小伙伴们
          </v-card-title>
        </v-card-item>
        <v-divider class="mb-2" />
        <v-card-item>
          <v-row>
            <v-col
              v-for="link in links"
              :key="link.id"
              :cols="12"
              :lg="4"
              md="4"
              sm="6"
              @click="skip(link.link)"
            >
              <v-card :color="getRandomColor()" hover>
                <v-card-item class="d-flex flex-row justify-center align-center">
                  <v-img height="80" rounded="circle" :src="link.avatar" width="80" />
                </v-card-item>
                <v-card-item>
                  <div>
                    <div class="text-h6 text-center mb-1">
                      {{ link.name }}
                    </div>
                    <div class="text-caption text-center text-ellipsis">{{ link.intro }}</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider class="mb-2" color="#00b5ad" opacity="100" :thickness="2" />
        <v-card-item>
          <div class="apply d-flex flex-row justify-end align-center text-cyan-lighten-1">
            <v-dialog max-width="500">
              <template #activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" prepend-icon="$plus" variant="text">
                  加入友链
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card title="申请友情链接">
                  <v-form ref="form" v-model="valid" class="px-5">
                    <v-row>
                      <v-text-field
                        v-model="linkForm.name"
                        :counter="50"
                        label="网站名"
                        required
                        :rules="rules.nameRules"
                      />
                    </v-row>
                    <v-row>
                      <v-text-field v-model="linkForm.avatar" label="网站头像（url）" :rules="rules.urlRules" />
                    </v-row>
                    <v-row>
                      <v-text-field v-model="linkForm.link" label="网站链接" :rules="rules.urlRules" />
                    </v-row>
                    <v-row>
                      <v-text-field v-model="linkForm.email" label="用户邮箱" :rules="rules.emailRules" />
                    </v-row>
                    <v-row>
                      <v-textarea v-model="linkForm.intro" :counter="120" label="网站简介" :rules="rules.introRules" />
                    </v-row>
                  </v-form>
                  <v-card-text>
                    请按照描述的表单规则填写信息，提交审核后完毕即可上线友链列表
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="grey-lighten-2"
                      text="关闭"
                      variant="flat"
                      @click="isActive.value = false"
                    />
                    <v-btn
                      color="indigo-darken-3"
                      text="提交"
                      type="submit"
                      variant="flat"
                      @click="commit(form,isActive)"
                    />

                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
          <div v-if="statement" v-dompurify-html="statement" v-highlight class="statement" />
        </v-card-item>
        <v-divider color="#00b5ad" opacity="100" :thickness="2" />
      </v-card>
    </template>
  </Container>
</template>

<style scoped lang="scss">
.rounded-circle {
  border-radius: 50%;
  overflow: hidden; /* 确保图片不会溢出圆形边界 */
  /* 可以根据需要添加更多样式，比如宽度、高度等 */
  width: 100px; /* 或者其他你需要的尺寸 */
  height: 100px; /* 保持宽高一致以形成完美的圆形 */
}

.text-ellipsis {
  width: 100%; /* 或者其他固定宽度，根据需要设置 */
  white-space: nowrap; /* 保持文本在一行显示 */
  overflow: hidden; /* 隐藏超出容器的部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
.statement{
  line-height: 1.8rem;
  padding: 0 1.5rem;
}
</style>
