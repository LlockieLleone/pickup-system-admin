<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>托管管理后台</h2>

      <el-form :model="form" label-width="70px">
        <el-form-item label="手机号">
          <el-input
            v-model="form.phone"
            placeholder="请输入管理员手机号"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%;"
          :loading="loading"
          @click="submitLogin"
        >
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '../api/request'

const router = useRouter()

const loading = ref(false)

const form = reactive({
  phone: '',
  password: ''
})

async function submitLogin() {
  if (!form.phone) {
    ElMessage.warning('请输入手机号')
    return
  }

  if (!form.password) {
    ElMessage.warning('请输入密码')
    return
  }

  loading.value = true

  try {
    const data = await request.post('/api/auth/login', {
      phone: form.phone,
      password: form.password
    })

    if (data.role !== 'ADMIN') {
      ElMessage.error('当前账号不是管理员账号')
      return
    }

    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_name', data.teacherName)

    ElMessage.success('登录成功')

    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 420px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}
</style>