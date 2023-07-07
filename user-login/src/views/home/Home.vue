<template>
  <el-button>首页</el-button>
  <wel-table></wel-table>
</template>
<script setup lang="ts">
async function req() {
  const { error, data } = await useMyFetch(`users/getDetailByAccount`).get().json()
  if (error.value) {
    ElMessage.error('请求错误')
  } else {
    console.log(data.value)
  }
}
req()
</script>
