<template>
    <!-- 新冠疫苗订单页面 -->

    <view class="xinguan-view" v-for="(item,index) in coviduserOrder" :key="index">
        <text class="name">{{ item.name }}</text>
        <view class="xinguan-order">
            <text>接种地点:</text>
            <text>{{ item.address }}</text>
        </view>
        <view class="xinguan-order">
            <text>疫苗厂商:</text>
            <text>{{ item.company }}</text>
        </view>
        <view class="xinguan-order">
            <text>接种时间:</text>
            <text>{{ item.time }}</text>
        </view>
        <view class="reg-cancel">
            <text 
            :class="item.cancel?'':'prevent_style'"
            @click="cancel(item._id,index)">
                {{ item.cancel? '取消预约':'已取消预约' }}
            </text>
        </view>
    </view>

    <Point :show="show"></Point>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {onShow} from '@dcloudio/uni-app'
import { RequestApi } from '@/utils/request';
import type{CoviduserOrderApi} from '@/types/decl-type'
import Point from '@/com-components/Point.vue'

let coviduserOrder = ref<CoviduserOrderApi[]>([])

onShow(()=>{
    getCoviduserOrder()
})


let show=ref(false)


const getCoviduserOrder = async ()=>{
    let res = (await RequestApi.CoviduserOrder()) as {data:{data:[]}}
    // console.log(res,'res')
    coviduserOrder.value=res.data.data
    if(res.data.data.length == 0){
        show.value===true
    }
}


const cancel= async (id:string,index:number)=>{
    let res = await RequestApi.Covidcancel({_id:id}) as {statusCode:number}
    if(res.statusCode===200){
        coviduserOrder.value[index].cancel=false
    }
}
</script>

<style scoped>
.xinguan-view {
    background-color: #ffffff;
    border-radius: 15rpx;
    margin: 20rpx;
    padding: 20rpx;
}
.name {
    font-weight: bold;
    border-bottom: 1rpx solid #e4e4e4;
    display: block;
    padding-bottom: 20rpx;
    font-size: 35rpx;
}
.xinguan-order {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
}
.xinguan-order text:nth-child(1) {
    width: 150rpx;
}
.xinguan-order text:nth-child(2) {
    flex: 1;
}
.reg-cancel {
    display: flex;
    justify-content: flex-end;
    padding-top: 20rpx;
}
.reg-cancel text {
    color: #0176ff;
    border: 1rpx solid #0176ff;
    padding: 15rpx 30rpx;
    display: inline-block;
    border-radius: 15rpx;
}
.prevent_style {
    pointer-events: none;
    border: 1rpx solid #999aaa !important;
    color: #999aaa !important;
}
</style>