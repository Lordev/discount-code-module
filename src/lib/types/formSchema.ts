import { z } from 'zod';

// Base schema without refinement
const baseFormSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	code: z.string().min(1, 'Code is required'),
	description: z.string().optional(),
	discountType: z.enum(['Number', 'Percentage']),
	validFrom: z
		.string()
		.min(1, 'Valid from is required')
		.regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid from must be a valid date'),
	validUntil: z
		.string()
		.transform((val) => (val === '' ? undefined : val)) // Convert empty string to undefined
		.optional()
		.refine(
			(val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
			'Valid until must be a valid date'
		), // Validate if present
	hasUsageLimit: z.boolean(),
	usageCount: z.string().optional()
});

// Schema for Amount type
const numberSchema = baseFormSchema.extend({
	integerPart: z
		.string()
		.min(1, 'Please provide an integer')
		.regex(/^\d+$/, 'Please provide a valid integer'),
	decimalPart: z
		.string()
		.regex(/^\d{1,2}$/, 'Please provide a valid decimal part')
		.optional(),
	discountPercentage: z.string().optional()
});

// Schema for Percentage type
const percentageSchema = baseFormSchema.extend({
	discountPercentage: z
		.string()
		.regex(/^\d{1,2}$/, 'Please provide a valid percentage')
		.min(1, 'Percentage is required'),
	integerPart: z.string().optional(),
	decimalPart: z.string().optional()
});

// Union schema that selects the correct schema based on discountType
export const formSchema = z.union([
	numberSchema.refine((data) => data.discountType === 'Number', {
		message: 'Integer and decimal parts are required for Number type',
		path: ['discountType']
	}),
	percentageSchema.refine((data) => data.discountType === 'Percentage', {
		message: 'Percentage is required for Percentage type',
		path: ['discountType']
	})
]);

export type FormData = z.infer<typeof formSchema>;
