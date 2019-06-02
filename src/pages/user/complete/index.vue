<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="nickname"
        clearable
        label="昵称"
        @change="onNicknameChange"
        placeholder="请输入昵称"></van-field>
      <van-field
        v-model="mobile"
        type="number"
        clearable
        label="手机号"
        @change="onMobileChange"
        placeholder="请输入手机号"></van-field>
      <van-field
        v-model="email"
        clearable
        label="邮箱"
        @change="onEmailChange"
        placeholder="请输入邮箱地址"></van-field>
      <van-field
        v-model="address"
        clearable
        label="地址"
        @change="onAddressChange"
        placeholder="请输入地址"></van-field>
    </van-cell-group>
    <van-button type="primary" size="large" @click="submit">提交</van-button>
  </div>
</template>
<script>
  import {request} from "@/utils/request";
  import {USER_URL_COMPLETE, USER_URL_ME} from "@/utils/api";

  export default {
    data() {
      return {
        nickname: '',
        mobile: '',
        email: '',
        address: ''
      }
    },
    methods: {
      onNicknameChange(event) {
        this.nickname = event.mp.detail;
      },
      onMobileChange(event) {
        this.mobile = event.mp.detail;
      },
      onEmailChange(event) {
        this.email = event.mp.detail;
      },
      onAddressChange(event) {
        this.address = event.mp.detail;
      },
      async getUserData() {
        let user = await request(
          USER_URL_ME,
          'GET',
          {}
        );
        this.nickname = user.nickname;
        this.mobile = user.mobile;
        this.email = user.email;
        this.address = user.address;
      },
      submit() {
        request(
          USER_URL_COMPLETE,
          'PUT',
          {
            nickname: this.nickname,
            mobile: this.mobile,
            email: this.email,
            address: this.address
          }
        ).then(res => {
          wx.showToast({
            title: '修改成功'
          })
        })
      }
    },
    onLoad() {
      this.getUserData();
    }
  }
</script>
