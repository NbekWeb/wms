<script lang="ts" setup>
import { _TOKEN, LOGOUT } from '@/services/profile';
const router = useRouter()
if (_TOKEN.value) {
   LOGOUT()
}
else {
   router.push('/home/main')
}
</script>

<template>
    <div></div>
</template>