// pages/position/position.js
const util = require('../../lib/js/common.js');
const cf = require('../../lib/config');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    display: false,
    locationCity: '定位中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      display: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.positionAnimate();
    this.getLocation();
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

  },
  /**
   * 定位中的文字动画
   */
  positionAnimate: function () {
    let num = 1;
    let that = this;
    setInterval(function () {
      let curPos = that.data.locationCity;
      num++;
      if (num > 4) {
        num = 1;
        that.setData({
          locationCity: "定位中"
        });
      } else {
        that.setData({
          locationCity: curPos + "."
        });
      }

    }, 1000)
  },
  /**
   * 获取地理位置
   */
  getLocation: () => {
    wx.getLocation({
      type: "wgs84 ",
      success: (res) => {
        if (res) {
          wx.request({
            url: 'http://api.map.baidu.com/geocoder/v2/?',
            method: 'GET',
            dataType: "jsonp",
            data: {
              coordtype: 'wgs84ll',
              location: res.latitude + "," + res.longitude,
              ak: cf.bdGeoConfig.ak,
              callback: 'renderReverse',
              output: 'json',
              pois: 1
            },
            success: (geo_res) => {
              console.log(geo_res);
              if (geo_res.status != 0) {
                console.log('定位失败');
                callback(false, userLocation);
                return;
              }
              var _res = geo_res.result;

              userLocation = {
                address: (_res.pois.length == 0 ? _res.formatted_address : _res.sematic_description),
                latlog: _res.location.lat + ',' + _res.location.lng
              }
              for (var k in _res.addressComponent) {
                userLocation[k] = _res.addressComponent[k]
              }
              //userLocation['city'] = userLocation['city'].replace('市', '')
              storage.set('userLocation', userLocation);
              storage.set('userLocationDate', Date.parse(new Date()));
            },
            fail: (err) => {
              console.log("定位转换错误", err);
            }
          })
        }
      },
      fail: (res) => {
        console.log('获取经纬度失败', res)
      }
    })
  }
})
