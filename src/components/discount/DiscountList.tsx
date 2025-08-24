import DiscountCodeItem from './DiscountCodeItem';
import axios from 'axios';
import { useEffect } from 'react';
import { useDiscountListStore } from 'lib/store/useDiscountListStore';
import { fetchedDataArraySchema } from 'lib/types/fetchedData';

export default function DiscountList() {
	const { setDiscountList, sortedDiscountList, showBorder } =
		useDiscountListStore();

	const fetchData = () => {
		axios
			.get(
				'https://66d8747f37b1cadd8054b943.mockapi.io/api/DiscountItem',
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			.then(response => {
				fetchedDataArraySchema.parse(response.data);
				setDiscountList(response.data);
			})
			.catch(error => console.error('Error fetching data:', error));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div
			className={`w-100 py-5 px-4 ${
				showBorder && 'border'
			} d-flex gap-4 h-50`}
		>
			{sortedDiscountList.map(data => (
				<DiscountCodeItem key={data.objectId} data={data} />
			))}
		</div>
	);
}
