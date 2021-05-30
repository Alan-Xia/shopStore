// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
import {openSetting,getSetting,chooseAddress,showModal,showToast } from '../../utils/base'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    // 是否全选
    allChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow: function () {
    let address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address
    })
    this.setCart(cart)
  },
  // 购物车商品信息
  setCart (cart) {
    let allChecked = cart.length > 0? cart.every(item => item.checked) : false
    let totalNum = 0
    let totalPrice = 0
    cart.forEach(item =>{
      if (item.checked) {
        totalPrice += item.goods_price* item.num
        totalNum += item.num
      }
    })
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart)
  },
  // 点击收获地址
  async handleChooseAddress () {
    try {
      // 获取权限状态
      let res = await getSetting()
      let scopeAddress = res.authSetting['scope.address']
      // 判断权限状态
      if (scopeAddress === false) {
        // 打开用户授权
        await openSetting()
      }
      // 获取收获地址
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  // 单选复选框
  handleItemChange (e) {
    let id  = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(item => item.goods_id == id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 商品加减
  async handleItemNumEdit (e) {
    let {operation,id}  = e.currentTarget.dataset
    let {cart} = this.data
    // cart.forEach(item => {
    //   if (item.goods_id == id) {
    //     item.num + operation == 0 ? wx.showToast({
    //       title: '不能再减了',
    //       icon: 'error',
    //       mask: true
    //     }) : item.num = (item.num + operation)
    //   }
    // })
    let index = cart.findIndex(item => item.goods_id == id)
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: '您是否要删除？' })
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  // 结算
  async handlePay () {
    const { address, totalNum } = this.data
    if (!address.userName) {
      await showToast({ title: '您还没有选择收获地址' })
      return
    }
    if (totalNum === 0) {
      await showToast({ title: '您还没有选择商品' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 全选
  handleItemAllCheck () {
    let {cart,allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
})