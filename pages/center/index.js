import request from "../../utils/request"
// pages/center/index.js
let startY = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY:'',
    transition:'',
    userInfo:{},
    recordList:[]
  },
  //手指的按下、移动、抬起事件
  touchStart(e){
    startY = e.changedTouches[0].clientY
    this.setData({
      transition:''
    })
  },
  touchMove(e){
    let endY = e.changedTouches[0].clientY
    //移动的距离
    let resultY =endY- startY 
    if(resultY < 0){
      resultY = 0
    }else if(resultY > 300){
      resultY = 300
    }

    this.setData({
      translateY:resultY +'rpx'
    })
  },
  touchEnd(){
    this.setData({
      translateY:0,
      transition:'transform 1s'
    })
  },
  //点击跳转至登录页面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  //获取用户的播放历史记录
  async getRecordList(){
    let userId = this.data.userInfo.userId
    const result = await request('/user/record',{uid:userId,type:0})
    if(result.code === 200){
      // console.log(result)
      this.setData({
        recordList:result.allData.slice(0,19).map(item=>{
          return{
            id:item.song.al.id,
            picUrl:item.song.al.picUrl,
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
      userInfo:wx.getStorageSync('userInfo_key')
    })
    this.getRecordList()
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