<script lang="ts" setup>
import { _lang } from "~/i18n";
const { locale } = useI18n()

const route = useRoute()
const _openRef = ref()
const _langOptions = ref([
   {
      name: "Uzb",
      value: 'uz'
   },
   {
      name: 'Рус',
      value: 'ru'
   },
   {
      name: 'Узб',
      value: 'crill'
   },
])


function handleLanguage() {
   locale.value = _lang.value
}
</script>
<template>
   <div>
      <el-select @change="handleLanguage" v-model="_lang" class="!rounded-3xl" :placeholder="$t('select')" size="large"
         style="width: 120px">
         <el-option v-for="item in _langOptions" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
   </div>
</template>