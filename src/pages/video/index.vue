<template>
    <!-- 医师课堂页面 -->
    
    <view class="video-view" v-for="(item,index) in video_data" :key="index">
        <view class="video-area">
            <video
            :src="item.video_url"
            :id="item._id"
            :controls="item.controls"
            :show-center-play-btn="false"
            object-fit="cover"
            :title="item.video_title">
            </video>
            <text class="video-title">{{ item.video_title }}</text>
            <image v-if="item.play_but" @click="startPlay(item._id,index)" src="/static/other/video-bofang.png" mode="widthFix"></image>
        </view>
        <view class="video-name">
            <image :src="item.avatar" mode="widthFix"></image>
            <text>{{ item.name }}</text>
        </view>
    </view>

    <!-- 加载图标 -->
    <view class="Loading">
        <image v-if="loading" src="/static/other/loading.svg" mode="widthFix"></image>
    </view>
</template>

<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import {RequestApi} from '@/utils/request'
import type{VideoType} from "@/types/decl-type"
import { onReachBottom, onShow } from '@dcloudio/uni-app';

 

// 获取页面数据
let video_data = ref<VideoType[]>([])

onMounted(()=>{
    resVideoData(0)
})

interface ResData{
    data:{data:VideoType[]}
}
const resVideoData = async (page:number)=>{
    const res = await RequestApi.VideoList({page}) as ResData
    video_data.value = [...video_data.value,...res.data.data]
    // console.log(video_data.value,'1');
    
}

// 上拉加载
let loading = ref(false)
let page_value = ref(0)
onReachBottom(async()=>{
  loading.value = true
  page_value.value++
  await resVideoData(page_value.value)
  loading.value = false
})

// 自定义播放按钮播放视频
const startPlay=(id:string,index:number)=>{
  video_data.value[index].controls = true
  video_data.value[index].play_but = false
  dealwith(id,index)
}
// 处理视频的暂停和播放
let videoId = ref("")  //存放视频播放的id
let videoIndex = ref(-1)  //存放播放视频的index
// 处理视频暂停和播放
const dealwith = (id:string,index:number)=>{
  if(videoId.value == ''){
    // 初次渲染
    videoId.value = id
    videoIndex.value = index
    uni.createVideoContext(videoId.value).play()
  }else{
    // 已有视频在播放，让上一个视频暂停，当前视频播放
    let prevideo_id = uni.createVideoContext(videoId.value)
    if(videoId.value != id){
      prevideo_id.pause() //上一个视频暂停
      pauseFun(videoIndex.value) //让上一个视频的按钮显示
    }
    // 当前视频
    setTimeout(() => {
      videoId.value = id
      videoIndex.value = index
      uni.createVideoContext(videoId.value).play()
    }, 700);
  }
}
// 暂停时触发
function pauseFun(index:number){
  video_data.value[index].controls = false
  video_data.value[index].play_but = true
}

// 离开页面之后暂停视频
onShow(()=>{
  uni.createVideoContext(videoId.value).pause()
})


</script>

<style scoped>
page{
  background: #f5f5f5;
}
.video-view{
  background-color: #ffffff;
  margin-bottom: 30rpx;
}
.video-area{
  height: 400rpx;
  position: relative;
}
.video-area video{
  height: 400rpx;
  width: 100%;
  display: block;
}
.video-area image{
  width: 100rpx;
  height: 100rpx;
  display: block;
  position: absolute;
	bottom: 0;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.video-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 99;
  color: #ffffff;
  font-size: 35rpx;
  font-weight: bold;
}
.video-name{
  display: flex;
  align-items: center;
  padding: 20rpx;
}
.video-name image{
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-right: 20rpx;
  border-radius: 50%;
}
/* loading */
.Loading{
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Loading image{
  display: block;
  width: 70rpx;
  height: 70rpx;
  animation: myfirst 1s infinite linear;
}
@keyframes myfirst
{
from {transform: rotate(0deg);}
to {transform: rotate(359deg);}
}
</style>