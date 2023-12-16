<script lang="ts" setup>
import { getRegister_DEFAULT, type RegisterModel, register_API } from '~/services/profile';
import { _rules } from './rules';

const _formRef = ref()
const _formData = useState<RegisterModel>(getRegister_DEFAULT)
const _loading = useState(() => false)

async function submit() {
    _formRef.value?.validate(async (valid: boolean) => {
        console.log("Registration")
        console.log(valid)
        if (valid) { 
            _loading.value = true
            const [error, response] = await register_API(_formData.value)
            _loading.value = false
            if (error) return

            console.log(response)
        }
    })
}
</script>

<template>
    <NuxtLayout name="auth">
        <section class="mx-auto w-5/6">
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Регистрация в системе</h1>
                <el-form :rules="_rules" label-position="top" :model="_formData" ref="_formRef" class="mt-10" @submit.prevent="submit">
                    <div class="grid grid-cols-2 gap-6">
                        <el-form-item label="Имя" prop="name">
                            <el-input placeholder="Введите имя" v-model="_formData.name" />
                        </el-form-item>
                        <el-form-item label="Фамилия" prop="surname">
                            <el-input placeholder="Введите фамилию" v-model="_formData.surname" />
                        </el-form-item>
                        <el-form-item label="Организация" prop="companyName">
                            <el-input placeholder="Введите название организации" v-model="_formData.companyName" />
                        </el-form-item>
                        <el-form-item label="ИНН организации" prop="companyType">
                            <el-input placeholder="Введите ИНН" v-model="_formData.companyType" />
                        </el-form-item>

                        <el-form-item label="Логин" prop="companyType">
                            <el-input placeholder="Введите логин" v-model="_formData.username" />
                        </el-form-item>

                        <el-form-item label="Номер телефона" prop="mobile">
                            <el-input placeholder="Введите номер телефона" v-model="_formData.mobile" />
                        </el-form-item>

                        <el-form-item label="Пароль" prop="password">
                            <el-input placeholder="Введите пароль" type="password" v-model="_formData.password" />
                        </el-form-item>
                        <el-form-item label="Повторите пароль" prop="password">
                            <el-input placeholder="Повторите пароль" type="password" v-model="_formData.password" />
                        </el-form-item>
                    </div>
                    <div class="mt-10 flex justify-center">
                        <el-button :loading="_loading" native-type="submit" type="primary" class="w-1/2 bg-black text-white">Зарегистрироваться</el-button>
                    </div>
                </el-form>
            </div>
            <div class="mt-10 text-center">
                <span class="text-primary">Уже есть учетная запись?</span>
                <NuxtLink to="/auth/login" class="ml-1 font-commissioner-600 text-primary">Войдите</NuxtLink>
            </div>
        </section>
    </NuxtLayout>
</template>