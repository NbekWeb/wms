<script lang="ts" setup>
import { _sendProduct, sentInventory_API } from '~/services/inventory';

async function sentInventory() {
    const [error, response] = await sentInventory_API(_sendProduct.value)

    if (error) return
}
</script>
<template>
    <div class="pr-8">
        <div class="space-y-5">
         {{ _sendProduct }}
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
            <p class="text-text text-lg">ИТОГО:</p>
            <div class="flex justify-between items-center">
                <span class="text-text text-lg">Товаров:</span>
                <span class="text-black font-commissioner-700 text-2xl">10</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-text text-lg">Сумма:</span>
                <span class="text-black font-commissioner-700 text-2xl">600 000 сум</span>
            </div>
            <el-button @click="sentInventory" type="primary" class="w-full">ОТПРАВИТЬ В МАГАЗИН</el-button>
        </div>
    </div>
</template>