<script setup lang="ts">
</script>

<template>
  <div class="w-full container my-8">
    <v-row class="mb-2" no-gutters>
      <v-col>
        <h3>发表评论</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-textarea counter hide-details label="请输入评论的内容" max-rows="3" />
    </v-row>
    <v-row class="px-0 mx-0">
      <v-col :lg="4">
        <v-text-field
          density="compact"
          label="请输入昵称"
          prepend-inner-icon="mdi-account"
          variant="outlined"
        />
      </v-col>
      <v-col :lg="4">
        <v-text-field
          density="compact"
          label="请输入头像链接"
          prepend-inner-icon="mdi-camera"
          variant="outlined"
        />
      </v-col>
      <v-col :lg="4">
        <v-text-field
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
        <v-switch density="default" hide-details label="订阅回复" />
      </v-col>
      <v-col :lg="2">
        <v-btn color="blue-darken-4" density="default">发送评论</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <h3>评论列表 | 共 300 条评论</h3>
    </v-row>
    <v-divider />
    <v-list class="comments">
      <v-list-item class="mb-2 comment">
        <v-row no-gutters>
          <v-col :lg="1" :md="1">
            <v-avatar
              size="42px"
            >
              <v-img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              />
            </v-avatar>
          </v-col>
          <v-col :lg="11" :md="11">
            <v-row class="d-flex align-center" no-gutters>
              <v-col class="d-flex align-center">
                <h4 class="nickname mr-2">Kiage1111</h4>
                <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <span class="text-sm-body-1 text-grey-darken-3">
                  测试 qq 名称
                </span>
              </v-col>
            </v-row>
            <v-row class="mt-1" no-gutters>
              <v-col>
                <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-list class="replyComments">
          <v-row class="bg-grey-lighten-4 mb-2 py-1" no-gutters>
            <v-col :lg="1" :md="1" />
            <v-col :lg="11" :md="11">
              <v-row no-gutters>
                <v-col :lg="1" :md="1">
                  <v-avatar
                    size="42px"
                  >
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-col>
                <v-col :lg="11" :md="11">
                  <v-row class="d-flex align-center" no-gutters>
                    <v-col class="d-flex align-center">
                      <h4 class="nickname mr-2">Kiage1111</h4>
                      <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span class="text-sm-body-1 text-grey-darken-3">
                        测试 qq 名称
                      </span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1" no-gutters>
                    <v-col>
                      <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="bg-grey-lighten-4 mb-2 py-1" no-gutters>
            <v-col :lg="1" :md="1" />
            <v-col :lg="11" :md="11">
              <v-row no-gutters>
                <v-col :lg="1" :md="1">
                  <v-avatar
                    size="42px"
                  >
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-col>
                <v-col :lg="11" :md="11">
                  <v-row class="d-flex align-center" no-gutters>
                    <v-col class="d-flex align-center">
                      <h4 class="nickname mr-2">Kiage1111</h4>
                      <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span class="text-sm-body-1 text-grey-darken-3">
                        @23232 测试 qq 名称
                      </span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1" no-gutters>
                    <v-col>
                      <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list>
        <v-row class="mb-2" no-gutters>
          <v-col>
            <h3>发表评论</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-textarea counter hide-details label="请输入评论的内容" max-rows="3" />
        </v-row>
        <v-row class="px-0 mx-0">
          <v-col :lg="4">
            <v-text-field
              density="compact"
              label="请输入昵称"
              prepend-inner-icon="mdi-account"
              variant="outlined"
            />
          </v-col>
          <v-col :lg="4">
            <v-text-field
              density="compact"
              label="请输入头像链接"
              prepend-inner-icon="mdi-camera"
              variant="outlined"
            />
          </v-col>
          <v-col :lg="4">
            <v-text-field
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
            <v-switch density="default" hide-details label="订阅回复" />
          </v-col>
          <v-col :lg="2">
            <v-btn color="blue-darken-4" density="default">发送评论</v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item class="mb-2 comment">
        <v-row no-gutters>
          <v-col :lg="1" :md="1">
            <v-avatar
              size="42px"
            >
              <v-img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              />
            </v-avatar>
          </v-col>
          <v-col :lg="11" :md="11">
            <v-row class="d-flex align-center" no-gutters>
              <v-col class="d-flex align-center">
                <h4 class="nickname mr-2">Kiage1111</h4>
                <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <span class="text-sm-body-1 text-grey-darken-3">
                  测试 qq 名称
                </span>
              </v-col>
            </v-row>
            <v-row class="mt-1" no-gutters>
              <v-col>
                <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-list class="replyComments">
          <v-row class="bg-grey-lighten-4 mb-2 py-1" no-gutters>
            <v-col :lg="1" :md="1" />
            <v-col :lg="11" :md="11">
              <v-row no-gutters>
                <v-col :lg="1" :md="1">
                  <v-avatar
                    size="42px"
                  >
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-col>
                <v-col :lg="11" :md="11">
                  <v-row class="d-flex align-center" no-gutters>
                    <v-col class="d-flex align-center">
                      <h4 class="nickname mr-2">Kiage1111</h4>
                      <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span class="text-sm-body-1 text-grey-darken-3">
                        测试 qq 名称
                      </span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1" no-gutters>
                    <v-col>
                      <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="bg-grey-lighten-4 mb-2 py-1" no-gutters>
            <v-col :lg="1" :md="1" />
            <v-col :lg="11" :md="11">
              <v-row no-gutters>
                <v-col :lg="1" :md="1">
                  <v-avatar
                    size="42px"
                  >
                    <v-img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-col>
                <v-col :lg="11" :md="11">
                  <v-row class="d-flex align-center" no-gutters>
                    <v-col class="d-flex align-center">
                      <h4 class="nickname mr-2">Kiage1111</h4>
                      <span class="datetime text-sm-body-2 text-grey-darken-1 mr-5">2024-09-11 19:31</span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span class="text-sm-body-1 text-grey-darken-3">
                        @23232 测试 qq 名称
                      </span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1" no-gutters>
                    <v-col>
                      <v-btn color="blue-darken-4" size="x-small">回复</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-list>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 0 10px;
}
</style>
