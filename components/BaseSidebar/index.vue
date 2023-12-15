<script lang="ts" setup>
import links from "./links.json"

</script>

<template>
    <div class="bg-[#F9F9F9]">
        <aside class="p-6 flex flex-col justify-between h-screen">
            <div>
                <img 
                    src="@/assets/img/logo.svg" 
                    alt="logo"
                    class="mx-auto"
                />
                
                <div>
                    <div class="h-[1px] bg-text/20 my-10" />
                    <div class="flex flex-col">
                        <NuxtLink
                            v-for="link of links"
                            :key="link.title" 
                            :to="link.to"
                            class="text-text p-4 flex items-center space-x-3"
                        >                            
                            <i class="text-white" :class="link.icon"></i>
                            <span>{{ link.title }}</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <NuxtLink
                    to="/home/help"
                    class="text-text p-4 flex items-center space-x-3"
                >
                    <span class="icon-help text-lg"></span>
                    <span>Помощь</span>
                </NuxtLink>
                <NuxtLink
                    to="/home/settings"
                    class="text-text p-4 flex items-center space-x-3"
                >
                    <img src="@/assets/img/settings.svg" />
                    <span>Настройки</span>                    
                </NuxtLink>
            </div>
        </aside>
    </div>
</template>

<style>
.router-link-active {
    @apply bg-black p-4 text-white rounded-xl;
}

.router-link-active i::before {
    @apply text-white;
}
</style>