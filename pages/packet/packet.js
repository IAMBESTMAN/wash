// pages/packet/packet.js
const app = getApp();
const serverUrl = app.globalData.config.serverUrl;
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    effectList: {},
    animationData: {},
    animationData1: {},
    animation0: {},
    animation1: {},
    animation2: {},
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    const that = this;
    wx.request({
      url: serverUrl + 'getRaceLampEffect',
      method: 'GET',
      data: {
        dataType:1
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          var effectList = res.data.effectList;
          effectList[effectList.length] = effectList[0]
          that.setData({
              effectList
          })
          if (effectList.length > 3) {
            that.setData({
              animation0: effectList[0],
              animation1: effectList[1],
              animation2: effectList[2],
              count: that.data.count + 2
            })
            that.animation_content();
            timer = setInterval( () => {
              that.animation_content();
            },4500);     
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
  animation_content: function () {
      const that = this;
      const effectList = that.data.effectList;
      const animation = wx.createAnimation({
        // duration: 1000
      })
      const animation1 = wx.createAnimation({
        // duration: 1000
        
      })
      const animation2 = wx.createAnimation({
        // duration: 1000
      })
      if (that.data.count + 3 > effectList.length) {
        that.setData({
          animation0: effectList[0],
          animation1: effectList[1],
          animation2: effectList[2],
          count: 0
        })
      } else {
        that.setData({
          animation0: effectList[that.data.count],
          animation1: effectList[that.data.count+1],
          animation2: effectList[that.data.count+2],
          count: that.data.count + 2
        })
      }
      animation.translate(240,0).step();
      animation.translate(240,-80).step();
      animation.opacity(0).step();
      animation.translate(0,0).step();
      animation.opacity(1).step();
      this.setData({
        animationData: animation
      })
      setTimeout( () => {
        animation1.translate(240,0).step();
        animation1.translate(240,-80).step();
        animation1.opacity(0).step();
        animation1.translate(0,0).step();
        animation1.opacity(1).step();
        this.setData({
          animationData1: animation1
        })
      }, 1500);
      setTimeout( () => {
        animation2.translate(240,0).step();
        animation2.translate(240,-80).step();
        animation2.opacity(0).step();
        animation2.translate(0,0).step();
        animation2.opacity(1).step();
        this.setData({
          animationData2: animation2
        })
      }, 3000);
    },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
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
  
  }
})