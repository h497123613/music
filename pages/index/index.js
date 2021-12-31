import request from "../../utils/request"
Page({
  data: {
    //pic(图片链接)、bannerId、
    bannerList:[],
    recommendList:[]
  },
  //获取轮播图数据
  async getBannerList(){
    try {
      const result = await request('/banner',{type:2})
      if(result.code === 200){
        this.setData({
          bannerList:result.banners.map(item=>{
            return{
              bannerId:item.bannerId,
              pic:item.pic
            }
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  //获取推荐歌曲数据
  async getRecommend(){
    try {
      const result = await request('/personalized',{limit:15})
      if(result.code === 200){
        //id、name(推荐名字)、picUrl
        this.setData({
          recommendList:result.result.map(item=>{
            return {
              id:item.id,
              pic:item.picUrl,
              name:item.name
            }
          })
        })
      }
    } catch (error) {
      
    }
    
  },
  //获取排行榜歌曲数据
  async getRankList(){
    let idx = 0
    let rankList = []
    while(idx < 4){
      const result = await request('/top/list',{idx:idx++})
      if(result.code === 200){
        let obj = {
          name:result.playlist.name,
          id:result.playlist.id,
          rankList:result.playlist.tracks.slice(0,3).map(item=>{
            return{
              name:item.name,
              id:item.al.id,
              picUrl:item.al.picUrl
            }
          })
        }
        rankList.push(obj)
        this.setData({
          rankList
        })
      }
    }
  },
  onLoad: function (options) {
    //获取轮播图数据
    this.getBannerList()
    //获取推荐歌曲数据
    this.getRecommend()
    //获取排行榜歌曲数据
    this.getRankList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})