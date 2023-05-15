// 就诊人消息
import { defineStore } from "pinia";

interface Patient{
    name:string
    _id:string
}

export const usePatient = defineStore('my_data',{
    // 数据仓库
    state:()=>({
        patient:{} as Patient
    }),
    // 同步异步传值
    actions:{
        addPatient(value:Patient){
            this.patient = value
        }
    }
})