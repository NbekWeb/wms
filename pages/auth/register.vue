<template>
    <NuxtLayout name="auth">
        <section>
            <div>
                <h1 class="font-commissioner-700 text-4xl text-center">Регистрация в системе</h1>
                <form class="mt-10">
                    <div class="grid grid-cols-2 gap-6">
                        <BaseInput label="Имя" placeholder="Введите имя" />
                        <BaseInput label="Фамилия" placeholder="Введите фамилию" />
                        <BaseInput label="Организация" placeholder="Введите название организации" />
                        <BaseInput label="ИНН организации" placeholder="Введите ИНН" />
                        <BaseInput label="Номер телефона" placeholder="Введите номер телефона" />
                        <BaseInput label="Электронная почта" placeholder="Введите электронную почту" />
                        <BaseInput label="Пароль" placeholder="Введите пароль" />
                        <BaseInput label="Повторите пароль" placeholder="Повторите пароль" />
                    </div>
                    <div class="mt-10 flex justify-center">
                        <button class="w-1/2 bg-black text-white">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
            <div class="mt-24 text-center">
                <span class="text-primary">Уже есть учетная запись?</span>
                <NuxtLink to="/auth/login" class="ml-1 font-commissioner-600 text-primary">Войдите</NuxtLink>
            </div>
        </section>
    </NuxtLayout>
</template>