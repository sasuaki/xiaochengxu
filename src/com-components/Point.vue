<template>
    <view class="point" v-if="show">
        <image src="/static/other/kongshuju.jpg" mode="widthFix"></image>
        <text>{{ title }}</text>
    </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{show:boolean,title?:string}>(),{
    show:false,
    title:"你还没有订单"
})
</script>

<style scoped>
.point{
    display: flex;
    /* 主轴方向上到下 */
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    color: #e7e7e7;

}
.point image{
    display: block;
    width: 200rpx;
    height: 230rpx;
}
</style>