// 首页的第一项数据  疫苗预约
export interface Vaccine{
    image:string;
    title:string
}

// 首页的第二项数据  预约挂号
export interface Reserve{
    describe: string
    image: string
    title: string
}

// 首页的第三项数据  热门挂号
export interface Popular{
    background: string
    dep_id: string
    image:string
    title:string
}

// 首页的第四项数据  健康自测
export interface Selftest{
    describe:string
    image:string
    minute: number
    name:string
    number_of_people:number
    question:number
}

// 小程序登录接口的类型
export interface WxloginApi{
    appid:string,
    secret:string,
    nickName:string,
    avatarUrl:string,
    code:string
}


// 新冠疫苗预约时段类型
interface Time{
    end_time:string
    over:number
    start_time:string
    when:number
}
interface Period{
    period:string
    time:Time[]
}
interface Week{
    Have:string
    date:string
    day:string
}
export interface Newapptime{
    Hospital:string
    address:string
    company:string[]
    lasting:Period[]
    week:Week[]
}

// 新冠疫苗提交预约
export interface RescovidApi{
    name:string,
    id_card:string,
    phone:string,
    address:string,
    de_address:string,
    crowd_sort:string,  //人群分类
    date:string,
    period:string,
    reserve_time:string,
    when:number
}

// 
export interface CoviduserOrderApi{
    name:string
    address:string
    cancel:boolean
    time:string
    company:string
    date:string
    period:string
    _id:string
}

// 取消疫苗订单
export interface CovidcancelApi{
    _id:string
}


// hpv疫苗
export interface Hpvselect{
    _id:string
    name:string
}
export interface Hpvlist{
    _id:string
    describe:string[]
    hpv_id:string
    name:string
    price:string[]
}

// 套餐名称
interface Hpvname{
    combo:string
    combo_id:string
}
export interface Hpvcomboname{
    name:Hpvname[]
    title:string
}
interface Hpvtime{
    time:string
    time_id:string
}
export interface Hpvcombotime{
    name:Hpvtime[]
    title:string
}

// HPV疫苗价格
export interface HpvpriceApi{
    hpv_id:string
    combo_id:string
    time_id:string
}

// 提交HPV疫苗的预约
export interface ReshpvApi{
    name:string,
    id_card:string,
    gender:string,
    born_date:string,
    phone:string,
    combo:string,
    ino_time:string,
    price:number,
    hpv_name:string
}

// HPV疫苗预约订单
export interface HpvorderApi{
    name:string
    combo:string
    ino_time:string
    price:string
    hpv_name:string
    time:string
    address:string
    order_number:string
    cancel:boolean
    _id:string
}


interface NucleDate{
    date:string
    week:string
}
interface NucleStyle{
    desc:string
    title:string
}
// 核酸检测页面数据
export interface Nucleicacid{
    address:string
    boon:string[]
    hospital:string
    logo:string
    name:string
    phone:string
    price:number
    style:NucleStyle[]
    date:NucleDate[]
    _id?:string
}

// 提交核酸检测预约
export interface ResnuataApi{
    name:string
    phone:string
    id_card:string
    time:string
}

// 核酸检测订单类型
export interface Nuatauserorder{
    phy_name:string
    address:string
    name:string
    _id:string
    phy_time:string
    time:string
    price:number
    order_number:string
    cancel:boolean
}

// 获取就诊人
export interface Mypatient{
    age:string
    born:string
    id_card:string
    name:string
    phone:string
    relation:string
    sex:string
}

// 提交图文咨询的类型
export interface Graphics{
    illness:string
    guide:boolean
    ins_report:string[]
    patient_id:string
}

// 提交就诊人
export interface Patientres{
    name:string
    sex:string
    born:string
    relation:string
    id_card:string
    phone:string
}

// 医师课堂
export interface VideoType{
    avatar:string
    name:string
    video_title:string
    controls:boolean
    video_url:string
    play_but:boolean
    _id:string
}

// 获取体检筛选的条件类型
export interface Phyterm{
    query_val:string
    filter_val:string[]
}

export interface Phydata{
    _id:string
    be_suit:string
    describe:string
    image:string
    price:number
    sales:number
    title:string
}

// 筛选的条件的类型
export interface Filterdata{
    type:string
    sales:string
    price:string

}

// 体检详情
export interface PhyDetail{
    id:string

}


interface Crowd{
    image:string
    name:string
}
interface Content{
    details:string
    thing:string
}
interface Project{
    content:Content[]
    title:string
}
// 体检详情类型
export interface PhyDetailApi{
    crowd:Crowd[]
    date:NucleDate[]
    image:string
    price:number
    project:Project[]
    sales:string
    title:string
    _id:string
}

// 体检预约提交类型
export interface PhyApi{
    phy_name:string
    phy_time:string
    patient_id:string
}


interface TopOption{
    son_id:string
    title:string
}
// 题目类型
export interface Topic{
    topic:string
    options:TopOption[]
    _id?:string
}


interface Recomm{
    dep_id:string
    dep_name:string
    hospital:string
}
// 测评结果类型
export interface Testres{
    scope:string
    result:string
    suggest:string
    outline:string[]
    recommend:Recomm[]
}