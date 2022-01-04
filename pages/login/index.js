import request from "../../utils/request"
// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'15826571493',
    password:'1Hanbowen'
  },
  //获取手机号和密码input框的值
  handlerInput(e){
    let type = e.target.id
    this.setData({
      [type]:e.detail.value
    })
  },
  //点击登录发送请求
  async login(){
    let {phone,password} = this.data
    if(!/^1[3-9]\d{9}$/.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none',
      })
    }
    if(!/^\w{6,20}&/){
      wx.showToast({
        title: '密码格式不正确',
        icon:'none',
      })
    }
    const result = await request('/login/cellphone',{phone,password,isLogin:true})
    if(result.code === 200){
      console.log(result)
      wx.setStorageSync('userInfo_key',result.profile)
      wx.reLaunch({
        url: '/pages/center/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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