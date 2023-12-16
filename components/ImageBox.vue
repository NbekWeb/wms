<script lang="ts" setup>
import { ref } from "vue"
// import { getFileURL_UTIL } from '@/utils';
// import { uploadFile_API, removeFile_API } from '@/services/file'


const _loading = ref(false);
const _lastFile = ref('');
const modelValue = defineModel({
    default: '',
    required: true
})

const props = defineProps({
    id: {
        type: String,
        default: new Date().toISOString()
    }
})

function onDrop(e: Event) {
    const file = (e.target as HTMLInputElement)?.files?.[0]

    file && setFile(file);

}

async function setFile(file: File) {
    console.log(file)
    // modelValue.value = file.arrayBuffer
}

async function removeFile() {
    // await removeFile_API(_lastFile.value);
}

// defineExpose({ removeFile })
</script>

<template>
    <div>
        <div class="file w-full h-full relative border border-primary rounded bg-lightgray overflow-hidden" :class="modelValue == '' ? 'border-dashed' : ''">
            <img v-if="modelValue" class="w-full h-full object-cover object-center" :src="(modelValue)" alt="" />


            <label :for="`image-box${props.id}`" class="change absolute top-0 left-0 w-full h-full rounded flex items-center justify-center cursor-pointer">
                <p v-if="_loading" class="loader"><i class="ri-loader-2-fill ri-xl text-gray"></i></p>
                <i v-else-if="modelValue" class="ri-edit-2-fill text-white text-lg"></i>
                <i v-else class="ri-add-line text-gray2 text-lg"></i>
            </label>

            <input :id="`image-box${props.id}`" hidden type="file" @change="onDrop" />
        </div>
    </div>
</template>



<style lang="scss">
.is-error .file {
    border: 1px solid red;
    border-radius: 6px;
}

.change {
    background-color: rgba(255, 255, 255, 0.3);
}


.loader {
    animation: rotation 1s infinite linear;
}

@keyframes rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}
</style>
