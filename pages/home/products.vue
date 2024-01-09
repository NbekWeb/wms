<script lang="ts" setup>
// import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type ProductModel, getProductsByStatus_API, PRODUCT_STATUS_ENUM, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { cryleTitle } from "~/utils/crill"

const _itemsProduct = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const _items = ref<ProductModel[]>([])
const _selectedProduct = ref<ProductModel>(getProduct_DEFAULT())
const _status = ref<PRODUCT_STATUS_ENUM>(PRODUCT_STATUS_ENUM.ACCEPTED)

const router = useRouter()

const _loading = ref(false)
const _modalRef = ref()

async function loadItems() {
    console.log("Loading")
    console.log(_itemsProduct.value.currentPage)
    const [error, response] = await getProductsByStatus_API(_status.value, _itemsProduct.value.currentPage - 1)
    if (error) return

    _itemsProduct.value = response
}
loadItems()

async function getProductsAutocomplete(query: string) {
    if (!query || query.length <= 3) return
    const [error, response] = await getProductsAutocomplete_API(cryleTitle(query))

   if (error) return
    _items.value = response
}
async function handleChange(page: number) {
   _itemsProduct.value.currentPage = page || 1
    await router.replace({ query: { page }})
    loadItems();
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
                        v-for="item of _items"
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
            <section class="mt-8 ">
             
                <el-table class="w-full tables" :data="_itemsProduct.content" border table-layout="auto">
                    <el-table-column type="index" width="80" label="#" />
                    <el-table-column label="Изображение продукта">
                        <template #default="{ row }">
                            <span>{{ row.picture }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Название продукта">
                        <template #default="{ row }">
                            <span>{{ row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Тип продукта">
                        <template #default="{ row }">
                            <span>{{ row.type }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="Статус">
                        <template #default="{ row }">
                            <span>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Действие">
                        <template #default="{ row }">
                          
                            <span>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="_itemsProduct.totalPages > 1" class="mt-8" background :current-page="_itemsProduct.currentPage" layout="prev, pager, next" :total="_itemsProduct.totalElements" @current-change="handleChange" />
            </section>  
        </div>
    </NuxtLayout>
</template>