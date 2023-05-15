<template>
    <!-- 选择就诊人页面 -->

    <view class="patient-infor" v-for="(item, index) in patient" :key="index"
    @click="checkedData(item.name, item._id)"
    >
        <view class="patient-flex">
            <text class="patient-name">{{item.name}}</text>
            <text class="patient-text">{{item.relation}}</text>
        </view>
        <view class="patient-flex patient-sex">
            <text>{{item.sex}}</text>
            <text>{{item.age}}岁</text>
            <text>{{item.phone}}</text>
        </view>
    </view>
    <!-- 提交 -->
    <view class="submit">
        <text @click="canCel">取消</text>
        <text @click="addTo">添加就诊人</text>
    </view>
    <point :show="show" :title="title"/>
    <view style="height:300rpx"></view>
</template>

<script setup lang="ts">
import Point from '@/com-components/Point.vue'
import { ref } from 'vue';
import type{Mypatient} from '@/types/decl-type'
import { onShow } from '@dcloudio/uni-app';
import {RequestApi} from '@/utils/request'
import {usePatient} from '@/store/index'

let show = ref(false)
let title = ref("你还没有就诊人")
let patient = ref<Mypatient[]>([])

interface ResData{
    data:{data:[]}
}

onShow(async()=>{
    const res =  await RequestApi.Getpatient() as ResData
    patient.value = res.data.data
    if(res.data.data.length == 0){
        show.value = true
    }
})

// 取消
const canCel = ()=>{
    uni.navigateBack({delta:1})
}

// 添加就诊人
const addTo = ()=>{
    uni.navigateTo({url:"/pages/my-service/my-patient/add-patient"})
}

let store = usePatient()

// 选择就诊人
const checkedData = (name:string,_id:string)=>{
    store.addPatient({name,_id})
    uni.navigateBack({delta:1})
}
</script>

<style>
  @import url('../../../common-style/form.css');
  page{
    background-color: #f6f6f6;
  }
  .patient-infor{
    background-color: #ffffff;
    margin: 20rpx;
    border-radius: 15rpx;
    font-size: 28rpx;
  }
  .patient-flex{
    display: flex;
    align-items: center;
    padding: 20rpx;
  }
  .patient-name{
    font-size: 35rpx;
    font-weight: bold;
  }
  .patient-flex text{
    margin-right: 15rpx;
  }
  .patient-text{
    background-color: #d6f3ff;
    color: #78beff;
    padding: 2rpx 15rpx;
  }
  .patient-sex{
    color: #7c96af;
  }

  .submit {
    background-color: #ffffff;
    padding: 20rpx 0 68rpx 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    z-index: 99;
}
.submit text:nth-child(1) {
    background-color: #e8f2fe;
    color: #3a75f3;
}
.submit text {
    width: 40%;
    text-align: center;
    padding: 20rpx 0;
    border-radius: 10rpx;
}
.submit text:nth-child(2) {
    background-color: #2c76ef;
    color: #ffffff;
}
</style>