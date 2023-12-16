import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    name: [{ required: true, message: 'Введите имя', trigger: 'change' }],
    surname: [{ required: true, message: 'Введите фамилию', trigger: 'change' }],
    companyName: [{ required: true, message: 'Введите название организации', trigger: 'change' }],
    companyType: [{ required: true, message: 'Введите ИНН', trigger: 'change' }],
    mobile: [{ required: true, message: 'Введите номер телефона', trigger: 'change' }],
    username: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    password: [{ required: true, message: 'Введите пароль', trigger: 'change' }],
    confirmPassword: [{ required: true, message: 'Введите пароль', trigger: 'change' }]
})