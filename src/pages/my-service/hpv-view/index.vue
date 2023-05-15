<template>
    <!-- HPV疫苗订单页面 -->

    <view 
    class="xinguan-view"
    v-for="(item,index) in order"
    :key="index">
        <text class="name">{{ item.hpv_name }}</text>
        <view class="xinguan-order">
            <text>接种人:</text>
            <text>{{ item.name }}</text>
        </view>
        <view class="xinguan-order">
            <text>接种地点:</text>
            <text>{{ item.address }}</text>
        </view>
        <view class="xinguan-order">
            <text>疫苗套餐:</text>
            <text>{{ item.combo }} {{ item.ino_time }}</text>
        </view>
        <view class="xinguan-order">
            <text>订单编号:</text>
            <text>{{ item.order_number }}</text>
        </view>
        <view class="reg-price">
            <text>￥{{ item.price }}</text>
        </view>

        <!-- 取消预约 -->
        <view class="reg-cancel">
            <text @click="cancel(item._id,index)" :class="item.cancel ? '': 'prevent_style'">{{ item.cancel? '取消预约' : '已取消预约' }}</text>
        </view>


        <!-- 提示组件 -->
        <point :show="show" />
        <view style="height:200rpx"></view>
    </view>>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type{HpvorderApi} from '@/types/decl-type'
import Point from '@/com-components/Point.vue'
import { onShow } from '@dcloudio/uni-app';
import { RequestApi } from '@/utils/request';
    // 获取订单的数据
    let order = ref<HpvorderApi[]>([])
    let show = ref(false)

    onShow(async ()=>{
        const res = await RequestApi.Hpvuser() as {data:{data:[]}}
        order.value = res.data.data
        // console.log(res.data.data);
        
        if(res.data.data.length == 0){
            show.value = true
        }
    })

    const cancel = async(id:string,index:number)=>{
        const res = await RequestApi.HpvCancel({_id:id}) as {statusCode:number}
        if(res.statusCode == 200){
            order.value[index].cancel = false
        }
    }
</script>

<style scoped>
@import url("@/common-style/vaccine.css");
</style>