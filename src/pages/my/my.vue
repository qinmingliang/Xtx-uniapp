<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'
const memberStore = useMemberStore()
const getData = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite: 1,
    },
  })
  console.log(res, 'res数据')
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123456',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData" size="mini" plain type="warn">发送消息</button>
  </view>
</template>

<style lang="scss">
//
</style>
