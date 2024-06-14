<script lang="ts" setup>

const route = useRoute()
const _openRef = ref()


</script>


<template>
   <div class="flex items-center justify-between max-md:hidden">
      <BaseInput class="w-80" placeholder="Поиск" />
      <div class="flex items-center space-x-8">
       <BaseHeaderLang class="max-lg:hidden" />
         <img class="cursor-pointer" src="@/assets/img/notifications.svg" />
         <BaseHeaderAccount />
      </div>
   </div>
   <div class="hidden max-md:block">   
      <BaseSidebar ref="_openRef" />
      <div class="flex items-center justify-between">
         <i @click="_openRef.open()" class="ri-menu-line text-3xl"></i>
         <img src="@/assets/img/logo.svg" alt="">
         <img class="cursor-pointer" src="@/assets/img/notifications.svg" />
      </div>
   </div>
</template>