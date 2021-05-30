/**
 * @des promise 形式 用户授权
 */
// 打开用户授权
export const openSetting = function () {
  return new Promise((reslove, reject) => {
    wx.openSetting({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
// 获取用户授权
export const getSetting = function () {
  return new Promise((reslove, reject) => {
    wx.getSetting({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
// 获取用户地址信息
export const chooseAddress = function () {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
// 模态框选择
export const showModal = function ({ content }) {
  return new Promise((reslove, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

// 提示信息
export const showToast = function ({ title }) {
  return new Promise((reslove, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {},
    })
  })
}