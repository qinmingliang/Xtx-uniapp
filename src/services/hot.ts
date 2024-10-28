// import type { BannerItem } from '@/types/hot'
import type { PagePramas, PageResult } from '@/types/global'
import { http } from '@/utils/http'
// & 交叉类型
type HotParams = PagePramas & {
  subType: string
}
/**
 *
 * @param url  接口地址
 * @param data  接口参数
 */
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http({
    method: 'GET',
    url,
    data,
  })
}
