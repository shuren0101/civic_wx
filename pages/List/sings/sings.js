// pages/List/sings/sings.js
//获取应用实例
const app = getApp()
// 歌手分类接口地址
var url1 = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=1&pagesize=20&showtype=1&keyword="

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
    console.log(options);
    this.setData({
      data: options.singername,
    })
    this.getSingerList()
  },
  getSingerList: function () {
    var _this = this;
    var url = url1 + this.data.data;
    console.log(url);
    
    wx.request({
      url: url1 + this.data.data,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        var singersList = res.data.data.info;
        for (var i = 0; i < singersList.length; i++) {
          singersList[i].songname_original = singersList[i].songname_original
          singersList[i].singername = singersList[i].singername
          singersList[i].filename = singersList[i].filename
        }
        _this.setData({
          list: singersList,
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