<template>
  <div>
    <ul>
      <li v-for="(share,index) in shares" :key="index">
        <CardBought :share="share" :key="index"></CardBought>
      </li>
    </ul>
  </div>
</template>
<script>
  import CardBought from '@/components/card-bought.vue';
  import {request} from "@/utils/request";
  import {SHARE_POST_URL} from "@/utils/api";

  export default {
    components: {
      CardBought
    },
    data() {
      return {shares: null}
    },
    methods: {
      async fetchPostsByUser() {
        let shares = await request(
          SHARE_POST_URL + '/user',
          'GET',
          {}
        );
        if (!shares || shares.length === 0) {
          wx.showModal({
            title: '提示',
            content: '您的兑换列表为空',
            showCancel: false
          });
        }
        this.shares = shares;
      }
    },
    mounted() {
      this.fetchPostsByUser();
    }
  }
</script>
