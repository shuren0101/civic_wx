// pages/List/Top/Top.js
//获取应用实例
const app = getApp()
// 排行榜接口地址
var url = "http://m.kugou.com/rank/info/?page=1&json=true&rankid="

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    data: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotTopList(options.rankid)
  },
  getHotTopList: function (rankid) {
    var _this = this;
    wx.request({
      url: url + rankid,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        var TopList = res.data.songs.list;
        var rankname = res.data.info.rankname;
        for (var i = 0; i < TopList.length; i++) {
          TopList[i].filename = TopList[i].filename
          TopList[i].hash = TopList[i].hash
        }
        _this.setData({
          list: TopList,
          data: rankname
        })
      }
    })
  },
  getMusicContent: function (e) {
    wx.navigateTo({
      url: '../../Content/Content?hash=' + e.currentTarget.dataset.hash
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