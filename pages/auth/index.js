// pages/auth/index.js
import request from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login, showToast } from '../../utils/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  async handleGetUserInfo (e) {
    try {
      
      let {encryptedData,iv,signature,rawData} = e.detail
      let {code}  = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      // 没有企业账号无法返回token
      let {token} = (await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post',
      })) || []
      // 默认 token 貌似服务器无法生存新token
      wx.setStorageSync('token', this.data.defaultToken)
      wx.navigateBack({
        delta: 1,
      })
    } catch (error) {
      console.log(error)
    }
  },

})