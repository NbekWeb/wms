<script setup lang="ts">
import { _username } from "@/services/profile"
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>

<template>
    <div >
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="flex items-center bg-info-main p-2 space-x-3"
          >
            <img class="h-8 w-8 object-cover rounded-full" src="@/assets/img/user.jpg" />
            <span class="text-text">{{ _username }}</span>
            <img src="@/assets/img/down.svg" alt="down" />
          </MenuButton>
        </div>
  
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div>
              <MenuItem v-slot="{ active }">
                <button
                    @click="$router.push('/auth/login')"
                  :class="[
                    active ? 'bg-danger text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >                  
                  {{ $t('Logout') }}
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
</template>
  
  