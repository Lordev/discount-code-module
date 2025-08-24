import { z } from 'zod';

const fetchedDataSchema = z.object({
	objectId: z.string(),
	title: z.string(),
	code: z.string(),
	description: z.string(),
	discountType: z.enum(['Number', 'Percentage']),
	validFrom: z.string(),
	validUntil: z.string(),
	hasUsageLimit: z.boolean(),
	usageCount: z.string(),
	integerPart: z.string(),
	decimalPart: z.string(),
	discountPercentage: z.string(),
});

export const fetchedDataArraySchema = z.array(fetchedDataSchema);

export type FetchedData = z.infer<typeof fetchedDataSchema>;

export type FetchedDataArray = z.infer<typeof fetchedDataArraySchema>;

export interface FetchedDataWithState extends FetchedData {
	isActive: boolean;
	futureActive: boolean;
	isExpired: boolean;
}
