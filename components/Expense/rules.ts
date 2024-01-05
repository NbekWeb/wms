import type { FormRules } from 'element-plus'

export const _rules = ref<FormRules>({
    amount: [{ required: true, message: 'amount', trigger: 'change' }],
    comment: [{ required: true, message: 'comment', trigger: 'change' }]
})
