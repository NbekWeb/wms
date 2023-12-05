<script setup>
import { login_API, _TOKEN } from "@/services/profile"

const _username = useState(() => '')
const _password = useState(() => '')

async function submit() {
    const [error, response] = await login_API(_username.value, _password.value)
    console.log("QWERTY")
    console.log(error)
    if (error) return

    console.log(response)
    _TOKEN.value = response.token
    navigateTo('/home/main')
    console.log('Success')
}
</script>

<template>
    <NuxtLayout name="auth">
        <section>
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Вход в систему</h1>
                <form class="mt-10 flex justify-center" @submit.prevent="submit">
                    <div class=" w-1/2">
                        <div class="grid grid-cols-1 gap-6">
                            <BaseInput v-model="_username" label="Имя" placeholder="Введите имя" />
                            <BaseInput type="password" v-model="_password" label="Фамилия" placeholder="Введите фамилию" />
                        </div>
                        <div class="mt-10">
                            <button type="submit" class="w-full bg-black text-white">Войти</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="mt-24 text-center">
                <span class="text-primary">Нет учетной записи?</span>
                <NuxtLink to="/auth/register" class="ml-1 font-commissioner-600 text-primary">Зарегистрируйтесь</NuxtLink>
            </div>
        </section>
    </NuxtLayout>
</template>