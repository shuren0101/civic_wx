// pages/musicList/musicList.js
//获取应用实例
const app = getApp()
// 歌手分类接口地址
var url1 = "http://m.kugou.com/singer/class&json=true"
// 音乐排行接口地址
var url2 = "http://m.kugou.com/rank/list&json=true"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    navtype: "",
    classname: "",
    classid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navtype: options.type
    })
    this.getHotMusicList(options.type)
  },

  getHotMusicList: function (type) {
    var url = type == 1 ? url1 : url2;
    var _this = this;
    app._getData(url).then(res => {
      var resList = type == 1 ? res.data.list : res.data.rank.list;
      for (var i = 0; i < resList.length; i++) {
        resList[i].imgurl = type == 1 ? resList[i].imgurl : resList[i].banner7url.replace("/{size}", "")
        resList[i].classname = type == 1 ? resList[i].classname : resList[i].rankname
        resList[i].rankid = type == 1 ? resList[i].classid : resList[i].rankid
      }
      _this.setData({
        list: resList
      })
    })

  },
  
  getNavMusicList1: function () {
    wx.navigateTo({
      url: '../../List/musicList/musicList?type=1',
    })
  },

  getNavMusicList2: function () {
    wx.navigateTo({
      url: '../../List/musicList/musicList?type=2',
    })
  },

  getNavType: function (e) {
    var classid = e.currentTarget.dataset.classid;
    var rankid = e.currentTarget.dataset.rankid;
    var navtype = this.data.navtype;
    wx.navigateTo({
      url: navtype == 1 ? '../singerList/singerList?classid=' + classid : '../Top/Top?rankid=' + rankid
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