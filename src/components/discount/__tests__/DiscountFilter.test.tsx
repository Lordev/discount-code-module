import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiscountFilter from '../DiscountFilter';

const mockSetSortingOption = jest.fn();
const mockSetSearchQuery = jest.fn();
const mockSetShowInactiveDiscounts = jest.fn();
const mockNavigate = jest.fn();

jest.mock('lib/store/useDiscountListStore', () => ({
	useDiscountListStore: () => ({
		setSortingOption: mockSetSortingOption,
		setSearchQuery: mockSetSearchQuery,
		setShowInactiveDiscounts: mockSetShowInactiveDiscounts,
	})
}));
jest.mock('react-router-dom', () => ({
	useNavigate: () => mockNavigate
}));

describe('DiscountFilter', () => {
	it('renders sort select and search input', () => {
		render(<DiscountFilter />);
		expect(screen.getByText('Sort by title')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Search based on title')).toBeInTheDocument();
	});

	it('calls setSortingOption on sort change', () => {
		render(<DiscountFilter />);
		fireEvent.change(screen.getByRole('combobox'), { target: { value: 'date' } });
		expect(mockSetSortingOption).toHaveBeenCalledWith('date');
	});

	it('calls setSearchQuery on search input', () => {
		render(<DiscountFilter />);
		fireEvent.change(screen.getByPlaceholderText('Search based on title'), { target: { value: 'spring' } });
		expect(mockSetSearchQuery).toHaveBeenCalledWith('spring');
	});

	it('calls setShowInactiveDiscounts on checkbox change', () => {
		render(<DiscountFilter />);
		fireEvent.click(screen.getByRole('checkbox'));
		expect(mockSetShowInactiveDiscounts).toHaveBeenCalled();
	});

	it('navigates to new discount code page on button click', () => {
		render(<DiscountFilter />);
		fireEvent.click(screen.getByText(/New Discount Code/i));
		expect(mockNavigate).toHaveBeenCalledWith('/management/discount/new');
	});
});
