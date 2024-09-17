export type BannerItem = {
  id: 'string'
  hrefUrl: 'string'
  imgUrl: 'string'
  type: 'string'
}

export type CategoryItem = {
  id: 'string'
  name: 'string'
  icon: 'string'
}

export type HotMutliItem = {
  id: 'string'
  alt: 'string'
  target: 'string'
  title: 'string'
  type: 'string'
  pictures: Array<string>
}

export type GuessLikeItem = {
  id: 'string'
  name: 'string'
  desc: 'string'
  price: number
  picture: 'string'
  discount: number
  orderNum: number
}
