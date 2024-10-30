<script setup lang="ts">
  import { CommentsAPI, CommentsForms, CommentsParams, CommentsVo } from '@/api/comments'
  import { Pagination } from '@/api/pagination'
  import { useScroll } from '@/hooks/scroll'
  import { useFrontSettings } from '@/stores/modules/settings'
  import { formattedTimeDisplay } from '@/utils'
  import { Toast } from '@/utils/toast'
  import { useDisplay } from 'vuetify'
  const frontSetting = useFrontSettings()
  // 接收文章Id
  const props = defineProps({
    articleId: {
      type: Number,
      required: true,
    },
  })
  const { mobile } = useDisplay()
  // 当前分页
  const page = ref<number>(1)
  // 回复框显示的位置
  const replyIndex = ref<number>(0)
  // 回复框回复的用户名
  const replyNickName = ref('')
  // 回复框回复的ID
  const replyId = ref<number | null>(null)
  const commentsPagination = reactive<Pagination<CommentsVo>>({
    count: 1,
    next: '',
    previous: '',
    results: [],
  })
  const commentsForms = reactive<CommentsForms>({
    article_pk: 0,
    nickname: '',
    avatar: '',
    email: '',
    content: '',
    parent_comment: null,
    notification: true,
  })

  onMounted(async () => {
    commentsForms.article_pk = props.articleId
    await loadComments({
      page: 1,
      article_pk: props.articleId,
    })
  })

  const comments_length = computed(() => {
    return flattenReplyComments(commentsPagination.results).length
  })
  const page_length = computed(() => {
    return Math.ceil(commentsPagination.count / Number(frontSetting.frontSetting.comments.page_size.value))
  })

  watch(() => page.value, async () => {
    await loadComments({
      page: page.value,
      article_pk: props.articleId,
    })
    if (mobile.value) {
      useScroll(0)
    } else {
      useScroll(1014)
    }
  })

  const loadComments = async (params?: CommentsParams) => {
    const response = await CommentsAPI.getComments(params)
    if (response) {
      Object.assign(commentsPagination, response)
    }
  }
  // 重设表单
  const resetForm = () => {
    commentsForms.nickname = ''
    commentsForms.content = ''
    commentsForms.avatar = ''
    commentsForms.email = ''
  }
  // 扁平化评论
  const flattenReplyComments = (comments:CommentsVo[]) => {
    const result:CommentsVo[] = []

    function flatten (arr:CommentsVo[]) {
      arr.forEach(comment => {
        result.push(comment) // 将当前层的评论添加到结果数组中
        if (comment.reply_comments && comment.reply_comments.length > 0) {
          // 如果当前评论有回复评论，则递归调用 flatten 函数
          flatten(comment.reply_comments)
        }
      })
    }

    flatten(comments) // 从最外层的 comments 开始递归
    return result
  }

  const reply = (index:number, id:number | null, nickname?:string) => {
    resetForm()
    replyIndex.value = index
    replyId.value = id
    // 将回复的ID赋予给表单
    commentsForms.parent_comment = id
    if (nickname) {
      replyNickName.value = nickname
    }
  }
  const cancelReply = () => {
    replyIndex.value = 0
    replyNickName.value = ''
    replyId.value = null
    // 将回复的ID清空
    commentsForms.parent_comment = null
  }

  const publish = async () => {
    const response = await CommentsAPI.publishComments(commentsForms)
    if (response) {
      await loadComments({
        page: page.value,
        article_pk: props.articleId,
      })
      resetForm()
    } else {
      Toast.error('发表评论失败，请联系管理员')
    }
  }
</script>

<template>
  <div class="w-full container my-8">
    <div v-show="replyIndex === 0" class="reply_input">
      <v-row class="mb-2" no-gutters>
        <v-col>
          <h3>发表评论</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          v-model="commentsForms.content"
          counter
          hide-details
          label="请输入评论的内容"
          max-rows="3"
        />
      </v-row>
      <v-row class="px-0 mx-0">
        <v-col :lg="4">
          <v-text-field
            v-model="commentsForms.nickname"
            density="compact"
            label="请输入昵称"
            prepend-inner-icon="mdi-account"
            variant="outlined"
          />
        </v-col>
        <v-col :lg="4">
          <v-text-field
            v-model="commentsForms.avatar"
            density="compact"
            label="请输入头像链接"
            prepend-inner-icon="mdi-camera"
            variant="outlined"
          />
        </v-col>
        <v-col :lg="4">
          <v-text-field
            v-model="commentsForms.email"
            density="compact"
            label="请输入邮箱"
            prepend-inner-icon="mdi-email"
            variant="outlined"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex align-center py-0 my-0" no-gutters>
        <v-spacer />
        <v-col :lg="3">
          <v-switch
            v-model="commentsForms.notification"
            color="primary"
            density="default"
            hide-details
            label="订阅回复"
          />
        </v-col>
        <v-col :lg="2">
          <v-btn color="blue-darken-4" density="default" @click="publish">发送评论</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-row no-gutters>
      <h3 v-show="comments_length > 0">评论列表 | 共 {{ comments_length }} 条评论</h3>
    </v-row>
    <v-divider />
    <v-empty-state
      v-show="comments_length === 0"
      icon="mdi-magnify"
      text="赶紧来抢占沙发吧"
      title="暂无评论"
    />
    <v-list class="comments">
      <v-list-item v-for="comment in commentsPagination.results" :key="comment.id" class="mb-2 comment">
        <v-row no-gutters>
          <v-col :lg="1" :md="1">
            <v-avatar
              size="42px"
            >
              <v-img
                :alt="comment.nickname"
                :src="comment.avatar"
              />
            </v-avatar>
          </v-col>
          <v-col :lg="11" :md="11">
            <v-row class="d-flex align-center" no-gutters>
              <v-col class="d-flex align-center">
                <h4 class="nickname mr-2">{{ comment.nickname }}{{ comment.admin_comment ? '（作者）' : '' }}</h4>
                <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">{{ formattedTimeDisplay(comment.create_time) }}</span>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <span class="text-sm-body-1 text-grey-darken-3">
                  {{ comment.content }}
                </span>
              </v-col>
            </v-row>
            <v-row class="mt-1" no-gutters>
              <v-col>
                <v-btn v-if="replyId === comment.id" color="blue-darken-4" size="x-small" @click="cancelReply">取消回复</v-btn>
                <v-btn v-else color="blue-darken-4" size="x-small" @click="reply(comment.id,comment.id,comment.nickname)">回复</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--子评论-->
        <v-list class="replyComments">
          <v-list-item v-for="replyComment in flattenReplyComments(comment.reply_comments)" :key="replyComment.id">
            <v-row class="bg-grey-lighten-4 border py-2 px-2" no-gutters>
              <v-col :lg="12" :md="11">
                <v-row no-gutters>
                  <v-col :lg="1" :md="1">
                    <v-avatar
                      size="42px"
                    >
                      <v-img
                        :alt="replyComment.nickname"
                        :src="replyComment.avatar"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col :lg="11" :md="11">
                    <v-row class="d-flex align-center" no-gutters>
                      <v-col class="d-flex align-center">
                        <h4 class="nickname mr-2">{{ replyComment.nickname }}</h4>
                        <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">{{ formattedTimeDisplay(replyComment.create_time) }}</span>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col>
                        <span class="text-sm-body-1 text-grey-darken-3">
                          @{{ replyComment.parent_comment_nickname }}：{{ replyComment.content }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row class="mt-1" no-gutters>
                      <v-col>
                        <v-btn v-if="replyId === replyComment.id" color="blue-darken-4" size="x-small" @click="cancelReply">取消回复</v-btn>
                        <v-btn v-else color="blue-darken-4" size="x-small" @click="reply(comment.id,replyComment.id,replyComment.nickname)">回复</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
        <!-- 评论 -->
        <div v-show="replyIndex === comment.id" class="reply_input">
          <v-row class="mb-2" no-gutters>
            <v-col>
              <h3>发表评论：@{{ replyNickName }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              v-model="commentsForms.content"
              counter
              hide-details
              label="请输入评论的内容"
              max-rows="3"
            />
          </v-row>
          <v-row class="px-0 mx-0">
            <v-col :lg="4">
              <v-text-field
                v-model="commentsForms.nickname"
                density="compact"
                label="请输入昵称"
                prepend-inner-icon="mdi-account"
                variant="outlined"
              />
            </v-col>
            <v-col :lg="4">
              <v-text-field
                v-model="commentsForms.avatar"
                density="compact"
                label="请输入头像链接"
                prepend-inner-icon="mdi-camera"
                variant="outlined"
              />
            </v-col>
            <v-col :lg="4">
              <v-text-field
                v-model="commentsForms.email"
                density="compact"
                label="请输入邮箱"
                prepend-inner-icon="mdi-email"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row class="d-flex align-center py-0 my-0" no-gutters>
            <v-spacer />
            <v-col :lg="3">
              <v-switch
                v-model="commentsForms.notification"
                color="primary"
                density="default"
                hide-details
                label="订阅回复"
              />
            </v-col>
            <v-col :lg="2">
              <v-btn color="blue-darken-4" density="default" @click="publish">发送评论</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-list-item>
    </v-list>
    <v-pagination
      v-show="comments_length > 0"
      v-model="page"
      class="mx-auto"
      :length="page_length"
      total-visible="5"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 0 10px;
}
</style>
