<template>
    <NuxtLayout name="default">
        <div>
            <h2 class="font-commissioner-700 text-4xl">Товары</h2>
            <div class="flex items-center w-full">
                <div class="w-96 mx-auto">
                    <img src="@/assets/img/noData.svg" alt="noData">
                    <h2 class="text-3xl text-text font-commissioner-700 mt-2 text-center">Здесь пока пусто</h2>

                    <button class="flex items-center h-12 bg-black text-white space-x-2 mx-auto mt-8">
                        <i class="icon-plus white"></i>
                        <span>Добавить товары</span>
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>