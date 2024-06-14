<template>
    <div>
        <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Чек  №1</h2>            
        </div>

        <div class="flex space-x-2 mt-5">
            <span class="font-commissioner-600 text-black">Смена №1</span>
            <div class="flex space-x-2">
                <span class="text-text">Начало: </span>
                <span class="text-black font-commissioner-600">9:00 21.12.2023</span>
            </div>
        </div>

        <div class="mt-8">
            <div class="bg-text/20 w-full h-[1px]" />

            <div class="grid grid-cols-3">
                <CheckProductsList class="mt-5 border-r border-r-text/20 h-fit" />
                <div class="col-span-2 p-8 pr-0">
                    <el-input placeholder="Поиск по товарам" />
                    <div class="grid grid-cols-3 gap-4 mt-5">                
                        <CheckProductCard v-for="item of 15" :key="item" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>