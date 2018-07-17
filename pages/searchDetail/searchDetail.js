// pages/searchDetail/searchDetail.js
const app = getApp();
const serverUrl = app.globalData.config.serverUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_content: [],
    pageNo: 1,
    pageSize: 10,
    loading: false,
    loaded: false,
    key:'',
    markStatus: false,
    detailData: [],
    copyStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const key = options.key;
    const that = this;
    wx.request({
      url: serverUrl + 'searchByKey',
      method: 'GET',
      data: {
        key,
        pageNo: 1,
        pageSize: 10
      },
      success: function (res) {
        that.setData({
          list_content: res.data,
          key
        })
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
    const that = this;
    that.setData({
      loading: true
    })
    const list_content = that.data.list_content;
    wx.showLoading({
      title: '正在加载中...'
    })
    wx.request({
      url: serverUrl + 'searchByKey',
      method: 'GET',
      data: {
        key: that.data.key,
        pageNo: that.data.pageNo+1,
        pageSize: (that.data.pageNo+1)*10
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          if (res.data.length > 0) {
            list_content.push(...res.data);
            that.setData({
              list_content: list_content,
              pageNo: that.data.pageNo+1,
              pageSize: 10,
              loading: false
            })  
          } else {
            that.setData({
              pageNo: that.data.pageNo+1,
              pageSize: 10,
              loaded: true
            })
          }  
        } else {
          wx.showModal({
            title: '系统提示',
            content: res.data.errmsg || '请求数据出错'
          })
        }
        wx.hideLoading();
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-06
   * 商品详情
   * @return   {[type]}   [description]
   */
  jump_detail: function (e) {
    const that = this;
    var id = e.currentTarget.dataset.id,
        name = e.currentTarget.dataset.name;
    wx.request({
      url: serverUrl + 'getItemInfo',
      method: 'GET',
      data: {
        itemId: id,
        itemName: name
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
            console.log(res.data);
            that.setData({
              markStatus: true,
              detailData: res.data
            })
        } else {
            wx.showModal({
              title: '系统提示',
              content: res.data.errmsg || '请求数据出错了'
            })
        }
      }
    })
  },
  /**
   * @Author   huajieyu
   * @DateTime 2018-07-06
   * 关闭蒙层
   * @return   {[type]}   [description]
   */
  close_mark: function () {
    this.setData({
      markStatus: false,
      copyStatus: false
    })
  },
  copy_pwd: function (e) {
    const {tbpwd,itemid,itemname} = e.currentTarget.dataset
    const that = this;
    wx.setClipboardData({
      data: 'tbpwd',
      success: function () {
        that.setData({
          copyStatus: true
        })
        wx.request({
          url: serverUrl + 'addUserBehavior',
          method: 'GET',
          data: {
            itemId: itemid,
            content: tbpwd,
            openId: app.globalData.openId
          },
          success: function (res) {

          }
        })
      }
    })
  }
})