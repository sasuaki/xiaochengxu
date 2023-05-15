<template>
  <!-- 自定义导航 -->
  <view class="nav-gation">
    <view class="nav-top"></view>
    <view class="nav-height">某某第一人民医院</view>
  </view>

  <view class="yuyue">
    <image src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png" mode="aspectFill"></image>
  </view>

  <!-- 疫苗预约 -->
  <view class="gongge">
    <view 
    v-for="(item,index) in vaccine"
    :key="index"
    @click="vaccineApp(index)"
    >
      <image :src="item.image" mode="aspectFill"></image>
      <text>{{ item.title }}</text>
    </view>
  </view>

  <!-- 挂号和体检 -->
  <view class="guahao">
    <view
    class="guahao-view"
    v-for="(item,index) in reserve"
    :key="index"
    @click="changeTo(index)">
      <text class="guahao-title">{{ item.title }}</text>
      <text class="guahao-lable">{{ item.describe }}</text>
      <image :src="item.image" mode="widthFix"></image>
    </view>
  </view>

  <!-- 热门挂号 -->
  <view class="rmguahao">
    <view>热门挂号</view>
    <view class="rmguahao-More">
      <text>查看更多</text>
      <image src="/static/other/gengduo.svg"></image>
    </view>
  </view>
  <view class="rmguahao-reg">
    <view
    v-for="(item,index) in popular"
    :key="index"
    :style="'background-color:' + item.background"
    >
      <text>{{ item.title }}</text>
      <image :src="item.image"></image>
    </view>
  </view>

  <!-- 健康自测 -->
  <view class="jkzice" v-if="selftest.length > 0">
    <view class="jkzice-title">健康自测</view>
      <!-- 横向 -->
    <view 
      class="jkzice-top"
      v-for="(item,index) in [selftest[0]]"
      :key="index"
      @click="jumpAssess(item.name,index,'001')"
      >
        <view class="ceping">
          <text class="ceping-title">{{item.name}}</text>
          <text class="ceping-describe">{{item.describe}}</text>
          <view>
            <text class="ceping-number">{{item.number_of_people}}</text>
            <text class="ceping-content">人测过/{{item.question}}题/{{item.minute}}分钟</text>
          </view>
        </view>
        <image :src="item.image" mode="widthFix"></image>          
    </view>
    <!-- 纵向 -->
    <view 
      class="jkzice-bottom"
      v-for="(item,index) in selftest.slice(1)"
      :key="index"
      @click="jumpAssess(item.name,index,'002')"
      >
        <view class="ceping">
          <text class="ceping-title">{{item.name}}</text>
          <text class="ceping-describe">{{item.describe}}</text>
          <view>
            <text class="ceping-content">{{item.question}}题/{{item.minute}}分钟</text>
            <text class="ceping-number">{{item.number_of_people}}</text>
            <text class="ceping-number-con">人测过</text>
          </view>
        <image :src="item.image" mode="widthFix"></image>    
        </view>      
    </view>
  </view>


  <!-- 跳转到登录页 -->
  <navigator url="/pages/login/index">登录页</navigator>

</template>

<script setup lang="ts">
import {RequestApi} from '../../utils/request';
import { onMounted,ref } from 'vue';
import type {Vaccine,Reserve,Popular,Selftest} from '@/types/decl-type';



// 胶囊按钮距离顶部的高度
let menu_top =ref<string>("")
// 胶囊按钮的高度
let menu_height = ref<string>("")

// 定义变量存储首页第一项数据
let vaccine=ref<Vaccine[]>([])
// 首页第二项数据
let reserve=ref<Reserve[]>([])
// 首页第三项数据
let popular=ref<Popular[]>([])
// 首页第四项数据
let selftest=ref<Selftest[]>([])

onMounted(()=>{
  let MenuButton=uni.getStorageSync('MenuButton') as {top:number;height:number}
  // console.log(MenuButton,'MenuButton');
  menu_top.value = MenuButton.top +'px'
  menu_height.value = MenuButton.height +'px'
  getPageData()
})

// 首页数据请求
let getPageData=async()=>{
  const res:any = await RequestApi.Frontpage()
  // console.log(res);
  // 数组的第一项
  vaccine.value = res.data.data[0].vaccine
  // 数组的第二项
  reserve.value = res.data.data[1].reserve
  // 数组的第三项
  popular.value = res.data.data[2].popular
  // 数组的第四项
  selftest.value = res.data.data[3].self_test
}



// 疫苗预约
const vaccineApp=(index:number)=>{
  switch(index){
    case 0:
      uni.navigateTo({url:"/pages/xinguan-vaccine/index"});
      break;
    case 1:
      uni.navigateTo({url:"/pages/hpv-vaccine/index"});
      break;
    case 2:
      uni.navigateTo({url:"/pages/nucleic-acid/index"});
      break;
    case 3:
      uni.navigateTo({url:"/pages/graphics/index"});
      break;
  }
}



// 点击健康体检
  const changeTo=(index:number)=>{
    if(index==1){
      uni.navigateTo({url:"/pages/phy-exam/index"})
    }
  }



// 健康自测路由跳转
function jumpAssess(name:string,index:number,type:string){
  if(type == '001'){
    uni.navigateTo({
      url:"/pages/self-test/topic?type=001&name="+name
    })
  }else{
    if(index == 0){
      uni.navigateTo({
        url:"/pages/self-test/topic?type=002&name="+name
      })
    }else{
      uni.navigateTo({
        url:"/pages/self-test/topic?type=003&name="+name
      })
    }
  }
}

</script>

<style>
.nav-gation{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  z-index: 99;
}
/* 空壳子 */
.nav-top{
  /* setup语法 */
  height: v-bind('menu_top');
}
.nav-height{
  height: v-bind('menu_height');
  line-height: v-bind('menu_height');
  padding-left: 20rpx;
  color: #000;
  font-size: 15px;
  /* 字体加粗 */
  font-weight: bold;
}

.yuyue image{
  width: 100%;
  display: block;
  height: 550rpx;
}

/* 预约挂号 */
.gongge{
  display: flex;
  /* 主轴方向左到右：项目两端对齐，间距相等 */
  justify-content: space-between;
  margin: 40rpx 30rpx;
}
.gongge image{
  width: 50rpx;
  height: 50rpx;
  display: block;
  padding-bottom: 20rpx;
}
.gongge view{
  /* 弹性布局 */
  display: flex;
  /* 决定主轴方向：垂直向下 */
  flex-direction: column;
  /* 交叉轴的中点对齐 */
  align-items: center;
  font-size: 28rpx;
}

/* 预约和体检 */
.guahao{
  display: flex;
  align-items: center;
  /* 项目在主轴上的对齐方式：两端对齐，项目之间的间隔都相等 */
  justify-content: space-between;
}
.guahao-view{
  position: relative;
  height: 200rpx;
  width: 48%;
}
.guahao-view image{
  width: 150rpx;
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
}
.guahao-view:nth-child(1){
  /* 渐变色 */
  background: linear-gradient(to right,#f9dcb9,#f8d39b,#f6c97e);
  border-radius: 20rpx;
}
.guahao-view:nth-child(2){
  background: linear-gradient(to right,#d8defc,#a9c3fa,#6d9ff7);
  border-radius: 20rpx;
}
.guahao-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 25px;
  color: blue;
}
.guahao-lable{
  position: absolute;
  top: 90rpx;
  left: 20rpx;
  font-size: 20px;
  color: white;
}

/* 热门挂号 */
.rmguahao{
  display: flex;
  /* 主轴方向默认从左到右：两端对齐，间距相等 */
  justify-content: space-between;
  /* 交叉轴中点对齐 */
  align-items: center;
  padding: 40rpx 10rpx 10rpx 10rpx;
  /* 字体加粗 */
  font-weight: bold;
}
.rmguahao-More{
  display: flex;
  /* 交叉轴中心对齐 */
  align-items: center;
}
.rmguahao-More image{
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin-left: 10rpx;
}
.rmguahao-reg{
  display: flex;
  /* 主轴默认方向左到右：项目两端对齐，间距相等 */
  justify-content: space-between;
  /* 项目沿轴线排列，换行第一行在上 */
  flex-wrap: wrap;
  margin: 10rpx;
}
.rmguahao-reg view{
  width: calc(33% - 30rpx *2);
  margin: 10rpx;
  padding: 20rpx;
  display: flex;
  /* 交叉轴的中心对齐 */
  align-items: center;
  font-size: 30rpx;
  /* 主轴方向左到右：项目两端对齐，间距相等 */
  justify-content: space-between;
  border-radius: 10rpx;
}
.rmguahao-reg image{
  width: 50rpx;
  height: 70rpx;
}

/* 健康自测 */
.jkzice {
  display: flex;
  /* 主轴方向左到右：项目两端对齐，间距相等， */
  justify-content: space-between;
  /* 项目沿轴线排列，换行第一行在上 */
  flex-wrap: wrap;
  /* 字体加粗 */
  margin: 40rpx 10rpx 10rpx 10rpx;
}
.jkzice-title{
  font-weight: bold;
}
.jkzice-top{
  position: relative;
  width: 100%;
  height: 280rpx;
  border-radius: 20rpx;
}
.jkzice-top image{
  position: absolute;
  display: block;
  width: 300rpx;
  bottom: 0;
  right: 0;
}
.jkzice-top .ceping-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 38rpx;
  font-weight: bold;
}
.jkzice-top .ceping-describe{
  position: absolute;
  top: 80rpx;
  left: 20rpx;
  color: gray;
}
.jkzice-top .ceping view{
  position: absolute;
  top: 150rpx;
  left: 20rpx;
}
.jkzice-top .ceping-number{
  font-size: 38rpx;
  font-weight: bold;
}
.jkzice-bottom{
  position: relative;
  width: 48%;
  height: 280rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;
}
.jkzice-bottom image{
  position: absolute;
  display: block;
  width: 160rpx;
  bottom: 0;
  right: 0;
}
.jkzice-bottom .ceping-title{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 38rpx;
  font-weight: bold;
}
.jkzice-bottom .ceping view{
  position: absolute;
  top: 80rpx;
  left: 20rpx;
  color: gray;
}
.jkzice-bottom .ceping-number{
  position: absolute;
  top: 100rpx;
  left: 0;
  font-weight: bold;
  color: #000;
}
.jkzice-bottom .ceping-number-con{
  position: absolute;
  top: 112rpx;
  left: 75rpx;
  font-size: 18rpx;
}
</style>
