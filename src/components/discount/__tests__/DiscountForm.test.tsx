import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiscountForm from '../DiscountForm';

jest.mock('lib/store/useDiscountFormStore', () => ({
	useFormStore: () => ({
		formData: {
			title: '',
			code: '',
			description: '',
			discountType: 'Number',
			integerPart: '',
			decimalPart: '',
			discountPercentage: '',
			validFrom: '',
			validUntil: '',
			hasUsageLimit: false,
			usageCount: '',
		},
		resetForm: jest.fn(),
		setFormValue: jest.fn(),
	})
}));
jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));

describe('DiscountForm', () => {
	it('renders form and Save button', () => {
		render(<DiscountForm />);
		expect(screen.getByText('Save')).toBeInTheDocument();
	});

	it('renders Information and Settings headers', () => {
		render(<DiscountForm />);
		expect(screen.getByText('Information')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});

	it('renders Cancel button', () => {
		render(<DiscountForm />);
		expect(screen.getByText('Cancel')).toBeInTheDocument();
	});

});
