<template>
  <div>
    <official-account></official-account>
    <van-tabs v-model="active">
      <van-tab title="发现">
        <van-notice-bar :text="notice.content"></van-notice-bar>
        <van-search placeholder="请输入关键词" @change="onChange"/>
        <ul>
          <li v-for="(share,index) in shares" :key="index">
            <Card :share="share" :key="index"></Card>
          </li>
        </ul>
      </van-tab>
      <van-tab title="使用说明">
        <div class="shuoming">
          <p>资源均为免费，兑换后即可查看下载地址；点击<span>我的 -> 我的兑换</span>，即可查看、下载兑换过的资源。</p>
          <h3>积分获得方式</h3>
          <ul>
            <li> > 每日签到</li>
            <li> > 投稿</li>
            <li> > 转发</li>
            <li> > 提建议、意见（尚未完成）</li>
          </ul>
          <h3>深入交流</h3>
          <ul>
            <li> > 技术交流群QQ群：731548893</li>
            <li> > 技术交流微信群：加我微信，注明加微信群</li>
            <li> > 私人微信：jumping_me
              <van-button type="primary" size="mini" @click="doCopyMe">复制</van-button>
            </li>
          </ul>
          <h3>公众号(技术干货分享)</h3>
          <div>
            由于小程序不支持二维码识别，亲们可使用如下方式关注我的公众号：
          </div>
          <ul>
            <li> > 点击<span>右上角 -> 关于IT牧场 -> 相关公众号</span>即可关注，操作简单，只需5秒！</li>
            <li> > 公众号微信：itmuch_com
              <van-button type="danger" size="mini" @click="doCopyGZH">复制</van-button>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import Card from '@/components/card.vue';
  import {request} from "@/utils/request";
  import {BASE_API_URL, NOTICE_URL, SHARE_POST_URL} from "@/utils/api";

  export default {
    components: {
      Card
    },
    data() {
      return {
        notice: '',
        shares: '',
        more: true,
        pageNo: 1,
        searchWord: '',
        title: ''
      }
    },
    methods: {
      async onChange(event) {
        this.title = event.mp.detail;
        this.fetchSharePosts(true);
      },
      async findAllNotices() {
        this.notice = await request(
          NOTICE_URL,
          'GET',
          {}
        );
      },
      async fetchSharePosts(init) {
        if (init) {
          this.pageNo = 1;
          this.more = true;
        }
        wx.showNavigationBarLoading();
        let title = this.title;
        const sharesRemote = await request(
          SHARE_POST_URL + '/q',
          'GET',
          {
            pageNo: this.pageNo,
            title: title
          }
        );
        if (sharesRemote.list.length < 10 && this.pageNo > 0) {
          this.more = false;
          console.log(this.more)
        }
        if (init) {
          this.shares = sharesRemote.list;
          wx.stopPullDownRefresh();
        } else {
          // 下拉刷新，不能直接覆盖books 而是累加
          this.shares = this.shares.concat(sharesRemote.list)
        }
        wx.hideNavigationBarLoading();
      },
      doCopyMe: function () {
        wx.setClipboardData({
          data: 'jumping_me',
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log(res);
              }
            })
          }
        })
      },
      doCopyGZH: function () {
        wx.setClipboardData({
          data: 'itmuch_com',
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
    onReachBottom() {
      // 没有更多了
      if (!this.more) {
        return false
      }
      this.pageNo = this.pageNo + 1
      this.fetchSharePosts()
    },
    onPullDownRefresh() {
      this.fetchSharePosts(true);
    },
    mounted() {
      this.findAllNotices();
    },
    onShow() {
      this.fetchSharePosts(true);
    }
  }
</script>
<style lang="scss" scoped>
  .shuoming {
    padding: 15px;
    font-size: 14px;
    span {
      font-weight: bold;
    }
    h3 {
      font-size: 16px;
      line-height: 32px;
      font-weight: bold;
    }
    ul {
      margin: 0 10px 0 10px;
      li {
      }
    }
  }
</style>
