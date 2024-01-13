<script lang="ts" setup>
import { type WarehouseModel, getWarehouse_DEFAULT, createWarehouse_API, updateWarehouse_API } from "@/services/warehouse"
import { type InventoryModel, getInventory_DEFAULT } from '~/services/inventory';
import { _rules } from './rules'

const _item = ref<InventoryModel>(getInventory_DEFAULT())
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)

const emit = defineEmits(['update'])
const _modalRef = ref()

function open(item: InventoryModel) {
   _item.value = item
   _visible.value = true
}

function close() {
    _formData.value = getWarehouse_DEFAULT()
    _modalRef.value?.resetFields()
    _visible.value = false
}

async function submit() {
    _modalRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            _loading.value = true
            const handler = _formData.value.id ? updateWarehouse_API : createWarehouse_API
            const [error, response] = await handler(_formData.value)
            _loading.value = false

            if (error) return
            emit('update')

            _visible.value = false
        }        
    })    
}

defineExpose({
    open
})
</script>

<template>
    <el-dialog class="relative" align-center v-model="_visible" :show-close="false" @close="close" width="580">
        <button @click="close" class="absolute top-4 right-4 p-0">
            <i class="icon-close"></i>
        </button>
        <h2 class="font-commissioner-700 text-3xl text-primary">            
           {{ _item.productName }}
        </h2>
        <div class="grid grid-cols-3 gap-10 mt-5">
            <div class="bg-[#F4F7FB] p-2 rounded-md col-span-1">
                <img src="@/assets/img/product.png" alt="product">
            </div>
            <div class="grid grid-cols-2 gap-10 col-span-2">
                <div>
                    <p class="text-text text-sm">КОЛИЧЕСТВО</p>
                    <p class="font-commissioner-600 text-lg text-black">{{ _item.amount }}</p>
                </div>
                <div>
                    <p class="text-text text-sm">КОЛИЧЕСТВО ПАРТИЙ</p>
                    <p class="font-commissioner-600 text-lg text-black">{{ _item.partCount }}</p>
                </div>
                <div>
                    <p class="text-text text-sm">ЗАКУПОЧНАЯ ЦЕНА</p>
                    <p class="font-commissioner-600 text-lg text-black">{{ _item.basePrice }} UZS</p>
                </div>
                <div>
                    <p class="text-text text-sm">ПРОДАЖНАЯ ЦЕНА</p>
                    <p class="font-commissioner-600 text-lg text-black">{{ _item.sellingPrice }} UZS</p>
                </div>                
            </div>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-8">
            <div class="bg-info p-4 rounded-lg">
                <p class="text-xl font-commissioner-600 text-black">1 партия</p>
                <div class="flex space-x-2">
                    <span class="text-text">Дата:</span>
                    <span class="text-black font-commissioner-600">13 октября 2023</span>
                </div>
                <div class="flex space-x-2">
                    <span class="text-text">Кол-во:</span>
                    <span class="text-black font-commissioner-600">200 ед</span>
                </div>
            </div>
            <div class="bg-info p-4 rounded-lg">
                <p class="text-xl font-commissioner-600 text-black">2 партия</p>
                <div class="flex space-x-2">
                    <span class="text-text">Дата:</span>
                    <span class="text-black font-commissioner-600">13 октября 2023</span>
                </div>
                <div class="flex space-x-2">
                    <span class="text-text">Кол-во:</span>
                    <span class="text-black font-commissioner-600">200 ед</span>
                </div>
            </div>
            <div class="bg-info p-4 rounded-lg">
                <p class="text-xl font-commissioner-600 text-black">3 партия</p>
                <div class="flex space-x-2">
                    <span class="text-text">Дата:</span>
                    <span class="text-black font-commissioner-600">13 октября 2023</span>
                </div>
                <div class="flex space-x-2">
                    <span class="text-text">Кол-во:</span>
                    <span class="text-black font-commissioner-600">200 ед</span>
                </div>
            </div>
        </div>
    </el-dialog>
</template>