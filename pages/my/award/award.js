// pages/my/award/award.js
const app = getApp();
const serverUrl = app.globalData.config.serverUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const that = this;
    const status = options.award;
    if (status == 'waitAward') {
      that.setData({
        status: 'waitAward'
      })
      that.get_order_list(1);
    } else {
      console.log(status);
      that.setData({
        status: 'award'
      })
      that.get_order_list(4);
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-04
   * 点击待奖励按钮
   * @return   {[type]}   [description]
   */
  handle_waitAward: function () {
    this.setData({
      status: 'waitAward'
    })
    this.get_order_list(1);
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-04
   * 点击已奖励按钮
   * @return   {[type]}   [description]
   */
  handle_award: function () {
    this.setData({
      status: 'award'
    })
    this.get_order_list(4);
  },
  get_order_list: function (dataType) {
    const that = this;
    wx.showLoading({
      title: '正在加载中...'
    })
    wx.request({
      url: serverUrl + 'getUserOrderList',
      method: 'GET',
      data: {
        dataType: dataType,
        openId: app.globalData.openId
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.hideLoading();
          console.warn(res.data.orders);
          that.setData({
            orders: res.data.orders
          })
        } else {
          wx.hideLoading();
        }
      }
    })
  }
})