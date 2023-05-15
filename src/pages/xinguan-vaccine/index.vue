<template>
    <view class="xinguan-view">
        <view class="xinguan-flex">
            <text>姓名</text>
            <input type="text"
            placeholder="请输入姓名"
            v-model="xg_data.name"
            placeholder-class="input-style"	
            >
        </view>
        <view class="xinguan-flex">
            <text>身份证</text>
            <input type="text"
            placeholder="请输入身份证"
            v-model="xg_data.id_card"
            placeholder-class="input-style"	
            >
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input type="text"
            placeholder="请输入手机号"
            v-model="xg_data.phone"
            placeholder-class="input-style"	
            >
        </view>
        <view class="xinguan-flex">
            <text>现居地址</text>
            <picker mode="region" class="flex-left" @change="changeRegion">
                <view>
                    <text>{{ xg_data.address===""? "请选择现居地址":xg_data.address }}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>现居详细地址</text>
            <input type="text"
            placeholder="现居详细地址"
            v-model="xg_data.de_address"
            >
        </view>
        <view class="xinguan-flex">
            <text>疫苗人群分类</text>
            <picker mode="selector" class="flex-left" :range="selector_data" @change="changeSelector">
                <view>
                    <text>{{ xg_data.crowd_sort===""?"请选择疫苗人群分类":xg_data.crowd_sort }}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>

        <view>
            <!-- 医院地址 -->
            <view class="reserve-address">
                <text class="reserve-name">{{ timeData.data.Hospital }}</text>
                <text class="reserve-road">{{ timeData.data.address }}</text>
                <text class="reserve-title">
                    <text v-for="(item,index) in timeData.data.company" :key="index">
                        {{ item }}
                    </text>
                </text>
            </view>


            <!-- 星期 -->
            <view class="week">
                <view class="week-flex" v-for="(item,index) in timeData.data.week" :key="index">
                    <view
                    class="week-style week-sup"
                    :class="xg_data.date==''? '':'checkstyle'"
                    @click="chooseWeek(item.date)"
                    >
                        <text>{{ item.day }}</text>
                        <text>{{ item.date }}</text>
                        <text>{{ item.Have }}</text>
                    </view>
                </view>
            </view>


            <!-- 时段 -->
            <view class="period-view"
            v-for="(item,index) in timeData.data.lasting"
            :key="index">
                <text class="period-title">{{ item.period }}</text>
                <view class="week-flex">
                    <block v-for="(ite,ind) in item.time" :key="ind">
                        <view 
                        class="week-style week-down"
                        :class="index + '-' + ind===timeIndex? 'checkstyle':''"
                        @click="chooseTime(
                            index + '-' + ind,
                            item.period,
                            ite.start_time,
                            ite.end_time,
                            ite.when
                            )"
                        >
                            <text>{{ ite.start_time }}-{{ ite.end_time }}</text>
                            <text>剩余{{ ite.when }}</text>
                        </view>
                    </block>
                </view>
            </view>  
        </view>
        </view>
    <!-- 底部按钮 -->
    <view style="height:300rpx">
        <view class="submit">
            <text @click="cancel">取消</text>
            <text @click="submit">提交预约</text>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { onMounted, reactive,ref,toRefs } from 'vue';
    import {RequestApi} from '@/utils/request'
    import type {Newapptime} from '@/types/decl-type'

    // 要提交的数据
    let SubmitData=reactive({
        xg_data:{
            name:"",
            id_card:"",
            phone:"",
            address:"",
            de_address:"",
            crowd_sort:"",  //人群分类
            date:"",
            period:"",
            reserve_time:"",
            when:0
        }
    })
    let {xg_data} = toRefs(SubmitData)

    // 疫苗人群分类
    let selector_data=ref([
        '医疗卫生人员',
        '卫生系统内工作的其他人员',
        '因公出国人员',
        '对外派遣人员'
    ])


    // 医院地址和时间
    let timeData=reactive<{data:Newapptime}>({
        data:{
            Hospital:"",
            address:"",
            company:[],
            lasting:[],
            week:[]
        }
    })

    onMounted(async ()=>{
        const res:any = await RequestApi.Newapptime()
        // console.log(res,"timedata");
        timeData.data=res.data.data[0]
        
    })


    const changeRegion=(event:any)=>{
        let address=''
        event.detail.value.forEach((item:string)=>{address += item + ''})
        SubmitData.xg_data.address=address
    }

    const changeSelector=(event:any)=>{
        SubmitData.xg_data.crowd_sort = selector_data.value[event.detail.value]
    }


    // 选择星期
    const chooseWeek=(date:string)=>{
        SubmitData.xg_data.date=date
    }
    // 选择时段
    let timeIndex=ref('1')
    const chooseTime=(
        index:string,
        period:string,
        start_time:string,
        end_time:string,
        when:number
    )=>{
        console.log(index);
        timeIndex.value=index
        SubmitData.xg_data.period=period
        SubmitData.xg_data.reserve_time=start_time+'-'+end_time
        SubmitData.xg_data.when=when
    }

    // 底部按钮
    // 取消
    const cancel=()=>{
        uni.navigateBack({delta:1})
    }
    // 确定
    const submit=async ()=>{
        uni.showLoading({title:"提交中",mask:true})
        let res:any = await RequestApi.Rescovid(SubmitData.xg_data) as {statusCode:200}
        // console.log(res,'any');
        if(res.statusCode===200){
            uni.hideLoading()
            uni.navigateTo({url:'/pages/my-list/xglist/index'})
        }
    }
</script>

<style >
    @import url('~@/common-style/form.css');

    .reserve-address{
        background-color: #fff;
        padding: 20rpx;
        margin: 20rpx;
        border-radius: 10rpx;
    }
    .reserve-address>text{
        display: block;
    }
    .reserve-name{
        font-weight: bold;
    }
    .reserve-road{
        padding: 20rpx 0;
    }
    .reserve-title{
        display: flex;
        align-items: center;
    }
    .reserve-title text{
        background-color: #f7f7f7;
        padding: 5rpx 20rpx;
        font-size: 25rpx;
        margin-right: 10rpx;
    }

    .week{
        background-color: #fff;
        padding: 20rpx;
        border-radius: 10rpx;
        margin: 20rpx;
        display: flex;
        /* 交叉轴中心对齐 */
        align-items: center;
    }
    .week-flex{
        display: flex;
    }
    .week-style{
        display: flex;
        /* 主轴方向上到下 */
        flex-direction: column;
        background-color: #f7f7f7;
        text-align: center;
        padding: 20rpx 0;
        border-radius: 10rpx;
        margin-right: 20rpx;
    }
    .week-sup{
        width: 150rpx;
    }
    .week-style text{
        padding: 3rpx;
    }
    /* 选中样式 */
    .checkstyle{
        background-color: #2c76ef !important;
        color: #fff !important;
    }
    .period-view{
        background-color: #fff;
        padding: 20rpx;
        border-radius: 10rpx;
        margin: 20rpx;
    }
    .period-title{
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
    }
    .week-down{
        width: 200rpx;
    }

    /* 底部按钮 */
    .submit{
        background-color: #fff;
        padding: 20rpx 0 68rpx 0;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        /* 均匀排列每个元素每个元素周围分配相同的空间  */
        justify-content: space-around;
        z-index: 99;
    }
    .submit text:nth-child(1){
        background-color: #e8f2fe;
        color: #3a75f3;
    }
    .submit text:nth-child(2){
        background-color: #e8f2fe;
        color: #3a75f3;
    }
    .submit text{
        width: 40%;
        text-align: center;
        padding: 20rpx 0;
        border-radius: 10rpx;
    }
</style>