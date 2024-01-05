<template>
    <NuxtLayout name="default">
        <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Реализация товаров</h2>            
        </div>
        <div class="space-y-4 mt-6 w-[420px]">
            <p class="text-2xl font-commissioner-700">Магазин для реализации</p>
            <el-select class="w-full" placeholder="Название магазина"></el-select>
        </div>

        <div class="mt-8">
            <div class="bg-text/20 w-full h-[1px]" />

            <div class="grid grid-cols-3">
                <WarehouseProductsList class="mt-5 border-r border-r-text/20 h-fit" />
                <div class="col-span-2 p-8 pr-0">
                    <el-input placeholder="Поиск по товарам" />
                    <div class="grid grid-cols-3 gap-4 mt-5">                
                        <WarehouseProductCard v-for="item of 15" :key="item" />
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>