<template>
    <div class="flex max-xl:justify-between">
        <BaseSidebar class="max-md:hidden col-span-1 max-xl:w-[250px]" />
        <div class="col-span-4 max-xl:grid-cols-1  p-[30px] max-md:p-5 calc max-md:!w-full">
            <div>
                <BaseHeader />
            </div>
            <div class="mt-[30px] bg-white h-full">
                <slot />
            </div>
        </div>
    </div>
</template>
<style>
.calc{
   width: calc(100% - 250px);
}
</style>