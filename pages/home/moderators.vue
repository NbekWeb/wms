<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { getProductsByStatus_API,getProductsAutocomplete_API, PRODUCT_STATUS_ENUM, type ProductModel } from "@/services/product"
import { getFileURL_UTIL } from '@/utils/file';
import { cryleTitle } from "~/utils/crill"

const _items = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const _assignModalRef = ref()
const _declineModalRef = ref()
const _status = ref<PRODUCT_STATUS_ENUM>(PRODUCT_STATUS_ENUM.ACCEPTED)
const _search = ref('')
const router = useRouter()

async function loadItems() {
    console.log("Loading")
    console.log(_items.value.currentPage)
    const [error, response] = await getProductsByStatus_API(_status.value, _items.value.currentPage - 1)

    if (error) return

    _items.value = response
}

async function searchProduct() {
   if (_search.value?.length > 3) {
      const [error, response] = await getProductsAutocomplete_API(cryleTitle(_search.value));
      if (error) return;
      _items.value.content = response
      _items.value.totalPages = 1
   }
   else {
      loadItems()
   }
}

function openModal(item: ProductModel, isOpen: boolean) {
   _declineModalRef.value?.open(item, isOpen)
}

async function handleChange(page: number) {
    _items.value.currentPage = page || 1
    await router.replace({ query: { page }})
    loadItems();
}

loadItems()
</script>

<template>
    <div>
        <div>
            <EmployeeModal ref="_modalRef" @update="loadItems" />
            <EmployeeAssignModal ref="_assignModalRef" @update="loadItems" />
            <EmployeeDeclineModal ref="_declineModalRef" @update="loadItems"  />  
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Продукты</h2>
            </div>

            <section class="mt-8 ">
                <div class="w-80">
                    <el-input @input="searchProduct" class="!bg-white" v-model="_search" placeholder="Поиск" />
                </div>                
                <div class="flex items-center justify-between mt-5 bg-text/60 p-5">
                    <el-select v-model="_status" @change="loadItems">
                        <el-option label="Принятый" :value="PRODUCT_STATUS_ENUM.ACCEPTED" />
                        <el-option label="Инициализировано" :value="PRODUCT_STATUS_ENUM.INITIALIZED" />
                        <el-option label="На модерации" :value="PRODUCT_STATUS_ENUM.MODERATION" />
                        <el-option label="Отклоненный" :value="PRODUCT_STATUS_ENUM.REJECTED" />
                    </el-select>

                    <button class="border border-white text-white text-sm font-commissioner-700">Сбросить</button>
                </div>

                <el-table class="w-full tables" :data="_items.content" border table-layout="auto">
                    <el-table-column type="index" width="80" label="#" />
                    <el-table-column label="Изображение продукта">
                        <template  #default="{ row }">
                           <div class="!h-16">
                              <img class="bg-cover h-full" :src="getFileURL_UTIL(row.picture)" alt="">
                           </div>
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
                    <el-table-column  v-if="_status == PRODUCT_STATUS_ENUM.REJECTED" label="Отклоненное сообщение">
                        <template #default="{ row }">
                            <span>{{ row.rejectedMessage }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="_status == PRODUCT_STATUS_ENUM.MODERATION" label="Действие">
                        <template #default="{ row }">
                             <div class="flex gap-1 justify-center items-center" v-if="row.status == PRODUCT_STATUS_ENUM.MODERATION">
                               <el-button @click="openModal(row, false)" class="!h-8" type="primary">Qabul qilish</el-button>
                               <el-button @click="openModal(row, true)" type="danger">Rad etish</el-button>
                             </div>
                            <span v-else>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="_items.totalPages > 1" class="mt-8" background :current-page="_items.currentPage" layout="prev, pager, next" :total="_items.totalElements" @current-change="handleChange" />
            </section>            
        </div>
    </div>
</template>

<style>
.tables .el-button{
   height: 30px!important;
}
.el-dropdown-menu {
    @apply bg-black rounded-xl;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:active, .el-dropdown-menu__item:hover {
    @apply !bg-transparent;
    /* @apply !bg-black; */
}
</style>