<template>
    <view class="login">
        <image
        mode="aspectFill"
        src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg"
        ></image>
        <button @click="Login">授权登录</button>
    </view>>
</template>

<script setup lang="ts">
import {RequestApi} from '@/utils/request'
    const Login = ()=>{
        // 1.获取用户信息(用户头像avatarUrl，昵称nickName)
        uni.getUserInfo({
            withCredentials:false,
            lang:"zh-CN",
            success:(res)=>{
                // console.log(res,0);
                const {avatarUrl,nickName}=res.userInfo
                //2.调用小程序api返回一个code，对接后台接口要用
                uni.login({
                    success:({code})=>{
                        // console.log(code,'codeRes');
                        uni.showToast({title:"登陆中",mask:true}) //是否显示透明蒙层，防止触摸穿透
                        ApiLogin(avatarUrl,nickName,code)
                    },
                    fail:(err)=>{
                        uni.showToast({title:"登录失败",icon:'none',duration:1000})
                    }
                })
            }
        })
    }

    // 封装调用登录接口的函数
    async function ApiLogin(avatarUrl:string,nickName:string,code:string) {
        try{
            let obj={
                appid:"wxc61ba5c6d9cea99d",
                secret:"ff88cf05726e6cbcc3a54441453cdc8b",
                nickName,
                avatarUrl,
                code
            }
            let res:any=await RequestApi.WxLogin(obj)
            // console.log(res,"res");
            // 用户信息存储到本地
            uni.setStorageSync('wxuser',res.data.data)
            // 返回上一页
            setTimeout(()=>{
                uni.navigateBack({delta:1});
                uni.hideLoading()
            })
        }catch(error){
            uni.showToast({title:"登录失败",icon:'none',duration:1000})
        }
    }
</script>

<style >
.login{
    position: relative;
    height: 100vh;
    overflow: hidden;
}
.login image{
    width: 100%;
    height: 100%;
}
.login button{
    position: absolute;
    left: 50%;
    bottom: 30%;
    background-color: blue;
    color: #fff;
    padding: 0 100rpx;
    font-size: 35rpx;
    transform: translate(-50%,-50%);
}
</style>