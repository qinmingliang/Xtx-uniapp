<script setup lang="ts">
import {
  getHomeBannerAPI,
  getHomeCategoryAPI,
  getHomeHotMutliAPI,
  getGuessLikeAPI,
} from '@/services/home'
import type { BannerItem, CategoryItem, HotMutliItem, GuessLikeItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeletion from './components/PageSkeletion.vue'
import { onLoad } from '@dcloudio/uni-app'
import { nextTick, onMounted, ref } from 'vue'

const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotMutliList = ref<HotMutliItem[]>([])
const xtxGuessRef = ref<XtxGuessInstance>()
const getHomeBanner = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

const getHomeCategory = async () => {
  const res = await getHomeCategoryAPI()
  return new Promise((resolve, reject) => {
    categoryList.value = res.result
    resolve(res.result)
  })
}
const getHomeHotMutli = async () => {
  const res = await getHomeHotMutliAPI()
  return new Promise((resolve, reject) => {
    hotMutliList.value = res.result
    resolve(res.result)
  })
}

const scrollTop = ref<number>()
const updatesafeAreaInsets = (val: number) => {
  scrollTop.value = val
}
// 上拉加载
const scrolltolower = () => {
  setTimeout(() => {
    xtxGuessRef.value?.getMore()
  }, 300)
}
const isTriggered = ref<boolean>(false)
const isLoading = ref<boolean>(false)
// 下拉刷新
const onRefresherrefresh = async () => {
  isTriggered.value = true
  await Promise.all([
    getHomeBanner(),
    getHomeCategory(),
    getHomeHotMutli(),
    xtxGuessRef.value?.initData(),
  ])
  isTriggered.value = false
}
onLoad(() => {
  isLoading.value = true
  nextTick(async () => {
    await Promise.all([
      getHomeBanner(),
      getHomeCategory(),
      getHomeHotMutli(),
      xtxGuessRef.value?.initData(),
    ])
    isLoading.value = false
  })
})
onMounted(() => {})
</script>

<template>
  <view class="viewport">
    <CustomNavbar @updatesafeAreaInsets="updatesafeAreaInsets" />
    <scroll-view
      enable-back-to-top
      :scroll-y="true"
      :refresher-triggered="isTriggered"
      :scroll-top="scrollTop"
      refresher-enabled
      @scrolltolower="scrolltolower"
      @refresherrefresh="onRefresherrefresh"
    >
      <PageSkeletion v-if="isLoading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :list="categoryList" />
        <HotPanel :list="hotMutliList" />
        <XtxGuess ref="xtxGuessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
