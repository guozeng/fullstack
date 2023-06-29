<template>
  <div class="w-500px border m-auto mt-100px p-30px">
    <h1 class="text-center mb-30px text-30px">
      <span v-if="loginOrReg === EPageType.reg">用户注册</span>
      <span v-if="loginOrReg === EPageType.login">用户登录</span>
    </h1>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="93px">
      <el-form-item label="帐号：" prop="account">
        <el-input v-model.trim="formData.account" placeholder="请输入帐号" clearable spellcheck></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model.trim="formData.password" placeholder="请输入密码" clearable type="password"></el-input>
      </el-form-item>
      <el-form-item v-if="loginOrReg === EPageType.reg" label="确认密码：" prop="comfirmPassword">
        <el-input
          v-model.trim="formData.comfirmPassword"
          placeholder="请再次输入密码"
          clearable
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button
        v-if="loginOrReg === EPageType.reg"
        type="primary"
        :disabled="saveLoading"
        @click="handleSubmit(formRef, loginOrReg)"
      >
        {{ saveLoading ? '提交中...' : '提交注册' }}
      </el-button>
      <el-button
        v-if="loginOrReg === EPageType.login"
        type="primary"
        :disabled="saveLoading"
        @click="handleSubmit(formRef, loginOrReg)"
      >
        {{ saveLoading ? '登录中...' : '登录' }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import JSEncrypt from 'jsencrypt'

import { useMyFetch } from '@u/index'

interface IFormData {
  account: string
  password: string
  comfirmPassword: string
}
enum EPageType {
  reg = 'reg',
  login = 'login',
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
const route = useRoute()
const loginOrReg = ref<EPageType>()

watch(
  () => route.path,
  (nval) => {
    formRef.value?.clearValidate()
    if (nval === '/reg') {
      loginOrReg.value = EPageType.reg
    }
    if (nval === '/login') {
      loginOrReg.value = EPageType.login
    }
  },
  {
    immediate: true,
  }
)

async function handleSubmit(formEl: FormInstance | undefined, loginOrReg: EPageType) {
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
    if (password !== comfirmPassword && loginOrReg === EPageType.reg) {
      ElMessage.error('两次密码不相等，请重新输入')
      return
    }
    saveLoading.value = true
    // 获取公钥
    const { data: keyData } = await useMyFetch('common/getPublicKey').get().json()
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(keyData.value.data)

    const mapApi = {
      reg: 'users/add',
      login: 'users/login',
    }
    const { error, data } = await useMyFetch(mapApi[loginOrReg])
      .post({
        data: {
          account,
          password: encryptor.encrypt(password),
        },
      })
      .json()
    saveLoading.value = false
    if (error.value) {
      ElMessage.error('请求错误')
      return
    }
    const { data: isSuccess, msg } = data.value
    if (isSuccess) {
      ElMessage.success(msg)
    } else {
      ElMessage.error(msg)
    }
  }
}
</script>
