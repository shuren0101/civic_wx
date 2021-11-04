// pages/Seach/seach.js
//获取应用实例
const app = getApp()
// 音乐搜索接口地址
var url1 = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1&keyword="

Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  getSeachMusicList: function () {
    var _this = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        _this.setData({
          list: res.data.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})