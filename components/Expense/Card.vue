<script lang="ts" setup>
import { type PropType } from "vue"
import { type ExpenseModel } from "@/services/expense"

const props = defineProps({
    item: {
        type: Object as PropType<ExpenseModel>,
        required: true
    }
})
</script>

<template>
    <div class="p-4 space-y-2 border border-text/20 overflow-hidden">
        <p class="text-text/80">21.12.2023   12:15</p>
        <div class="space-x-2">
            <span class="font-commissioner-600 text-primary">Расход №1</span>
            <span class="font-commissioner-600 text-text">{{ props.item.amount }} UZS</span>
        </div>
        <div class="space-x-2 flex">
            <span class="font-commissioner-600 text-primary">Комментарий:</span>
            <span class="font-commissioner-600 text-text line-clamp-1">{{ props.item.comment }}</span>
        </div>
    </div>
</template>