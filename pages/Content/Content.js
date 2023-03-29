// pages/Content/Content.js
//获取应用实例
const app = getApp()
// 音乐详情接口地址
var url1 = "http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash="

const myaudio = wx.createInnerAudioContext();
Page({
  data: {
    isplay: false, // 是否播放
    imgUrl: "",
    message: "",
    hash: "",
    options: ""
  },
  onLoad: function (options) {
    this.setData({
      options: options
    });
    this.getMusicContentList(options.hash);
  },
  // 播放
  play: function () {
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({
      hash: this.options.hash,
      isplay: true
    });
  },
  // 停止
  stop: function () {
    myaudio.pause();
    this.setData({
      hash: '',
      isplay: false
    });
  },
  getMusicContentList: function (hash) {
    var _this = this;
    wx.request({
      url: url1 + hash,
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res);

        _this.setData({
          imgUrl: res.data.imgUrl.replace("/{size}", "")
        })
        if (res.data.url == "") {
          _this.setData({
            message: res.data.error
          });
          console.log("需要付费,无法播放");
        } else {
          myaudio.src = res.data.url;
          console.log(myaudio.src);
        }
      }
    })
  },
})