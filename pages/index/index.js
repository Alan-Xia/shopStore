import request from '../../request/index'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    navList: [],
    // 楼层列表
    footerData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getFooterList()
  },
  // 获取轮播图
  getSwiperList () {
    request({
      url: '/home/swiperdata',
    }).then(res => {
      this.setData({
        swiperList: res.message
      })
    })
  },
  // 获取导航列表
  getNavList () {
    request({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        navList: res.message
      })
    })
  },
  // 获取导航列表
  getFooterList () {
    request({
      url: "/home/floordata"
    }).then(res => {
      this.setData({
        footerData: res.message
      })
    })
  }
})