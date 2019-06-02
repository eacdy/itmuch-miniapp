<template>
  <div>
    <ul>
      <!--exchange ：BUY-->
      <!--sign : SIGN-->
      <!--share： FORWARD-->
      <!--records：contribute-->
      <li v-for="(bonusLog,index) in bonusLogs" :key="index">
        <van-cell
          :icon="bonusLog.icon"
          :title="bonusLog.createTime + ' - ' + bonusLog.title"
          :value="bonusLog.value"
          :label="bonusLog.description"
          size="large"
          title-width="70%">
        </van-cell>
      </li>
    </ul>
  </div>
</template>
<script>
  import {request} from "@/utils/request";
  import {USER_BONUS_LOG_URL} from "@/utils/api";

  export default {
    components: {},
    data() {
      return {
        bonusLogs: ''
      }
    },
    methods: {},
    async onShow() {
      let bonusLogs = await request(
        USER_BONUS_LOG_URL,
        'GET',
        {}
      );
      this.bonusLogs = bonusLogs.map(function (item) {
        let res = {};
        if (item.event === 'BUY') {
          res.icon = 'exchange';
          res.title = '兑换';
        }
        else if (item.event === 'SIGN') {
          res.icon = 'sign';
          res.title = '签到';
        }
        else if (item.event === 'CONTRIBUTE') {
          res.icon = 'records';
          res.title = '投稿';
        }
        else if (item.event === 'FORWARD') {
          res.icon = 'share';
          res.title = '转发';
        }
        res.value = item.value;
        res.createTime = item.createTime;

        let description = item.description;
        if (description && description.length > 25) {
          res.description = description.substring(0, 25) + '...';
        }
        return res;
      })
    }
  }
</script>
