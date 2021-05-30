Page({
  data: {},
  //options(Object)
  handleGetUserInfo(e) {
    const { userInfo } = e.detail
    wx.setStorageSync('userInfo', userInfo)
    console.log(userInfo)
    wx.navigateBack({
      delta: 1,
    })
  },
})