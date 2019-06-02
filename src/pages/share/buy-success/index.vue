<template>

  <div>
    <van-panel :title="share.title" :desc="share.downloadUrl"></van-panel>
    <van-button type="primary" size="large" @click="doCopy">复制下载地址</van-button>

  </div>

</template>
<script>
  import {request} from "@/utils/request";
  import {SHARE_POST_URL} from "@/utils/api";

  export default {
    data() {
      return {
        share: '',
        id: ''
      }
    },
    methods: {
      async fetchSharePostById() {
        let id = this.id;
        this.share = await request(
          SHARE_POST_URL + `/${id}`,
          'GET',
          {}
        );
      },
      doCopy: function () {
        wx.setClipboardData({
          data: this.share.downloadUrl,
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log(res);
              }
            })
          }
        })
      }
    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      console.log('buy-success', this.id);
      this.fetchSharePostById();
    }
  }
</script>
