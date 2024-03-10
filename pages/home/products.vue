<script lang="ts" setup>
import { type ProductModel, getProductsByStatus_API, PRODUCT_STATUS_ENUM, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { cryleTitle } from "~/utils/crill"
import { getFileURL_UTIL } from '@/utils/file';

const _itemsProduct = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
// const _items = ref<ProductModel[]>([])
const _selectedProduct = ref<ProductModel>(getProduct_DEFAULT())
const _status = ref<PRODUCT_STATUS_ENUM>(PRODUCT_STATUS_ENUM.ACCEPTED)
const _search = ref('')

const router = useRouter()
const _modalRef = ref()

async function loadItems(status: PRODUCT_STATUS_ENUM = PRODUCT_STATUS_ENUM.ACCEPTED) {
   const [error, response] = await getProductsByStatus_API(status, _itemsProduct.value.currentPage - 1)
   if (error) return

   _itemsProduct.value = response
}
loadItems()

// async function getProductsAutocomplete(query: string) {
//    if (!query || query.length <= 3) return
//    const [error, response] = await getProductsAutocomplete_API(cryleTitle(query))

//    if (error) return
//    _items.value = response
// }
async function searchProduct() {
   if (_search.value?.length > 3) {
      const [error, response] = await getProductsAutocomplete_API(cryleTitle(_search.value));
      if (error) return;
      _itemsProduct.value.content = response
      _itemsProduct.value.totalPages = 1
   }
   else {
      loadItems()
   }
}
async function handleChange(page: number) {
   _itemsProduct.value.currentPage = page || 1
   await router.replace({ query: { page } })
   loadItems();
}

function openModal() {
   _modalRef.value?.open()
}
const handleClick = () => {
   loadItems(_status.value)
}

</script>

<template>
   <div>
      <div>
         <ProductModal ref="_modalRef" />
         <div class="flex items-center justify-between mt-8 max-sm:flex-col max-sm:items-start max-sm:gap-y-3">
            <h2 class="font-commissioner-700 text-4xl max-sm:text-3xl">{{ $t('classifier') }}</h2>
            <!-- <el-select class="w-96" v-model="_selectedProduct" value-key="id" remote @change="onProductChange"
               reserve-keyword filterable placeholder="Поиск продукта ..." remote-show-suffix
               :remote-method="getProductsAutocomplete" :loading="_loading">
               <el-option v-for="item of _items" :key="item.id" :label="item.name" :value="item" />
            </el-select> -->
            
            <button @click="openModal()" class="h-12 flex items-center bg-black text-white space-x-3 max-sm:w-full max-sm:justify-center">
               <i class="icon-plus white"></i>
               <span>{{ $t('add') }}</span>
            </button>
         </div>
         <el-input @input="searchProduct" class="!bg-white !w-80 mt-8" v-model="_search" placeholder="Поиск" />
         <section class="mt-7">
            <el-tabs v-model="_status" class="demo-tabs my-5" @tab-change="handleClick">
               <el-tab-pane :label="$t('all')" :name="PRODUCT_STATUS_ENUM.ACCEPTED" />
               <el-tab-pane :label="$t('MODERATION')" :name="PRODUCT_STATUS_ENUM.MODERATION" />
               <el-tab-pane :label="$t('denied')" :name="PRODUCT_STATUS_ENUM.REJECTED" />
            </el-tabs>
            <el-table class="w-full tables" :data="_itemsProduct?.content" border table-layout="auto">
               <el-table-column type="index" width="50" label="#" />
               <el-table-column width="200" :label="$t('productPicture')">
                  <template #default="{ row }">
                     <div class="!h-16">
                        <img v-if="row.picture" class="bg-cover h-full" :src="getFileURL_UTIL(row.picture)" alt="">
                     </div>
                  </template>
               </el-table-column>
               <el-table-column width="400" :label="$t('productsName')">
                  <template #default="{ row }">
                     <span>{{ row.name }}</span>
                  </template>
               </el-table-column>
               <el-table-column width="200" :label="$t('productUnit')">
                  <template #default="{ row }">
                     <span>{{ row.unit }}</span>
                  </template>
               </el-table-column>
               <el-table-column v-if="_status == PRODUCT_STATUS_ENUM.REJECTED" :label="$t('rejectedMessage')">
                  <template #default="{ row }">
                     <span>{{ row.rejectedMessage }}</span>
                  </template>
               </el-table-column>

               <el-table-column :label="$t('status')">
                  <template #default="{ row }">
                     <span>{{ row.status }}</span>
                  </template>
               </el-table-column>
            </el-table>
            <el-pagination v-if="_itemsProduct.totalPages > 1" class="mt-8" background
               :current-page="_itemsProduct.currentPage" layout="prev, pager, next" :total="_itemsProduct.totalElements"
               @current-change="handleChange" />
         </section>
      </div>
   </div>
</template>