// pages/goods_list/index.js
import request from '../../request/index'
Page({

  // 页面的初始数据
  data: {
    // 列表参数
    goodsList: [],
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
    ]
  },
  // 接口参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  total: 1,
  onLoad: function (options) {
    // 获取分类id
    this.queryParams.cid = options.cid
    this.queryParams.query = options.query || ''
    this.getShopList()
  },
  getShopList () {
    request({
      url: "/goods/search",
      data: this.queryParams
    }).then(res => {
      this.total = Math.ceil(res.message.total / this.queryParams.pagesize)
      // console.log(this.total)
      this.setData({
        goodsList: [...this.data.goodsList,...res.message.goods]
      })
      wx.stopPullDownRefresh()
    })
  },
  tabsItemChange (e) {
    let {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((item,i) =>{
      index == i ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })
    if (index != 0) {
      this.setData({
        goodsList: []
      })
      this.getShopList()
    }
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1
    this.getShopList()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.total) {
      wx.showToast({
        title: '没有下一页数据',
      })
    } else {
      this.queryParams.pagenum++
      console.log(this.queryParams.pagenum)
      this.getShopList()
    }
  },
})