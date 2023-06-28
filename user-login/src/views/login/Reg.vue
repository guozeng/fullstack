<template>
  <div class="w-500px border m-auto mt-100px p-30px">
    <h1 class="text-center mb-30px text-30px">用户注册</h1>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="93px">
      <el-form-item label="帐号：" prop="account">
        <el-input v-model.trim="formData.account" placeholder="请输入帐号" clearable spellcheck></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model.trim="formData.password" placeholder="请输入密码" clearable type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="comfirmPassword">
        <el-input
          v-model.trim="formData.comfirmPassword"
          placeholder="请再次输入密码"
          clearable
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button type="primary" :disabled="saveLoading" @click="onReg(formRef)">
        {{ saveLoading ? '提交中...' : '提交注册' }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

import { useMyFetch } from '@u/index'

interface IFormData {
  account: string
  password: string
  comfirmPassword: string
}
const formData = ref<IFormData>({
  account: '',
  password: '',
  comfirmPassword: '',
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<IFormData>>({
  account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  comfirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
})
const saveLoading = ref(false)

async function onReg(formEl: FormInstance | undefined) {
  if (!formEl) {
    return
  }
  const result = await formEl.validate((valid, fields) => {
    if (valid) {
    } else {
      console.log(fields)
    }
  })
  if (result) {
    const { account, password, comfirmPassword } = formData.value
    if (password !== comfirmPassword) {
      ElMessage.error('两次密码不相等，请重新输入')
      return
    }
    saveLoading.value = true
    const { error, data } = await useMyFetch('users/add')
      .post({
        data: {
          account,
          password,
        },
      })
      .json()
    saveLoading.value = false
    if (error.value) {
      ElMessage.error('网络错误，请检查网络后重试')
      return
    }
    if (data.value && data.value.code === 200) {
      ElMessage.success('注册成功')
    } else {
      ElMessage.error('注册失败:' + data.value?.msg || '')
    }
  }
}
</script>
