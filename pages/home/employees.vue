<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type EmployeeModel, EMPLOYEE_POSITION, getEmployees_API, EMPLOYEE_POSITION_ENUM } from '@/services/employee';
import { OPEN_DELETE_MODAL } from '@/store';

const _items = ref<BaseListResponse<EmployeeModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const _assignModalRef = ref()

function openModal(item?: EmployeeModel) {
   _modalRef.value?.open(item)
}

async function loadItems() {
   const [error, response] = await getEmployees_API()

   if (error) return

   _items.value = response
}

function openStoreModal(item: EmployeeModel) {
   _assignModalRef.value?.open(item, EMPLOYEE_POSITION_ENUM.SALESMAN)
}

function openWarehouseModal(item: EmployeeModel) {
   _assignModalRef.value?.open(item, EMPLOYEE_POSITION_ENUM.STACKER)
}

function deleteItem(item: EmployeeModel) {
   OPEN_DELETE_MODAL({
      // callback: ,
      callback: loadItems,
      text: 'Удалить сотрудника',
      // urlni to'g'irlash kk
      url: `employees/${item.id}`,
      title: `${item.lastname} ${item.firstname}`,
   })
}

loadItems()
</script>

<template>
   <div>
      <div>
         <EmployeeModal ref="_modalRef" @update="loadItems" />
         <EmployeeAssignModal ref="_assignModalRef" @update="loadItems" />

         <div class="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-y-4">
            <h2 class="font-commissioner-700 text-4xl max-md:text-3xl">{{ $t('employees') }}</h2>
            <button @click="openModal()"
               class="h-12 flex items-center bg-black text-white space-x-3 max-sm:w-full max-sm:justify-center">
               <i class="icon-plus white"></i>
               <span>{{ $t('addEmployee') }}</span>
            </button>
         </div>

         <el-table class="mt-8 w-full" :data="_items.content" border table-layout="auto">
            <el-table-column type="index" width="80" label="#" />
            <el-table-column :label="$t('fio')">
               <template #default="{ row }">
                  <span>{{ row.lastname }}</span>
                  <span>{{ row.firstname }}</span>
               </template>
            </el-table-column>
            <el-table-column width="300" :label="$t('jobs')">
               <template #default="{ row }">
                  <div class="flex gap-3 flex-wrap" v-if="row.works?.length">
                     <div v-for="item in row.works" :key="item.id">
                        <div v-if="item.position === EMPLOYEE_POSITION_ENUM.STACKER"
                           class="bg-primary text-white w-fit px-2 !py-1 rounded-xl">
                           <p>
                              {{ $t(EMPLOYEE_POSITION.get(item.position) as any as string) }}
                           </p>
                        </div>
                        <div v-if="item.position === EMPLOYEE_POSITION_ENUM.SALESMAN"
                           class="bg-info-main border border-primary text-primary w-fit px-2 !py-1 rounded-xl">
                           <p>
                              {{ $t(EMPLOYEE_POSITION.get(item.position) as any as string) }}
                           </p>
                        </div>
                     </div>
                  </div>
               </template>
            </el-table-column>
            <el-table-column width="200" :label="$t('Warehouse')">
               <template #default="{ row }">
                  {{ row.assignedWarehouseName || $t('notAssigned') }}
               </template>
            </el-table-column>

            <el-table-column width="200" :label="$t('Store1')">
               <template #default="{ row }">
                  {{ row.assignedStoreName || $t('notAssigned') }}
               </template>
            </el-table-column>
            <el-table-column width="100" :label="$t('more')">
               <template #default="{ row }">
                  <el-dropdown trigger="click">
                     <button class="bg-black py-1 px-2">
                        <img src="@/assets/img/dots.svg" />
                     </button>

                     <template #dropdown>
                        <div>
                           <el-dropdown-menu>
                              <el-dropdown-item v-if="row.position !== EMPLOYEE_POSITION_ENUM.STACKER">
                                 <button @click="openWarehouseModal(row)" class="text-white">
                                    {{ $t('attachWarehouse') }}
                                 </button>
                              </el-dropdown-item>
                              <el-dropdown-item v-if="row.position !== EMPLOYEE_POSITION_ENUM.SALESMAN">
                                 <button @click="openStoreModal(row)" class="text-white">
                                   {{ $t('attachStore') }}
                                 </button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                 <button @click="openModal(row)" class="text-white">
                                    {{ $t('edit') }}
                                 </button>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                 <button @click="deleteItem(row)" class="text-danger">
                                    {{ $t('delete') }}
                                 </button>
                              </el-dropdown-item>
                           </el-dropdown-menu>
                        </div>
                     </template>
                  </el-dropdown>
               </template>
            </el-table-column>
         </el-table>
      </div>
   </div>
</template>

<style>
.el-dropdown-menu {
   @apply bg-black rounded-xl;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:active,
.el-dropdown-menu__item:hover {
   @apply !bg-transparent;
   /* @apply !bg-black; */
}
</style>