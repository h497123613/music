import request from "../../utils/request"
// pages/video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentNavId:'',
    videoList:[]
  },
  //获取nav列表数据
  async getNavList(){
    const result = await request('/video/group/list')
    if(result.code === 200){
      this.setData({
        navList:result.data.slice(0,10),
        currentNavId:result.data[0].id
      })
      this.getVideoList()
    }
  },
  //点击nav改变currentNavId
  changeItem(e){
    let currentNavId = e.target.id*1
    this.setData({
      currentNavId
    })
    this.getVideoList()
  },
  //点击视频nav获取对应的视频列表
  async getVideoList(){
   const result = await request('/video/group',{id:this.data.currentNavId})
   if(result.code === 200){
     this.setData({
       videoList:result.datas.map(item=>{
         return item.data
       })
     })
   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getNavList()
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