import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
  username: [{ required: true, message: 'Введите логин', trigger: 'change' }],
  password: [{ required: true, message: 'Введите пароль', trigger: 'change' }]
})
