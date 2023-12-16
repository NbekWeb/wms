<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type ProductModel, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';

const _items = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const _selectedProduct = ref<ProductModel>(getProduct_DEFAULT())
const _loading = ref(false)
const _modalRef = ref()

async function getProductsAutocomplete(query: string) {
    if (!query || query.length <= 3) return
    const [error, response] = await getProductsAutocomplete_API(query)

    if (error) return
    console.log(response)
}

function onProductChange() {

}

function openModal() {
    _modalRef.value?.open()
}

</script>

<template>
    <NuxtLayout name="default">
        <div>
            <ProductModal ref="_modalRef" />
            <h2 class="font-commissioner-700 text-4xl">Продукты</h2>            

            <div class="flex items-center justify-between mt-8">
                <el-select
                    class="w-96"
                    v-model="_selectedProduct"
                    value-key="id"
                    remote
                    @change="onProductChange"
                    reserve-keyword
                    filterable
                    placeholder="Поиск продукта ..."
                    remote-show-suffix
                    :remote-method="getProductsAutocomplete"
                    :loading="_loading"
                >
                    <el-option
                        v-for="item of _items.content"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
                    />
                </el-select>
                <button @click="openModal()" class="h-12 flex items-center bg-black text-white space-x-3">
                    <i class="icon-plus white"></i>
                    <span>Добавить продукт</span>
                </button>
            </div>
        </div>
    </NuxtLayout>
</template>