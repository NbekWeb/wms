<template>
   <div>
      <div class="grid grid-cols-2 max-md:grid-cols-1 h-screen">
         <div class="p-10 max-md:p-5">
            <div >
               <img  class="max-sm:mx-auto" src="@/assets/img/logo.svg" alt="logo">
            </div>
            <div class="h-full flex flex-col justify-center">
               <slot />
            </div>
         </div>
         <div class="bg-black flex items-center justify-center max-md:hidden">
            <div>
               <div class="w-96 h-96 rounded-3xl flex items-center justify-center"
                  style="background: linear-gradient(90deg, #C4C5C7 0%, #DCDDDF 52%, #EBEBEB 100%);">
                  <img src="@/assets/img/products.png" alt="products">
               </div>
               <div class="mt-10 mx-auto">
                  <h1 class="font-commissioner-700 text-center text-white text-4xl">Заголовок системы</h1>
                  <p class="text-text text-center mt-4">Краткое описание системы</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>