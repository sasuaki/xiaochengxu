// 上传图片
// url图片上传接口路径
function uploadImage(url:string,su_title:string,err_title:string){
    return new Promise((resolve,reject)=>{
        // 拍摄或从手机相册中选择图片或视频
        uni.chooseMedia({
            count:1,
            mediaType:['image'],
            sizeType:['compressed'],
            success:(res)=>{
                console.log(res,'res');
                uni.showLoading({title:su_title,mask:true})
                uni.uploadFile({
                    url,
                    filePath:res.tempFiles[0].tempFilePath,
                    name:"file",
                    header:{accept:'application/json'},
                    success:(res_img)=>{
                        resolve(res_img)
                        uni.hideLoading()

                    },
                    fail:(err_img:any)=>{
                        reject(err_img)
                        uni.showLoading({title:err_title,icon:"error",duration:1000})
                    }
                })
            }
        })
    })
}

export {uploadImage}