<template>
  <div class='header'>
    <img :src='user.avatarUrl' class='img'>
    <span class=span>{{user.nickname}}</span>
    <span class="span" v-model="user.bonus">积分:{{user.bonus}}</span>
    <span class="span">
      <van-button size="mini" type="primary" @click="sign">签到</van-button>
      <!--&nbsp; &nbsp;-->
      <!--<van-button size="mini" type="danger" open-type='share'>转发</van-button>-->
    </span>
  </div>
</template>
<script>
  import {request} from "@/utils/request";
  import {SIGN_URL} from "@/utils/api";

  export default {
    props: {
      user: Object
    },
    methods: {
      async sign() {
        let user = await request(
          SIGN_URL,
          'GET',
          {}
        );
        this.user = user;
        wx.setStorageSync('user', user);

        wx.showToast({
          title: '签到成功！'
        })
      }
    }
  };
</script>
<style lang='scss' scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    background-color: white;
    margin-bottom: 30px;
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 15px;
    }
    .span {
      margin-top: 10px;
    }
  }
</style>
