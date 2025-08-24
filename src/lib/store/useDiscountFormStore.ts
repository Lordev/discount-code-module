import { create } from 'zustand';
import { FormData } from '../types/formSchema';

interface FormState {
	formData: FormData;
	discountAmount: string;
	setFormValue: (
		key: keyof FormData,
		value: FormData[keyof FormData]
	) => void;
	resetForm: () => void;
}

export const useFormStore = create<FormState>(set => ({
	formData: {
		title: '',
		code: '',
		description: '',
		discountType: 'Number',
		discountPercentage: '',
		integerPart: '',
		decimalPart: '',
		validFrom: '',
		validUntil: '',
		hasUsageLimit: false,
		usageCount: '',
	},
	discountAmount: '',
	setFormValue: (key, value) =>
		set(state => ({
			formData: {
				...state.formData,
				[key]: value,
			},
		})),
	resetForm: () =>
		set({
			formData: {
				title: '',
				code: '',
				description: '',
				discountType: 'Number',
				discountPercentage: '',
				integerPart: '',
				decimalPart: '',
				validFrom: '',
				validUntil: '',
				hasUsageLimit: false,
				usageCount: '',
			},
		}),
}));
