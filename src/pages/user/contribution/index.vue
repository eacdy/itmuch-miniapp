<template>
  <div>
    <ul>
      <li v-for="(contribution,index) in contributions" :key="index">
        <van-cell
          icon="records"
          :title="contribution.title"
          :value="contribution.auditStatus"
          :label="contribution.reason"
          is-link
          size="large"
          title-width="70%"
          @click="jumpToPreview(contribution)">
        </van-cell>
      </li>
    </ul>
  </div>
</template>
<script>
  import {request} from "@/utils/request";
  import {USER_MY_CONTRIBUTION_URL} from "@/utils/api";

  export default {
    components: {},
    data() {
      return {
        contributions: ''
      }
    },
    methods: {
      jumpToPreview(contribution) {
        if (contribution.auditStatus === '审核通过') {
          wx.navigateTo({
            url: `/pages/share/preview/main?id=${contribution.id}`
          });
        }
        // 审核不通过/待审核 跳转到编辑页
        else {
          wx.navigateTo({
            url: `/pages/share/contribute-edit/main?id=${contribution.id}`
          });
        }
      }
    },
    async onShow() {
      let contributions = await request(
        USER_MY_CONTRIBUTION_URL,
        'GET',
        {}
      );
      this.contributions = contributions.map(function (item) {
        let res = {};
        if (item.auditStatus === 'NOT_YET') {
          res.auditStatus = '待审核';
        } else if (item.auditStatus === 'PASS') {
          res.auditStatus = '审核通过';
        } else if (item.auditStatus === 'REJECT') {
          res.auditStatus = '审核不通过';
        }
        res.title = item.title;
        res.reason = item.reason;
        res.id = item.id;
        return res;
      })
    }
  }
</script>
