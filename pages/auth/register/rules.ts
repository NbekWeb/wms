import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    firstname: [{ required: true, message: 'Введите имя', trigger: 'change' }],
    lastname: [{ required: true, message: 'Введите фамилию', trigger: 'change' }],
    orgName: [{ required: true, message: 'Введите название организации', trigger: 'change' }],
    tin: [{ required: true, message: 'Введите ИНН', trigger: 'change' }],
    mobile: [{ required: true, message: 'Введите номер телефона', trigger: 'change' }],
    username: [{ required: true, message: 'Введите логин', trigger: 'change' }],
    password: [{ required: true, message: 'Введите пароль', trigger: 'change' }],
    confirmPassword: [{ required: true, message: 'Введите пароль', trigger: 'change' }]
})