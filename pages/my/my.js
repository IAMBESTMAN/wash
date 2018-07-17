// pages/my/my.js
const app = getApp();
const serverUrl = app.globalData.config.serverUrl;
Page({

  /**
   * 页面的初始数据
   */
  // oRYE65FuIrc45bkPIpzMgRB8NSlA
  data: {
    openId: '',
    userInfo: '',
    modalStatus: false,
    effectList: [],
    amount: 0,
    waitAmount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.get_lamp_data(2);
    // const that = this;
    wx.getSetting({
      success: res => {
        console.warn(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                userInfo: res.userInfo
              });
              that.saveUserMsg(res.userInfo);
              that.get_amount(1,'amount',that);
              that.get_amount(4,'waitAmount',that);
            }
          })
        } else {
          that.setData({
            modalStatus: true
          })        
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-03
   * 获取用户授权
   * @return   {[type]}   [description]
   */
  handleConfirm: function () {
    const that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        if (res) {
          that.setData({
            userInfo: res.userInfo,
            modalStatus: false
          })
          that.saveUserMsg(res.userInfo);
          that.get_amount(1,'amount',that);
          that.get_amount(4,'waitAmount',that);
        }
      }
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-04
   * 保存用户信息
   * @param    {[type]}   userInfo [description]
   * @return   {[type]}            [description]
   */
  saveUserMsg: function (userInfo) {
    const that = this;
    const {nickName,avatarUrl,gender,city,province} = userInfo;

    wx.request({
      url: serverUrl + 'addOrUpdateUserInfo?openId=' + app.globalData.openId + 
      '&nickName=' + nickName + '&avatarUrl=' + avatarUrl + '&gender=' + gender + '&city=' + city + '&province=' + province,
      method: 'GET',
      success: function (res) {
        if (res.data && res.statusCode === 200) {
        } else {
          wx.showModal({
            title: '系统提示',
            content: res.data.errmsg || '请求数据出错',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-05
   * 获取奖励订单数据
   * @param    {[type]}   dataType    [description]
   * @param    {[type]}   amount_name [description]
   * @param    {[type]}   that        [description]
   * @return   {[type]}               [description]
   */
  get_amount: function (dataType, amount_name,that) {
    wx.request({
      url: serverUrl + 'getUserAmount',
      method: 'GET',
      data: {
        openId: app.globalData.openId,
        dataType: dataType
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          console.warn(res);
            if (amount_name === 'amount') {
              that.setData({
                amount: res.data.amount.toFixed(2)
              })
            } else {
              that.setData({
                waitAmount: res.data.amount.toFixed(2)
              })
            }
        } else {
            wx.showModal({
              title: '系统提示',
              content: res.data.errmsg || '请求数据出错',
              showCancel: false
            })
        }
      }
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-05
   * 获取走马灯数据
   * @return   {[type]}   [description]
   */
  get_lamp_data: function (dataType) {
    const that = this;
    wx.request({
      url: serverUrl + 'getRaceLampEffect',
      method: 'GET',
      data: {
        dataType
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          that.setData({
            effectList: res.data.effectList
          });
        } else {
          wx.showModal({
            title: '系统提示',
            content: res.data.errmsg || '请求数据出错',
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-05
   * 跳转到我的订单页面 待奖励
   * @return   {[type]}   [description]
   */
  wait_indent: function () {
    wx.navigateTo({
      url: './award/award?award='+ 'waitAward'
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-05
   * 跳转到我的订单页面 已奖励
   * @return   {[type]}   [description]
   */
  already_indent: function () {
    wx.navigateTo({
      url: './award/award?award=' + 'award'
    })
  },
  handleCancel: function () {
    this.setData({
      modalStatus: false
    })
    wx.switchTab({
      url: '../packet/packet'
    })
  }
})











