// pages/category/index.js
import request from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 商品数据
    rightContent: [],
    // 下标
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const CateList = wx.getStorageSync('cates')
    if (!CateList) {
      this.getCate()
    } else {
      // 暂时定义一个过期时间10s - 5min
      if (Date.now() - CateList.time > 1000 * 60) {
        this.getCate()
      } else {
        this.Cates = CateList.data
        let leftMenuList = this.Cates.map((v) => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },
  getCate () {
    request({
      url: "/categories"
    }).then(res => {
      this.Cates = res.message
      // 把获取到的数据存入本地存储，不需要打开实时刷新
      wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
      // 左侧菜单
      let leftMenuList = this.Cates.map((v) => v.cat_name)
      // 右侧类型列表
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleItemTap (e) {
    let currentIndex = e.currentTarget.dataset.index
    let rightContent = this.Cates[currentIndex].children
    this.setData({
      currentIndex,
      rightContent,
      scrollTop: 0
    })
  }
})