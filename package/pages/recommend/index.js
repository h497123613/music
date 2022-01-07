import request from "../../../utils/request"
import PubSub from "pubsub-js"
// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'00',
    month:'00',
    songList:[],
    currentSongId:''//当前歌曲id
  },
  //获取今日推荐的歌曲列表
  async getSongList(){
    const result = await request('/recommend/songs')
    if(result.code === 200){
      this.setData({
        songList:result.recommend.map(item=>{
          return {
            songName:item.name,
            id:item.id,
            songImg:item.album.picUrl,
            author:item.artists[0].name
          }
        })
      })
    }
  },
  //跳转至detail页面
  toDetail(e){
    //保存点击的歌曲的id,为了后期找到当前歌曲
    this.setData({
      currentSongId:e.currentTarget.id
    })
    wx.navigateTo({
      url:'/package/pages/detail/index?songId=' + e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    this.getSongList()
    //订阅消息,接收点击的 是上一曲或是下一曲
    PubSub.subscribe('songType',(_,type)=>{
      //先找到当前的歌曲下标
      let index = this.data.songList.findIndex(item=>{
        return item.id === +this.data.currentSongId
      })
      let newIndex = -1
      type === 'prev' ? 
        newIndex = index - 1 < 0 ?this.data.songList.length - 1:index - 1
      : newIndex = index + 1 > this.data.songList.length - 1 ? 0:index + 1
      //找到上一首或者下一首歌曲的id,我们也得通信
      PubSub.publish('songId',this.data.songList[newIndex].id)
      //更新保存的当前歌曲的id
      this.setData({
        currentSongId:this.data.songList[newIndex].id
      })
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