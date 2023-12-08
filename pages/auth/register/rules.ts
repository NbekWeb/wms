import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    name: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    surname: [{ required: true, message: 'Введите пароль', trigger: 'change' }],
    companyName: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    companyType: [{ required: true, message: 'Введите пароль', trigger: 'change' }],
    mobile: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    password: [{ required: true, message: 'Введите пароль', trigger: 'change' }]
})
