<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  // console.log("App Launch");
  let get_Menu = uni.getStorageSync('Menu')

  // 获取胶囊信息
  if (!get_Menu){ 
    const res= uni.getMenuButtonBoundingClientRect() 
    // 本地存储
    uni.setStorageSync('MenuButton',res)
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
