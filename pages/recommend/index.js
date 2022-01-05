import request from "../../utils/request"
// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'00',
    month:'00',
    songList:[]
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    this.getSongList()
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