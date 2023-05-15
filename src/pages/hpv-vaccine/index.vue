<template>
    <view class="hpv-img">
        <image src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg"></image>
    </view>

    <!-- 切换导航 -->
    <view class="tab-view">
        <view 
        class="tab-toggle"
        v-for="(item,index) in hpv_select"
        :key="index"
        @click="toggle(item._id,index)">
            <text>{{ item.name }}</text>
            <text :class="index===checked? 'checked':''"></text>
        </view>
    </view>

    <!-- 列表 -->
    <view 
    class="hpv-list" 
    v-for="(item,index) in hpv_list"
    :key="index">
        <view>
            <view class="hpv-type">{{ item.name }}</view>
            <view class="hpv-age">
                <text 
                v-for="(ite,ind) in item.describe" 
                :key="ind">
                    {{ ite }}
                </text>
            </view>
            <view class="hpv-price">{{ item.price[0] }}-{{ item.price[1] }}</view>
        </view>
        <view 
        class="hpv-reserve"
        @click="toReserve(item._id,item.name,item.price,item.describe)">去预约</view>
    </view>
</template>

<script setup lang="ts">
    import { RequestApi } from '@/utils/request';
    import {onMounted, ref} from 'vue'
    import type {Hpvselect,Hpvlist} from '@/types/decl-type'

    let hpv_select=ref<Hpvselect[]>([])
    let hpv_list=ref<Hpvlist[]>([])
    let hpv_all = ref<Hpvlist[]>([])

    let checked = ref(0)

    interface Resdata{
        data:{data:[{hpv_select:Hpvselect[],hpv_list:Hpvlist[]}]}
    }

    onMounted(async ()=>{
        let res = await RequestApi.Otuhpv() as Resdata
        // console.log(res);
        hpv_select.value = res.data.data[0].hpv_select
        hpv_list.value = res.data.data[0].hpv_list
        hpv_all.value = res.data.data[0].hpv_list
    })

    // 筛选疫苗列表
    const toggle = (id:string,index:number)=>{
        checked.value = index
        let res = hpv_all.value.filter(item=>item.hpv_id == id)
        if(id==='26da8e4962dc565503df9629704f1700'){
            hpv_list.value = hpv_all.value
        }else{
            hpv_list.value = res
        }
    }

    // 跳转到详情
    const toReserve=(_id:string,name:string,price:string[],describe:string[])=>{
        let obj = JSON.stringify({_id,name,describe,price})
        uni.navigateTo({
            url:"/pages/hpv-vaccine/hpv-buy?value=" + obj
        })
    }

</script>

<style scoped>
.hpv-img{
    height: 350rpx;
}
.hpv-img  image{
    height: 350rpx;
    width: 100%;
    display: block;
}

/* 导航 */
.tab-view {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
}

.tab-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100rpx;
    justify-content: center;
    position: relative;
}
.checked {
    width: 50rpx;
    height: 8rpx;
    background-color: #0d7cff;
    position: absolute;
    bottom: 0;
}

.hpv-list {
    background-color: #ffffff;
    margin: 20rpx;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    border-radius: 20rpx;
}
.hpv-type {
    font-size: 35rpx;
}
.hpv-age {
    display: flex;
    align-items: center;
}
.hpv-age text {
    background-color: #f4f6fa;
    padding: 7rpx;
    font-size: 25rpx;
    margin: 10rpx 10rpx 10rpx 0;
}
.hpv-price {
    font-weight: bold;
    color: #ff5f2c;
}
.hpv-reserve {
    align-self: flex-end;
    background-color: #0d7cff;
    padding: 15rpx 30rpx;
    border-radius: 40rpx;
    color: #ffffff;
}
</style>