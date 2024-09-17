import type { BannerItem, CategoryItem, HotMutliItem, GuessLikeItem } from '@/types/home'
import type { PagePramas, PageResult } from '@/types/global.d'
import { http } from '@/utils/http'

/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
/**
 * 首页-前台分类-小程序
 *
 */
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
    data: {},
  })
}
/**
 * 首页-热门推荐-小程序
 *
 */
export const getHomeHotMutliAPI = () => {
  return http<HotMutliItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
    data: {},
  })
}
/**
 * 猜你喜欢-小程序
 *
 */
export const getGuessLikeAPI = (data?: PagePramas) => {
  return http<PageResult<GuessLikeItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
