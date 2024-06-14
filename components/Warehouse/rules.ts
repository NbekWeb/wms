import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    title: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    address: [{ required: true, message: 'Введите пароль', trigger: 'change' }]
})
