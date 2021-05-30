import request from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据
    detail: {},
    // 是否收藏
    isCollect: false
  },
  goods_id: "",
  // 商品详情
  shopDetail: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goods_id = options.goods_id
    this.getShopDetail()
  },
  getShopDetail () {
    request({
      url: "/goods/detail?goods_id=" + this.goods_id
    }).then(res => {
      this.shopDetail = res.message
      // 获取缓存中的商品收藏数组
      let collect = wx.getStorageSync('collect') || []
      let isCollect = collect.some(item => item.goods_id == this.shopDetail.goods_id)
      this.setData({
        detail: {
          pics: res.message.pics,
          goods_price: res.message.goods_price,
          goods_name: res.message.goods_name,
          // 处理web格式图片在iphone部分机型不显示
          goods_introduce: res.message.goods_introduce
        },
        isCollect
      })
    })
  },
  // 收藏
  handleCollect () {
    let isCollect = false
    // 判断里面有没被收藏过
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(item => item.goods_id == this.shopDetail.goods_id)
    if (index == -1) { // 没被收藏过
      collect.push(this.shopDetail)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    } else { // 已被收藏过
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  // 图片放大
  handlePrevewImage (e) {
    let imageList = this.data.detail.pics.map(item => item.pics_mid)
    // console.log(e)
    let urlImage = e.currentTarget.dataset.url
    wx.previewImage({
      urls: imageList,
      current: urlImage
    })
  },
  // 加入购物车
  handleCartAdd () {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(item => {
      return item.goods_id == this.shopDetail.goods_id
    })
    if (index === -1) {
      this.shopDetail.num = 1
      this.shopDetail.checked = true
      cart.push(this.shopDetail)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },
})