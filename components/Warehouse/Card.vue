<template>
    <div class="p-6 bg-black rounded-2xl">
        <div class="flex items-center justify-between cursor-pointer">
            <span class="text-white/60 text-sm">ID 123456</span>
            <img src="@/assets/img/edit.svg" alt="">
        </div>

        <div class="mt-3">
            <h2 class="font-commissioner-600 text-white text-lg">Название склада</h2>
            <p class="text-sm text-white/60">Яшнабадский район, Улица Махтумкули, 12</p>
        </div>

        <section class="flex items-center justify-between mt-5">
            <div class="mt-5 flex items-center space-x-2">
                <img src="@/assets/img/shops.svg" alt="">
                <span class="text-sm text-white font-commissioner-600">12 магазинов</span>
            </div>

            <button class="flex items-center space-x-2 border border-white">
                <img src="@/assets/img/plus.svg" alt="">
                <span class="text-white">Добавить</span>
            </button>
        </section>
    </div>
</template>