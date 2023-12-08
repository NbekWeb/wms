import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    position: [{ required: true, message: 'warehouseId', trigger: 'change' }],
    firstname: [{ required: true, message: 'title', trigger: 'change' }],
    lastname: [{ required: true, message: 'address', trigger: 'change' }],
    
    warehouseId: [{ required: true, message: 'warehouseId', trigger: 'change' }],
    storeId: [{ required: true, message: 'title', trigger: 'change' }],
    username: [{ required: true, message: 'address', trigger: 'change' }],
    password: [{ required: true, message: 'address', trigger: 'change' }]
})
