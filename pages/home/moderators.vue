<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { getProductsByStatus_API,getProductsAutocomplete_API, PRODUCT_STATUS_ENUM, type ProductModel } from "@/services/product"
import { getFileURL_UTIL } from '@/utils/file';
import { cryleTitle } from "~/utils/crill"

const _items = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const _declineModalRef = ref()
const _status = ref<PRODUCT_STATUS_ENUM>(PRODUCT_STATUS_ENUM.ACCEPTED)
const _search = ref('')
const router = useRouter()

async function loadItems() {
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
            <EmployeeDeclineModal ref="_declineModalRef" @update="loadItems"  />  
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl max-md:text-3xl">{{ $t('product') }}</h2>
            </div>

            <section class="mt-8 ">
                <div class="w-80  max-md:!w-full">
                    <el-input @input="searchProduct" class="!bg-white" v-model="_search" :placeholder="$t('search')" />
                </div>                
                <div class="flex items-center justify-between mt-5 bg-text/60 p-5 max-md:p-3 max-md:gap-2">
                    <el-select class="!w-60 max-md:!w-48" v-model="_status" @change="loadItems">
                        <el-option :label="$t('ACCEPTED')" :value="PRODUCT_STATUS_ENUM.ACCEPTED" />
                        <el-option :label="$t('INITIALIZED')" :value="PRODUCT_STATUS_ENUM.INITIALIZED" />
                        <el-option :label="$t('MODERATION')" :value="PRODUCT_STATUS_ENUM.MODERATION" />
                        <el-option :label="$t('REJECTED')" :value="PRODUCT_STATUS_ENUM.REJECTED" />
                    </el-select>

                    <button class="border border-white text-white text-sm font-commissioner-700 ">{{ $t('reset') }}</button>
                </div>

                <el-table class="w-full tables" :data="_items.content" border table-layout="auto">
                    <el-table-column type="index" width="80" label="#" />
                    <el-table-column :label="$t('productPicture')">
                        <template  #default="{ row }">
                           <div class="!h-16">
                              <img v-if="row.picture" class="bg-cover h-full" :src="getFileURL_UTIL(row.picture)" alt="">
                           </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="300"  :label="$t('productsName')">
                        <template #default="{ row }">
                            <span>{{ row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" :label="$t('typeproduct')">
                        <template #default="{ row }">
                            <span>{{ row.type }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column  width="150" :label="$t('status')">
                        <template #default="{ row }">
                            <span>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200"  v-if="_status == PRODUCT_STATUS_ENUM.REJECTED" :label="$t('rejectedMessage')">
                        <template #default="{ row }">
                            <span>{{ row.rejectedMessage }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" v-if="_status == PRODUCT_STATUS_ENUM.MODERATION" label="$t('action')">
                        <template #default="{ row }">
                             <div class="flex gap-1 justify-center items-center" v-if="row.status == PRODUCT_STATUS_ENUM.MODERATION">
                               <el-button @click="openModal(row, false)" class="!h-8" type="primary">{{ $t('Confirm') }}</el-button>
                               <el-button @click="openModal(row, true)" type="danger">{{ $t('Cancel') }}</el-button>
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
.el-pager li {
   @media(max-width: 430px){
      min-width: 22px;
   }
}
.el-pagination button {
   @media(max-width: 430px){
      min-width: 22px;
   }
}
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