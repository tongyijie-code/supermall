import {request} from './request'
//请求详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
// 请求推荐数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, service) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;

    this.columns = columns;
    this.service = service;
    this.realPrice = itemInfo.lowNowPrice
  }
}
export class Shopper {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.goods = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}
export class GoodsParem {
  constructor(info, rule) {
    //images可能没有值
    this.image = info.image? info.image: ''
    this.infos = info.set;
    if (rule){
      this.sizes = rule.tables;
    }

  }
}

