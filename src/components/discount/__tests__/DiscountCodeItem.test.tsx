import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiscountCodeItem from '../DiscountCodeItem';

const mockRemoveDiscount = jest.fn();

jest.mock('lib/store/useDiscountListStore', () => ({
	useDiscountListStore: () => ({ removeDiscount: mockRemoveDiscount })
}));

describe('DiscountCodeItem', () => {
	const mockData = {
		isActive: true,
		futureActive: false,
		isExpired: false,
		code: 'SPRING20',
		discountType: 'Number',
		title: 'Spring Discount',
		integerPart: '10',
		decimalPart: '00',
		discountPercentage: '',
		validFrom: '2025-08-01',
		validUntil: '2025-08-31',
		objectID: '1',
	};

	it('renders discount code and title', () => {
		render(<DiscountCodeItem data={mockData} />);
		expect(screen.getByText('SPRING20')).toBeInTheDocument();
		expect(screen.getByText('Spring Discount')).toBeInTheDocument();
	});

	it('shows Active badge when isActive', () => {
		render(<DiscountCodeItem data={mockData} />);
		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('calls removeDiscount on delete', async () => {
		render(<DiscountCodeItem data={mockData} />);
		fireEvent.click(screen.getByTestId('delete-button'));
		expect(mockRemoveDiscount).toHaveBeenCalledWith(mockData);
	});
});
