
//封装发送请求的函数
function request(url,data={}) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      method:'GET',
      data,
      header:{
        cookie:wx.getStorageSync('cookie_key')
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorageSync('cookie_key', res.cookies.find(item=>{
            return item.startsWith('MUSIC_U')
          }))
        }
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
export default request