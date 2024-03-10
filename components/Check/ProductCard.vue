<template>
    <div class="rounded-2xl border border-info-main bg-info p-5 space-y-4 max-md:p-3 max-md:space-y-3">
        <p class="font-commissioner-600 text-black text-center">Coca-Cola</p>
        <img src="@/assets/img/product.png" alt="product" class="w-24 h-24 object-cover mx-auto">
        <p class="text-center font-commissioner-600 text-black text-xl">8 000 сум (ед)</p>
        <button class="h-10 w-full justify-center flex items-center space-x-3 bg-black text-white">
            <i class="icon-plus white"></i>
            <span>{{ $t('add') }}</span>
        </button>
    </div>
</template>