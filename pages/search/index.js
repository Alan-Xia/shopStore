// pages/search/index.js
import request from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索内容
    inpValue: "",
    // 显示取消按钮
    isFocus: false,
    // 列表
    goods: []
  },
  timer: null,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  // 搜索
  handleInput (e) {
    let {value} = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: true,
      })
      return
    }
    // 防抖
    this.setData({
      isFocus: true,
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.qserch(value)
    }, 1000)
  },
  // 搜索
  async qserch (value) {
    let res = await request({url: "/goods/qsearch",data: {query:value}})
    this.setData({
      goods: res.message
    })
  },
  // 取消
  handleCancel () {
    this.setData({
      inpValue: '',
      isFocus: false,
      goods: []
    })
  }
})