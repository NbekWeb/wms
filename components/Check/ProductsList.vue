<template>
    <div class="pr-8">
        <div class="space-y-5">
            <h2 class="font-commissioner-700 text-4xl">Продажа</h2>          
            <div class="bg-text/20 w-full h-[1px] mt-20" />  
            <div class="flex items-center justify-between" v-for="item of 2">
                <div>
                    <p class="text-black font-commissioner-600">Помидоры розовые</p>
                    <div class="flex space-x-5 mt-2">
                        <span class="text-black">2 кг</span>
                        <span class="text-text font-commissioner-600">30 000 сум</span>
                    </div>
                </div>
                <button class="p-0">
                    <i class="icon-close danger"></i>
                </button>
            </div>
        </div>
        <div class="bg-text/20 w-full h-[1px] mt-20" />
        <div class="space-y-6 mt-6">
            <div class="flex justify-between items-center">
                <span class="text-text text-lg">К ОПЛАТЕ:</span>
                <span class="text-black font-commissioner-700 text-2xl">90 000 сум</span>
            </div>
            <div class="grid grid-cols-2 gap-5">
                <el-button type="primary">ТЕРМИНАЛ</el-button>
                <el-button type="primary">НАЛИЧНЫЕ</el-button>
            </div>
        </div>
    </div>
</template>