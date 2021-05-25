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
  total: 0,
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
      // console.log(res)
      this.total = Math.ceil(res.total / this.queryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList,...res.message.goods]
      })
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
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
})