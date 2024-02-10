<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
import { login_API, _TOKEN, _username,_userId, getLogin_DEFAULT, type LoginModel } from "@/services/profile"
import { _rules } from './rules'

const _formData = useState<LoginModel>(getLogin_DEFAULT)
const _formRef = ref()
const _loading = useState(() => false)

async function submit() {
    _formRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            _loading.value = true
            const [error, response] = await login_API(_formData.value)
            _loading.value = false
            if (error) return

            _TOKEN.value = response.token
            _username.value = response.username
            _userId.value = response.userId
            navigateTo('/home/main')
        }
    })    
}
</script>

<template>
    <!-- <NuxtLayout name="auth"> -->
        <section class="w-1/2 mx-auto">
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Вход в систему</h1>
                <el-form class="mt-10" ref="_formRef" :rules="_rules" label-position="top" :model="_formData" @submit.prevent="submit">
                    <el-form-item label="Логин" prop="username">
                        <el-input placeholder="Логин" v-model="_formData.username" />
                    </el-form-item>
                    <el-form-item label="Пароль" prop="password">
                        <el-input type="password" placeholder="Пароль" v-model="_formData.password" />
                    </el-form-item>

                    <div class="mt-10">
                        <el-button :loading="_loading" class="w-full" type="primary" native-type="submit">Войти</el-button>
                    </div>
                </el-form>
            </div>
            <div class="mt-24 text-center">
                <span class="text-primary">Нет учетной записи?</span>
                <NuxtLink to="/auth/register" class="ml-1 font-commissioner-600 text-primary">Зарегистрируйтесь</NuxtLink>
            </div>
        </section>
    <!-- </NuxtLayout> -->
</template>