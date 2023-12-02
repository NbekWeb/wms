<script lang="ts" setup>
const _visible = useState(() => false)
const _loading = useState(() => false)

function open() {
    console.log("open")
    _visible.value = true
}

function close() {
    _visible.value = false
}

async function submit() {
    _visible.value = false
}

defineExpose({
    open
})
</script>

<template>
    <BaseModal v-model="_visible" @close="close" :loading="_loading" @confirm="submit" width="480px">
        <h2 class="font-commissioner-700 text-3xl">Прикрепить к складу</h2>
        <div class="flex items-center space-x-2 mt-5">
            <span class="text-text">Сотрудник</span>
            <span class="text-primary font-commissioner-600">: Алимов Ильхом</span>
        </div>
        <form class="mt-5 space-y-5" @submit.prevent="submit">
            <BaseInput label="Название склада" placeholder="Введите название склада" />
            <BaseInput label="Адрес склада" placeholder="Введите адрес склада" />

            <button class="bg-primary text-white w-full">Сохранить</button>
        </form>
    </BaseModal>
</template>