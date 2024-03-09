<script lang="ts" setup>
import links from "./links.json"
const drawer = ref(false)
const router = useRouter()
function open() {
   console.log('dd');

   drawer.value = !drawer.value
}

defineExpose({
   open
})

watch(() => router, () => drawer.value = false, { deep: true })
</script>

<template>
   <div class="bg-[#F9F9F9] block max-md:hidden">
      <aside class="p-6 flex flex-col h-full gap-y-6">
         <div>
            <img src="@/assets/img/logo.svg" alt="logo" class="mx-auto" />

            <div>
               <div class="h-[1px] bg-text/20 my-10" />
               <div class="flex flex-col">
                  <NuxtLink v-for="link of links" :key="link.title" :to="link.to"
                     class="text-text p-4 flex items-center space-x-3">
                     <i class="text-white" :class="link.icon"></i>
                     <span>{{ link.title }}</span>
                  </NuxtLink>
               </div>
            </div>
         </div>

         <div class="flex flex-col">
            <NuxtLink to="/home/help" class="text-text p-4 flex items-center space-x-3">
               <span class="icon-help text-lg"></span>
               <span>Помощь</span>
            </NuxtLink>
            <NuxtLink to="/home/settings" class="text-text p-4 flex items-center space-x-3">
               <img src="@/assets/img/settings.svg" />
               <span>Настройки</span>
            </NuxtLink>
         </div>
      </aside>
   </div>
   <div class="hidden max-md:block header_wms">
      <el-drawer v-model="drawer" size="90%" direction="ltr">
         <div class="my-2">
            <div class="flex justify-between items-center">
               <i @click="drawer = false" class="ri-close-circle-line text-3xl "></i>
               <BaseHeaderLang />
            </div>
            <div class="flex flex-col gap-1 mt-4">
               <NuxtLink v-for="link of links" :key="link.title" :to="link.to"
                  class="text-text p-4 flex items-center space-x-3">
                  <i class="text-white" :class="link.icon"></i>
                  <span>{{ link.title }}</span>
               </NuxtLink>
            </div>
            <div class="flex flex-col">
               <NuxtLink to="/home/help" class="text-text p-4 flex items-center space-x-3">
                  <span class="icon-help text-lg"></span>
                  <span>Помощь</span>
               </NuxtLink>
               <NuxtLink to="/home/settings" class="text-text p-4 flex items-center space-x-3">
                  <img src="@/assets/img/settings.svg" />
                  <span>Настройки</span>
               </NuxtLink>
            </div>
         </div>

      </el-drawer>
   </div>
</template>

<style lang="scss">
.header_wms {
   .el-drawer__header {
      display: none !important;
   }
}

.router-link-active {
   @apply bg-black p-4 text-white rounded-xl;
}

.router-link-active i::before {
   @apply text-white;
}

.example-showcase .el-loading-mask {
   z-index: 9;
}
</style>