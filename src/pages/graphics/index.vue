<template>
    <!-- 图文咨询页面 -->
    
    <view class="graphics-back">
        <text class="graphics-Title">请详细描述你的病情</text>
        <textarea placeholder="为了更好获得医生帮助,请尽可能详细描述病情"
        maxlength="300"
        placeholder-class="textarea-color"
        :auto-focus="true"
        v-model="submitData.illness"
        />
    </view>
    <!-- 指导用药 -->
    <view class="graphics-back">
        <checkbox-group @change="checkboxChange">
        <label>
            <checkbox value="cb" :checked="submitData.guide" color="#0176ff" />需要医生指导用药
        </label>
        </checkbox-group>
    </view>
    <!-- 上传图片 -->
    <view class="graphics-back">
        <text class="graphics-Title">上传检查报告或患处照片</text>
        <view class="pat-image">
        <view class="upload-Image" v-for="(item, index) in submitData.ins_report" :key="index">
            <image :src="item" mode="aspectFill"></image>
            <image src="/static/other/shanchu-goods.svg" mode="widthFix"
            @click="submitData.ins_report.splice(index,1)"
            ></image>
        </view>
        <view><image src="/static/other/shuxing-img.png" @click="upload" mode="aspectFill"></image></view>
        </view>
    </view>
    <!-- 选择就诊人 -->
    <view class="graphics-back">
        <text class="graphics-Title">选择就诊人</text>
        <view class="patient-view">
        <image src="/static/other/touxiang.svg" mode="widthFix"></image>
        <text>{{ name }}</text>
        <text @click="choosePatient">{{name === ''? '选择就诊人':'重新选择'}}</text>
        </view>
    </view>
    <!-- 提交 -->
    <view style="height:300rpx"></view>
    <view class="submit">
        <text @click="cancel">取消</text>
        <text @click="submit">提交</text>
    </view>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import {uploadImage} from '@/utils/misc'
import {IMGURL} from '../../utils/request'
import { usePatient } from '@/store';
import {RequestApi} from '@/utils/request'

let submitData = reactive({
    illness:"",
    guide:false,
    ins_report:[],
    patient_id:""
})

// 需要指导用药
const checkboxChange = (event:{detail:{value:string}})=>{
    submitData.guide = event.detail.value.length ===0? false : true
    // console.log(submitData.guide,'submitData.guide');
    
}

// 上传图片
const upload = async()=>{
    const res:any= await uploadImage(IMGURL,"上传中","上传失败")
    // console.log(res,"upload");
    // console.log(JSON.parse(res.data));
    submitData.ins_report.push(JSON.parse(res.data).data)
    
}

// 选择就诊人
const choosePatient = ()=>{
    uni.navigateTo({url:'/pages/my-service/my-patient/index'})
}

// 就诊人信息
let name = ref('')
let store =usePatient()
// 可以通过store的$subscribe()方法查看状态及其变化
store.$subscribe((mutation,state)=>{
  name.value = state.patient.name
  submitData.patient_id = state.patient._id
})

// 取消
const cancel = ()=>{
  uni.navigateBack({delta:1})
}

interface Resobj{
  statusCode:number
}
// 提交
const submit = async()=>{
  uni.showLoading({title:"提交中",mask:true})
  const res = await RequestApi.GrapHics(submitData) as Resobj
  uni.showToast({title:"提交成功",icon:"none",duration:1000})
}
</script>

<style scoped>
 /* 表单提交 */
 @import url('../../common-style/form.css');
  page {
    background-color: #fafafa;
  }
  .graphics-back{
    background-color: #ffffff;
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 10rpx;
  }
  .graphics-Title{
    font-size: 35rpx;
    font-weight: bold;
    display: block;
    padding-bottom: 20rpx;
  }
  textarea{
    width: 100%;
    height: 250rpx;
  }
  .textarea-color{
    color: #00c8c8;
  }
  /* 上传图片 */
  .pat-image{
    display: flex;
    flex-wrap: wrap;
  }
  .pat-image view{
    width: calc(33.3% - 5rpx*2);
    height: 200rpx;
    margin: 5rpx;
  }
  .pat-image image{
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 7rpx;
  }
  .upload-Image {
    position: relative;
  }
  .upload-Image image:nth-child(2){
    width: 30rpx !important;
    height: 30rpx !important;
    position: absolute;
    top: 0;
    right: 0;
  }
  /* 选择就诊人 */
  .patient-view{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .patient-view image{
    width: 120rpx;
    height: 120rpx;
  }
  .patient-view text:nth-child(2){
    flex: 1;
    padding: 0 50rpx;
    font-weight: bold;
  }
  .patient-view text:nth-child(3){
    color: #2c76ef;
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