<template>
    <NuxtLayout name="auth">
        <section>
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Вход в систему</h1>
                <form class="mt-10 flex justify-center">
                    <div class=" w-1/2">
                        <div class="grid grid-cols-1 gap-6">
                            <BaseInput label="Имя" placeholder="Введите имя" />
                            <BaseInput label="Фамилия" placeholder="Введите фамилию" />
                        </div>
                        <div class="mt-10">
                            <NuxtLink to="/home/main">
                                <button @click="$router.push('/home/help')" class="w-full bg-black text-white">Войти</button>
                            </NuxtLink>                            
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