import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    type: [{ required: true, message: 'type', trigger: 'blur' }],
    name: [{ required: true, message: 'address', trigger: 'blur' }]
})
