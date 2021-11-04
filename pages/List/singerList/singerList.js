// pages/List/singerList/singerList.js
//获取应用实例
const app = getApp()
// 歌手分类接口地址
var url = 'http://m.kugou.com/singer/list/'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(options.classid);

    this.getSingerList()
  },
  getSingerList: function (classid) {
    var _this = this;
    wx.request({
      url: url + classid + '?json=true',
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        var singersList = res.data.singers.list.info;
        for (var i = 0; i < singersList.length; i++) {
          singersList[i].imgurl = singersList[i].imgurl.replace("/{size}", "")
          singersList[i].singername = singersList[i].singername
        }
        _this.setData({
          list: singersList
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