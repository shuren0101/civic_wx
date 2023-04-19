// pages/Content/Content.js
//获取应用实例
const app = getApp();
// 音乐详情接口地址
const url1 = "http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=";

Page({
  data: {
    isplay: false, // 是否播放
    message: "",
    hash: "",
    musicInfo: "",
    oldmusicInfo: {},
    newmusicInfo: {}
  },
  onLoad: function (options) {
    this.data.newmusicInfo = JSON.parse(options.musicInfo);
  },
  onShow() {
    const oldmusicInfo = app.globalData.musicInfo;
    const newmusicInfo = this.data.newmusicInfo;
    if (oldmusicInfo == {} || oldmusicInfo.hash != newmusicInfo.hash) {
      this.setData({
        musicInfo: newmusicInfo,
      });
      this._getMusicContent(newmusicInfo.hash);
    } else {
      this.setData({
        musicInfo: oldmusicInfo,
        isplay: true
      });
    }
  },
  // 播放
  async play() {
    const res = await app.play(this.data.musicInfo);
    if (res == 200) this.setHash();
  },
  // 停止
  stop: function () {
    app.stop();
    this.setData({
      isplay: false
    });
  },
  setHash() {
    this.setData({
      hash: this.data.musicInfo.hash,
      isplay: true
    });
  },
  async _getMusicContent(hash) {
    let res = await app._getData(url1 + hash);
    res.data.album_img = res.data.album_img.replace("/{size}", "/240");
    res.data.url = encodeURI(res.data.url)
    this.setData({
      musicInfo: res.data,
    })
    if (res.data.url == "") {
      _this.setData({
        message: res.data.error
      });
      console.log("需要付费,无法播放");
    } else {
      this.play();
    }
  },
})