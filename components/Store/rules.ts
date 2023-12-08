import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    warehouseId: [{ required: true, message: 'warehouseId', trigger: 'change' }],
    title: [{ required: true, message: 'title', trigger: 'change' }],
    address: [{ required: true, message: 'address', trigger: 'change' }]
})
