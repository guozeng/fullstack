<template>
  <el-button>首页</el-button>
  <wel-table></wel-table>
</template>
<script setup lang="ts">
async function req() {
  const { data } = await ajax('users/getDetailByAccount', {
    data: {
      a: 1,
    },
  })
  console.log(data.value)
}
req()
</script>
