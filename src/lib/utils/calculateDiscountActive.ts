// lib/utils/discountUtils.ts

import { FetchedData, FetchedDataWithState } from 'lib/types/fetchedData';

export const calculateDiscountActive = (
	discount: FetchedData
): FetchedDataWithState => {
	const currentDate = new Date().getTime();
	const startingDate = new Date(discount.validFrom).getTime();
	const endingDate = new Date(discount.validUntil).getTime();

	let isActive = false;
	if (discount.validUntil) {
		isActive = currentDate >= startingDate && currentDate <= endingDate;
	} else {
		isActive = currentDate >= startingDate;
	}

	const futureActive = startingDate > currentDate;
	const isExpired = currentDate > endingDate;

	return {
		...discount,
		isActive,
		futureActive,
		isExpired,
	};
};
