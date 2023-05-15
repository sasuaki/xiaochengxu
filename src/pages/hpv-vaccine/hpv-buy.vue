<template>
    <view class="hpv-choose">
        <view>
            <view class="hpv-type">{{ router_value.name }}</view>
            <view class="hpv-age">
                <text 
                v-for="(item,index) in router_value.describe"
                :key="index">
                    {{ item }}
                </text>
            </view>
        </view>
        <view class="hpv-price">
            {{ router_value.price[0] }}--{{ router_value.price[1] }}
        </view>
    </view>


    <!-- 表单数据 -->
    <view class="xinguan-flex">
            <text>姓名</text>
            <input type="text"
            placeholder="请输入真实姓名"
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
            <text>性别</text>
            <picker mode="selector" class="flex-left" @change="changeSelector" :range="['男','女']">
                <view>
                    <text>{{ xg_data.gender===""? "请选择性别":xg_data.gender }}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>出生日期</text>
            <picker mode="date" class="flex-left" @change="changeDate">
                <view>
                    <text>{{ xg_data.born_date===""? "请选择出生日期":xg_data.born_date }}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input type="text"
            placeholder="请输入手机号"
            v-model="xg_data.phone"
            placeholder-class="input-style"	
            >
        </view>



        <!-- 选择套餐 -->
        <view class="combo-view">
            <block 
            v-for="(item,index) in hpv_combo_name" 
            :key="index">
                <text class="combo-title">{{item.title}}</text>
                <view class="combo-list">
                    <text 
                    :class="index_a===COMBO?'checkstyle':''" 
                    v-for="(item_a,index_a) in item.name" 
                    :key="index_a"
                    @click="changeCombo(index_a,item_a.combo_id,item_a.combo)">
                        {{item_a.combo}}
                    </text>
                </view>
            </block>
            <!-- 接种时间 -->
            <block
            v-for="(item,index) in hpv_combo_time"
            :key="index">
                <text class="combo-title">{{item.title}}</text>
                <view class="combo-list">
                    <text 
                    :class="index_b===TIME?'checkstyle':''" 
                    v-for="(item_b,index_b) in item.name" 
                    :key="index_b"
                    @click="changeTime(index_b,item_b.time_id,item_b.time)">
                        {{item_b.time}}
                    </text>
                </view>
            </block>
        </view>
        <!-- 提交 -->
        <view style="height: 300rpx;"></view>
        <view class="Total-view">
            <text>合计:{{ hpv_combo_price }}</text>
            <text @click="subMIT()">提交</text>
        </view>

        
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { reactive,ref, toRefs, watch } from 'vue';
import type{Hpvcomboname,Hpvcombotime} from '@/types/decl-type'
import { RequestApi } from '@/utils/request';


    // 接受上个页面数据的默认值
    let router_value = reactive({
        _id:'',
        name:'',
        price:['1'],
        describe:['1']
    })

    // 套餐数据--套餐名称
    let hpv_combo_name = ref<Hpvcomboname[]>([])

    // 接种时间
    let hpv_combo_time = ref<Hpvcombotime[]>([])
    
    // 定义数据返回的类型
    interface Resdata{
        data:{data:[Hpvcomboname,Hpvcombotime]}
    }


    // 页面加载时
    onLoad(async (event:any)=>{
        // 接收上个页面的数据
        let {_id,name,describe,price} =  JSON.parse(event.value)
        router_value._id = _id
        router_value.name = name
        router_value.price = price
        router_value.describe = describe

        const res = await RequestApi.Hpvpack() as Resdata
        // console.log(res,'套餐名称+接种时间');
        hpv_combo_name.value = [res.data.data[0]]
        hpv_combo_time.value = [res.data.data[1]]
    })

    // 选中套餐名称
    let COMBO = ref(-1)
    let combo_id = ref('')
    let combo_name = ref('')
    const changeCombo=(index:number,id:string,name:string)=>{
        COMBO.value = index
        combo_id.value = id
        combo_name.value = name
    }

    // 选中接种时间
    let TIME = ref(-1)
    let time_id =ref('')
    let time_time = ref('')
    const changeTime=(index:number,id:string,time:string)=>{
        TIME.value = index
        time_id.value = id
        time_time.value = time
    }

    // 监听选中套餐名称和接种时间请求价格
    watch([combo_id,time_id],(newVal,oldVal)=>{
        if(newVal[0]!='' && newVal[1] !=''){
            uni.showLoading({title:"获取价格",mask:true})
            // 统计价格
            hpvPrice()
        }
    })

    // 请求套餐价格

    let hpv_combo_price = ref(0.00)

    interface ResPrice{
        data:{data:[{price:number}]}
    }

    async function hpvPrice() {
        const res = await RequestApi.Hpvprice({
            hpv_id:router_value._id,
            combo_id:combo_id.value,
            time_id:time_id.value
        }) as ResPrice
        // console.log(res,"price");
        // 获取价格
        hpv_combo_price.value=res.data.data[0].price
        uni.hideLoading()
    }

    // 表单数据
    let gender = ref('')
    const changeSelector=(event:{detail:{value:string}}):void=>{
        xg_data.gender = event.detail.value === '0'? '男':'女'
    }

    // 出生日期
    let born_date = ref('')
    const changeDate=(event:{detail:{value:string}}):void=>{
        xg_data.born_date = event.detail.value
    }

    // 要提交的数据
    let xg_data = reactive({
        name:"",
        id_card:"",
        gender:"",
        born_date:"",
        phone:"",
        combo:"",
        ino_time:"",
        price:0,
        hpv_name:''
    })

    // 提交订单
    async function subMIT(){
        xg_data.price=hpv_combo_price.value
        xg_data.hpv_name=router_value.name
        xg_data.combo=combo_name.value
        xg_data.ino_time=time_time.value
        uni.showLoading({title:'提交中',mask:true})
        const res = await RequestApi.Reshpv(xg_data) as {statusCode:number}
        // console.log(res,"提交订单");
        if(res.statusCode == 200){
            uni.hideLoading()
            // 跳转到订单页
            uni.redirectTo({
                url:"/pages/my-service/hpv-view/index"
            })
        }
    }


</script>

<style scoped>
 /* 表单提交 */
 @import url('../../common-style/form.css');
  page{
    background-color: #fafafa;
  }
  .hpv-choose{
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 20rpx;
    margin-bottom: 40rpx;
  }
  .hpv-type{
    font-size: 35rpx;
  }
  .hpv-age{
    display: flex;
    align-items: center;
  }
  .hpv-age text{
    background-color: #f4f6fa;
    padding: 7rpx;
    font-size: 25rpx;
    margin: 10rpx 10rpx 10rpx 0;
  }
  .hpv-price{
    font-weight: bold;
    color: #ff5f2c;
  }
  /* 套餐 */
  .combo-view{
    background-color: #ffffff;
    padding: 20rpx;
    margin: 20rpx 0;
  }
  .combo-title{
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .combo-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .combo-list text{
    padding: 20rpx 40rpx;
    background-color: #f5f5f5;
    margin: 0 20rpx 20rpx 0;
    border-radius: 10rpx;
    display: block;
  }
  /* 选中加上样式 */
  .checkstyle{
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
</style>