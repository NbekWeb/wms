<template>
    <div class="grid grid-cols-5">
        <BaseSidebar class="col-span-1" />
        <div class="col-span-4 p-[30px]">
            <div>
                <BaseHeader />
            </div>
            <div class="mt-[30px]">
                <slot />
            </div>
        </div>
    </div>
</template>