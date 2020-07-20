

import { record } from './collection-server/rrweb'


/**
 * @param sysCode
 * @param userCode
 * @returns {boolean}
 */
export  function lgoin (sysCode,userCode) {
  console.log("判断系统名是否为空")
  if (sysCode !== null && sysCode !== ""){
    //TODO 请求数据库 查看系统是否存在
    console.log("判断用户名是否为空")
    if(userCode !== null && userCode !== ""){
    return true
    }else {
      return false //判断未取到用户信息直接返回
    }
  }else {
  return false //判断没有系统信息 直接返回
  }
}

/**
 * 请求后台查询只能配置数据
 * @returns {*} 返回只能数据信息
 */
export function trace_ini() {
// TODO 请求后台查询只能配置数据
  return null
}

/**
 * 获取用户设备ip方法
 * @returns {*} 获取用户的ip
 */
export  function get_ip_public() {
 // TODO 取用户设备ip方法
  return null
}

/**
 * 获取设备
 * @returns {*} pc还是mobile
 */
export function get_device(){
  // TODO 获取设备信息
  return null
}

/**
 * 获取操作系统
 * @returns {*}
 */
export function get_os() {
// TODO 获取操作系统
  return null
}

/**
 * 获取省份信息
 * @returns {*}
 */
export function get_province() {
// TODO 获取省份信息
  return province
}

/**
 * 后去城市信息
 * @returns {*}
 */
export function get_city() {
// TODO 获取城市信息
  return null
}

/**
 * 字符串压缩
 * @param data 需要压缩的字符串
 * @returns {*} 压缩完成后的字符串
 */
export function string_compress(data) {
// TODO 字符串压缩
  return data
}

/**
 * 返回用户所有信息
 * @returns {*}
 */
export function insert_all_data(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,jsonStr) {
  console.log("开始存储步骤")
  let data ={
  traceVo:{
    sysCode:sysCode,
    sysName:sysName,
    userCode:userCode,
    userName:userName,
    processTitle:processTitle,
    processVersion:processVersion,
    processName:processName,
    processContent:processContent,
    dataSource:'automatic',
   // beginDateTime:'',
   // endDateTime:'',
    ip:'',
    device:'',
    os:'',
    province:'',
    city:''
  },
  traceVideoVo:{
    video:jsonStr
  }
}
console.log(data,"村上数据没")
    lgoin(sysCode,userCode)
    // data.tracevo.ip=get_ip_public()
    // data.tracevo.device=get_device()
    // data.tracevo.os=get_os()
    // data.tracevo.province=get_province()
    // data.tracevo.city=get_city()
     data_upload(data)
return data
}

/**
 * 页面监控
 */
export function doctument_monitor(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,events) {
  //TODO 1. 页面刷新或页面关闭停止
  // 2. （可配置）够定时时间停止
  // 3. （可配置）视频>5M停止
  // 4. 视频和用户数据上传
  let jsonStr = end_record(events)
  insert_all_data(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,jsonStr)

}

/**
 *
 * @param sysCode
 * @param sysName
 * @param userCode
 * @param userName
 * @param processTitle
 * @param processVersion
 * @param processName
 * @param processContent
 * @param jsonStr
 * @param events
 */
export function trace_point_begin(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,events) {
    var a = lgoin(sysCode,userCode)
  if(a === true){
    let jsonStr = end_record(events)
  start_record(events) //开始录制新视频
  //  doctument_monitor(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,events)//满足条件停止录屏
  }else {
    console.log("系统校验失败或无用户信息")
  }


}

/**
 *
 * @param sysCode
 * @param sysName
 * @param userCode
 * @param userName
 * @param processTitle
 * @param processVersion
 * @param processName
 * @param processContent
 * @param jsonStr
 * @param events
 */
export function trace_point_end(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,events) {
    var a = lgoin(sysCode,userCode)
  if(a===true){
    let jsonStr = end_record(events)
    insert_all_data(sysCode,sysName,userCode,userName,processTitle,processVersion,processName,processContent,jsonStr)
  }else {
     console.log("系统校验失败或无用户信息")
  }

}

/**
 * 开始录制视频
 * @returns {[]} 返回视频内容数组
 */
export function start_record(events){
  console.log("开始录制")
  rrwebMin.record({
    emit (event) {
      // 用任意方式存  储 event
      console.log(event)
      events.push(event)
    }
  })
  return events
}

/**
 * 结束录制视频
 * @param event 视频存放数组
 * @returns {Promise<unknown>} 把视频数组转成JSON串
 */
export function end_record(events){
  console.log("停止转字符串")
let traceVideo={
  video:''
}
  const aa = events

   traceVideo.video= JSON.stringify(aa)
  console.log(aa,"大小有多少",traceVideo)
   events=[]
  // return aa
return traceVideo.video
}

/**
 *
 * @param data
 * @returns {Promise<unknown>}
 */
export function data_upload(data) {
  console.log("调用后台存储")
  // return new Promise((resolve, reject) => {
  //   insertAllTrace(data).then(Response => {
  //   })
  // })
  // 返回页面存储的对象
  return data 
}






