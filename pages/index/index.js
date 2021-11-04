//index.js
//获取应用实例
const app = getApp()
// 音乐推荐接口地址
var url = "http://m.kugou.com/?json=true"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner();
    this.getHotMusicList();
  },

  getHotMusicList: function () {
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

  getBanner() {
    var _this = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        _this.setData({
          imgUrls: res.data.banner,
        })
      }
    })
  },

  getMusicContent: function (e) {
    wx.navigateTo({
      url: '../Content/Content?hash=' + e.currentTarget.dataset.hash
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