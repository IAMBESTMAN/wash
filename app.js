//app.js
App({
  onShow: function () {
    // 获取用户信息
    const that = this;
    wx.showLoading({
      title: '正在加载中...'
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.globalData.config.serverUrl + 'onLogin?code=' + res.code,
            method: 'GET',
            success: function (data) {
              if (data.data && data.statusCode === 200) {
                //data.data.openId
                wx.hideLoading();
                that.globalData.openId = data.data.openId;
              } else {
               wx.hideLoading();
                wx.showModal({
                  title: '系统提示',
                  content: data.data.errmsg || '请求数据出错',
                  showCancel: false
                })
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    // 请求路径归总
    config: (function(__ENV__){
      if (__ENV__) {
        return {
          serverUrl: 'https://taishengqian.top/taobaoseo-wechat/'
        }
      } else {
        serverUrl: 'https://taishengqian.top/taobaoseo-wechat/'
      }
    })(true),
    openId: ''
  }
})