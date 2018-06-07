let debug = true;

// 静态文件地址
var staticJsonHost = debug ? 'http://imgcdnjwd.juewei.com/static/dev/' : 'http://imgcdnjwd.juewei.com/static/product/';

var protocol = location.protocol + '//';

/**
 * 配置URL
 */
let url = (function () {
  return debug ? {
    apiUrl: protocol + "checkapi.juewei.com/",
    mUrl: protocol + ((debug && host.indexOf("checkm") > -1) ? "checkm" : "devapi") + ".juewei.com/",
    oApiUrl: protocol + "checkhdapi.juewei.com/",
    hdUrl: protocol + ((debug && host.indexOf("checkm") > -1) ? "checkhd" : "devapi") + ".juewei.com/"
  } : {
      apiUrl: protocol + "api.juewei.com/",
      oApiUrl: protocol + "hdapi.juewei.com/",
      mUrl: protocol + "m.juewei.com/",
      hdUrl: protocol + "hd.juewei.com/"
    }
})()

let JWD_CONFIG = {
  appId: (debug ? 'wx30a8a236e9f6084d' : 'wx9479e25508e99976'),
  bdGeoConfig: {
    ak: 'pRtqXqnajTytAzWDL3HOnPRK',
    geotable_id: '134917'
  },
  loginUrl: url.apiUrl + 'weixin/JumpUrl',

  //验证正则：
  re: {
    name: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/,	//不能是特殊符号
    mobile: /^13[0-9]{9}$|^14[0-9]{9}$|^15[0-9]{9}$|^16[0-9]{9}$|^17[0-9]{9}$|^18[0-9]{9}$|^19[0-9]{9}$/, //手机号码
    id: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,			//身份证号码
    content: /^[A-Za-z0-9]{2,200}$|^[\u4E00-\u9FA5]{1,200}/,	//留言 不能是特殊符号
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,		//email地址
    time: /\d{4}(\-|\/|\.)\d{1,2}(\-|\/|\.)\d{1,2}/,      // 时间
    code: /^\d{4}$/   // 验证码
  },

  api: {
    getOpenId: protocol + (debug ? "checkapi" : "api") + ".juewei.com/wxZF/checkuserHD22.php",                //获取微信用户信息（包含头像\openid\昵称等）
    loginByCode: url.apiUrl + 'user/LoginByCode',

    getUserAddress: url.apiUrl + 'userAddress/List',
    getAddressInfo: url.apiUrl + 'userAddress/Info',
    createAddress: url.apiUrl + 'userAddress/Create',
    updateAddress: url.apiUrl + 'userAddress/Update',
    deleteAddress: url.apiUrl + 'userAddress/Delete',
    setDefaultAddress: url.apiUrl + 'userAddress/SetDefault'
  }
}

let cf = JWD_CONFIG;