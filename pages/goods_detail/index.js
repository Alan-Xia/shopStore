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
      this.setData({
        detail: res.message
      })
    })
  },
  handleCollect (e) {}
})