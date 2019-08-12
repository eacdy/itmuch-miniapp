<template>
  <div>
    <div v-if="!user" class="user-no-login">
      <IconHeadNoLogin></IconHeadNoLogin>
      <van-button type="danger" size="large" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        微信登录
      </van-button>
    </div>
    <div v-if="user">
      <IconHead :user="user"></IconHead>
      <van-cell title="我的兑换" is-link @click="jumpToPostList"/>
      <van-cell title="积分明细" is-link @click="jumpToBonusLogDetails"/>
      <van-cell title="我的投稿" is-link @click="jumpToContributionDetails"/>
      <!--<van-cell title="完善信息" is-link @click="jumpToUserComplete"/>-->

    </div>
  </div>
</template>
<script>
  import {request} from "@/utils/request";
  import {LOGIN_URL, USER_URL_ME} from "@/utils/api";
  import IconHead from '@/components/icon-head';
  import IconHeadNoLogin from '@/components/icon-head-nologin';

  export default {
    components: {
      IconHead,
      IconHeadNoLogin
    },
    data() {
      return {
        user: null
      }
    },
    methods: {
      bindGetUserInfo(e) {
        if (e.mp.detail.rawData) {
          //用户按了允许授权按钮
          this.login(e);
        } else {
          //用户按了拒绝按钮
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none'
          })
        }
      },
      login(e) {
        const self = this;
        let userInfo = e.mp.detail.userInfo;
        // 登录
        wx.login({
          success: (res) => {
            request(
              LOGIN_URL,
              'POST', {
                code: res.code,
                wxNickname: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
              }
            ).then(res => {
              console.log('登录成功...', res);
              wx.setStorageSync('token', res.token);
              wx.setStorageSync('user', res.user);
              console.log('user...', res.user);
              wx.showToast({
                title: '登录成功！'
              });
              console.log('user...', res.user);
              self.user = res.user;
            }).catch(error => {
              console.log('error', error);
              reject(error)
            });
          }
        });
      },
      async getUser() {
        let user = await request(
          USER_URL_ME,
          'GET',
          {}
        );
        wx.setStorageSync('user', user);
        this.user = user;
      },
      jumpToPostList() {
        wx.navigateTo({
          url: '/pages/user/post-list/main'
        });
      },
      jumpToUserComplete() {
        wx.navigateTo({
          url: `/pages/user/complete/main`
        });
      },
      jumpToBonusLogDetails() {
        wx.navigateTo({
          url: `/pages/user/bonus-log/main`
        });
      },
      jumpToContributionDetails() {
        wx.navigateTo({
          url: `/pages/user/contribution/main`
        });
      }
    },
    onShow() {
      // 参考：https://github.com/flytam/mpvue-cnode/blob/master/src/pages/me/index.vue
      let token = wx.getStorageSync('token');
      console.log('token', token);
      console.log('token过期判断', token.expirationTime - new Date().getTime());
      // 如果token不存在，并且token未过期
      if (token && token.expirationTime - new Date().getTime() > 0) {
        this.getUser();
      }
      // token不存在，或者token过期，直接清理storage
      else {
        wx.clearStorage();
        this.user = null;
      }

    },
    created() {
      let user = wx.getStorageSync('user');
      if (user) {
        this.user = user;
        console.log('user', user);
      }
    }
  }
  // 登录页参考：https://github.com/JAWZHX/GuGuBookFriendFrontEnd/blob/master/src/pages/me/index.vue
  // https://github.com/342450024/mpvue-demo/blob/master/src/pages/me/me.vue
  // https://github.com/kuan1/kuan-mpvue/blob/master/src/pages/test/index.vue
</script>
<style scoped>
  .user-no-login {
    margin-top: 90px;
  }
</style>
