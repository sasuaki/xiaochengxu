<template>
    <view class="progress-box">
        <text>测评进度</text>
        <progress 
        class="progress" 
        :percent="percent" 
        border-radius="40" 
        stroke-width="9" 
        color="#09BB07" 
        activeColor="#09BB07"
        :active="true"
        active-mode="forwards"
        duration="15"
        >
        </progress>
        <text>{{add_to}}/{{topic_length}}</text>
    </view>
    <!-- 题目 -->
    <view class="question">{{ each_question.data.topic }}</view>
    <!-- 单选题 -->
    <view class="topic-view">
        <view class="topic-Title">
            <text></text>
            <text>单选题</text>
        </view>
        <view 
        class="totic" 
        hover-class="hover-style"
        v-for="(item,index) in data.options"
        :key="index"
        @click="choose(item.son_id)"
        >
          {{item.title}}
        </view>
    </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from "@dcloudio/uni-app";
import {reactive, ref, toRefs, watch} from "vue";
import type{Topic} from "@/types/decl-type";
import {RequestApi} from "@/utils/request"


// 进度条计算
let percent = ref(0)

// 用于判断请求哪个接口，001抑郁症，002男性，003失眠
let judg_value=ref("")

// 接受上一页传来的值
onLoad((event)=>{
    let {type,name} = event as {type:string,name:string}
    judg_value.value = type
    uni.setNavigationBarTitle({title:name})
})


// 存储所有的题目
let topic_data = ref<Topic[]>([])
// 总数量
let topic_length = ref(0)

// 存储每一题的数据
let each_question = reactive<{data:Topic}>({
    data:{
        topic:"",
        options:[],
        _id:""
    }
})

let {data} = toRefs(each_question)

onShow(async ()=>{
    if(judg_value.value==='001'){
        var res:any = await RequestApi.DepressionTopics()
    }else if(judg_value.value==='002'){
        var res:any = await RequestApi.PrematureTopics()
    }else{
        var res:any = await RequestApi.InsomniaTopics()
    } 
    // console.log(res);
    topic_data.value = res.data.data
    topic_length.value = res.data.data.length
    each_question.data = res.data.data[0]
    percent.value = 100/topic_length.value
    
})

// 存储每一道题的下标，初次进入页面
let add_to = ref(1)

// 存储每一道题的下标，点击存储
let add_to_s = ref(0)

// 存储每一次点击的选项id
let topic_id = reactive<({value:string[]})>({value:[]})

// 选择每一题触发
function choose(son_id:string){
    add_to_s.value ++
    if(add_to_s.value < topic_length.value){
      add_to.value ++
      percent.value = (100/topic_length.value)*add_to.value
      each_question.data = topic_data.value[add_to_s.value]
    }
    // 存储每次点击的选项id --获取测评结果
    topic_id.value.push(son_id)
}

// 监听是否全部选择完毕，选择完毕，跳转到下一页
watch([add_to_s,topic_length],(newVal,oldVal)=>{
  if(newVal[0] === newVal[1]){
    // 全部选择完毕，跳转到下一页
    let obj = JSON.stringify({type:judg_value.value,topic_id:topic_id.value})
    uni.navigateTo({
      url:"/pages/self-test/result?value="+obj
    })
  }
})


</script>

<style scoped>
page{
      background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
  }
  .progress-box{
    display: flex;
    align-items: center;
    padding: 20rpx;
  }
  .progress{
    flex: 1;
    padding: 0 40rpx;
  }
  .question{
    padding: 30rpx 20rpx;
    margin: 40rpx 20rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
  }
  .topic-view{
    background-color: #f3f8ff;
    border-radius: 10rpx;
    padding: 20rpx;
    margin: 20rpx;
    box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
  }
  .topic-Title{
    display: flex;
    align-items: center;
  }
  .topic-Title text:nth-child(1){
    width: 8rpx;
    height:27rpx;
    background-color: #0d7cff;
    display: block;
    margin-right: 10rpx;
  }
  .totic{
    background: #ffffff;
    margin: 20rpx 0;
    padding: 40rpx 10rpx;
    border-radius: 10rpx;
  }
  .hover-style{
    background-color: #ebf4ff;
    color: #298cff;
  }
</style>