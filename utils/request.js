
//封装发送请求的函数
function request(url,data) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      method:'GET',
      data,
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
export default request