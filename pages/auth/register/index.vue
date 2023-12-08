<script lang="ts" setup>
import { getRegister_DEFAULT, type RegisterModel, register_API } from '~/services/profile';
import { _rules } from './rules';

const _formRef = ref()

const _formData = ref<RegisterModel>(getRegister_DEFAULT())

async function submit() {
    _formRef.value?.validate(async (valid: boolean) => {
        console.log("Registration")
        console.log(valid)
        if (valid) { 
            const [error, response] = await register_API(_formData.value)
            if (error) return

            console.log(response)
        }
    })
}
</script>

<template>
    <NuxtLayout name="auth">
        <section>
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Регистрация в системе</h1>
                <el-form :rules="_rules" label-position="top" :model="_formData" ref="_formRef" class="mt-10" @submit.prevent="submit">
                    <div class="grid grid-cols-2 gap-6">
                        <el-form-item label="Имя" prop="name">
                            <el-input v-model="_formData.name" />
                        </el-form-item>
                        <el-form-item label="Имя" prop="surname">
                            <el-input v-model="_formData.surname" />
                        </el-form-item>
                        <el-form-item label="Имя" prop="companyName">
                            <el-input v-model="_formData.companyName" />
                        </el-form-item>
                        <el-form-item label="Имя" prop="companyType">
                            <el-input v-model="_formData.companyType" />
                        </el-form-item>

                        <el-form-item label="Имя" prop="mobile">
                            <el-input v-model="_formData.mobile" />
                        </el-form-item>

                        <el-form-item label="Имя" prop="password">
                            <el-input v-model="_formData.password" />
                        </el-form-item>
                    </div>
                    <div class="mt-10 flex justify-center">
                        <el-button native-type="submit" type="primary" class="w-1/2 bg-black text-white">Зарегистрироваться</el-button>
                    </div>
                </el-form>
            </div>
            <div class="mt-24 text-center">
                <span class="text-primary">Уже есть учетная запись?</span>
                <NuxtLink to="/auth/login" class="ml-1 font-commissioner-600 text-primary">Войдите</NuxtLink>
            </div>
        </section>
    </NuxtLayout>
</template>