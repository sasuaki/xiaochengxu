import type{WxloginApi,RescovidApi,CovidcancelApi,HpvpriceApi,ReshpvApi,ResnuataApi,Graphics,Patientres,Filterdata,PhyDetail,PhyApi} from '@/types/decl-type'
import {Base64} from 'js-base64'

// 基础地址
const baseUrl:string="https://meituan.thexxdd.cn/api";

function getToken():string{
    const token=uni.getStorageSync('wxuser').user_Token||''
    // 对token进行加密处理
    const base64_token=Base64.encode(token+':')
    return `Basic ` + base64_token
}

// 请求数据
function request(
    url:string,
    method:'GET'|'POST',
    data:string|object|ArrayBuffer
){
    return new Promise((resolve,reject)=>{
        // console.log(getToken(),"getToken")
        uni.request({
            url:baseUrl + url,
            method,
            data,
            header:{Authorization:getToken()},
            success:(res:any)=>{
                if(res.statusCode===200){
                    resolve(res)
                }else if(res.statusCode===401){ //token过期
                    // 跳转到登录页面
                    uni.navigateTo({
                        url:'/pages/login/index'
                    })
                    reject(res)
                }else if(res.statusCode===400){
                    uni.showToast({
                        title:"开发者某个字段或者参数填写不对",
                        icon:"none",
                        duration:1000
                    })
                    reject(res)
                }else if(res.statusCode===500){
                    uni.showToast({
                        title:"服务器发生未知错误",
                        icon:"none",
                        duration:1000
                    })
                    reject(res)
                }else if(res.statusCode===202){
                    uni.showToast({
                        title:res.data.msg,
                        icon:"none",
                        duration:1000
                    })
                    reject(res)
                }
            },
            fail:(err:any)=>{
                uni.showToast({
                    title:'服务器发生未知错误',
                    icon:'none',
                    // 停留时间
                    duration:1000
                })
                // 导出错误
                reject(err)
            }

            })
    })
}

// api接口
const RequestApi={
    // 首页数据frontpage
    Frontpage:()=>request('/frontpage','GET',{}),

    // 小程序登录接口
    WxLogin:(data:WxloginApi)=>request('/wx_login','POST',data),

    // 新冠疫苗预约时段接口
    Newapptime:()=>request('/newapptime','GET',{}),

    // 新冠疫苗提交预约接口
    Rescovid:(data:RescovidApi)=>request('/rescovid','POST',data),
    
    // 新冠疫苗预约订单
    CoviduserOrder:()=>request('/coviduser_order','GET',{}),

    // 取消新冠疫苗预约
    Covidcancel:(data:CovidcancelApi)=>request('/covidcancel','GET',data),

    // HPV疫苗列表  
    Otuhpv:()=>request('/otuhpv','GET',{}),

    // HPV疫苗套餐
    Hpvpack:()=>request('/hpv_pack','GET',{}),

    // HPV疫苗价格
    Hpvprice:(data:HpvpriceApi)=>request('/hpv_price','POST',data),

    // 提交HPV疫苗的预约
    Reshpv:(data:ReshpvApi)=>request('/reshpv','POST',data),

    // HPV疫苗预约订单
    Hpvuser:()=>request('/hpvuser_order','GET',{}),

    // 取消HPV预约
    HpvCancel:(data:{_id:string})=>request('/hpvcancel','GET',data),

    // 获取核酸检测页面数据
    Nuataget:()=>request('/nuataget','GET',{}),

    // 提交核酸检测预约
    Resnuata:(data:ResnuataApi)=>request('/resnuata','POST',data),

    // 获取核酸检测订单数据
    NuatauserOrder:()=>request('/nuatauser_order','GET',{}),

    // 取消核酸检测订单
    Nuatacancel:(data:{_id:string})=>request('/nuatacancel','GET',data),

    // 获取就诊人
    Getpatient:()=>request('/get_patient','GET',{}),

    // 提交图文咨询
    GrapHics:(data:Graphics)=>request('/graphics','POST',data),

    // 提交就诊人
    PatientRes:(data:Patientres)=>request('/patient_res','POST',data),

    // 获取短视频数据
    VideoList:(data:{page:number})=>request('/video_list','GET',data),

    // 获取体检筛选条件
    Phyterm:()=>request('/phyterm','GET',{}),

    // 获取全部体检套餐
    Physet:()=>request('/physget','GET',{}),

    // 筛选体检套餐
    Phyquery:(data:Filterdata)=>request('/phyquery','POST',data),

    // 体检详情
    Phydetail:(data:PhyDetail)=>request('/phydateil','GET',data),

    // 体检预约提交
    ResPhy:(data:PhyApi)=>request('/resphy','POST',data),

    // 获取抑郁症的题目
    DepressionTopics:()=>request('/depression_topics','GET',{}),

    // 获取早泄的题目
    PrematureTopics:()=>request('/premature_topics','GET',{}),

    // 获取失眠的题目
    InsomniaTopics:()=>request('/insomnia_topics','GET',{}),

    // 抑郁症测评结果
    DepressIson:(data:{value:string[]})=>request('/depression','GET',data),

    // 早泄测评结果
    Premature:(data:{value:string[]})=>request('/premature','GET',data),

    // 失眠测评结果
    Insomnia:(data:{value:string[]})=>request('/insomnia','GET',data)
}

// 图片上传接口地址
let IMGURL = baseUrl + '/upload_picture'
// 身份证识别
let AICARD = baseUrl + '/ai_card'

export {RequestApi,IMGURL,AICARD}

