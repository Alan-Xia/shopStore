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
  getUserInfo () {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '获取信息失败',
          icon: "error",
          mask: true
        })
      }
    })
  }
})