import request from "../../utils/request"
// pages/video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentNavId:'',
    videoList:[],
    vid:'',
    recordList:[],//保存视频的播放记录
    //每个视频的播放记录是一个对象,保存id和time
    flag:false
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
    let currentNavId = e.target.dataset.id*1
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
       }),
       flag:false
     })
   }
  },
  //点击视频控制播放或暂停(单例)
  playOrPause(e){
    //拿到video组件的id值,要和视频上下文绑定
    this.setData({
      vid:e.target.id
    })
    // 进判断则是第一次点击
    if (!this.player) {
      //不存在就创建新的视频上下文
      this.player = wx.createVideoContext(this.data.vid)
      //控制播放
      this.player.play()
      //存储视频的id,用于下一次点击的时候判断是不是点的同一个
      this.vid = this.data.vid
      //保存视频的播放状态,用于判断下一次点的是同一个的时候,播放状态如何设置
      this.isPlay = true
    }else{
      //不是第一次点
      //判断点的是不是同一个视频
      if(this.data.vid === this.vid){
        //点的是同一个视频
        if(this.isPlay){
          this.player.pause()
          this.isPlay = false 
        }else{
          this.player.play()
          this.isPlay = true
        }
      }else{
        //点的不是同一个视频
        this.player.pause()//暂停上一个视频
        //创建一个新的视频上下文
        this.player = wx.createVideoContext(this.data.vid)
        //需要看播放记录数组当中是否存在当前这个歌曲的播放记录
        //如果存在,需要把时间指定调到记录的位置
        let obj = this.data.recordList.find(item=>item.vid === this.data.vid)
        obj && this.player.seek(obj.currentTime)
        this.player.play()
        this.vid = this.data.vid
        this.isPlay = true
      }
    }

  },
  //视频播放的时候手机视频播放的时间和id形成播放记录对象
  handlerTimeupdate(e){
    //先判断数组当中是否已经存在当前视频的记录
    let recordList = this.data.recordList
    let obj = recordList.find(item=>{
      return item.vid === this.data.vid
    })
    if(obj){
      //如果存在只需要修改当前这个记录的时间即可
      obj.currentTime = e.detail.currentTime
    }else{
      //如果不存在再去创建新的记录对象添加到数组
      obj = {
        vid:this.data.vid,
        currentTime:e.detail.currentTime
      }
      recordList.push(obj)
    }
    this.setData({
      recordList
    })
  },
  //视频播放结束后需要删除当前这个视频的播放记录
  handlerEnd(e){
    let recordList =  this.data.recordList
    let index = recordList.findIndex(item=>item.vid === this.data.vid)
    index !== -1 && recordList.splice(index,1)
    this.setData({
      recordList
    })
  },
  //下拉刷新回调
  bindrefresherrefresh(){
    //设置三个点显示
    this.setData({
      flag:true
    })
    //重新发请求获取视频列表
    this.getVideoList()
    
  },
  //上拉触底
  bindscrolltolower(){
    let videoList = this.data.videoList
    videoList = [...videoList,...videoList]
    if(videoList.length < 100){
      this.setData({
        videoList
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
  onShareAppMessage: function ({from}) {
    if(from==='button'){
      //点的是按钮进行转发
        return {
          title:'',
          path:'/pages/video/index',
          imageUrl:'../../static/images/mylove.jpg'
        }
    }else{
      //点的是系统的胶囊按钮
    }
  }
})