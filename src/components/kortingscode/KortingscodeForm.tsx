import Button from 'components/common/buttons/Button';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import { InfoIcon, SlidersIcon } from 'components/common/svg';
import { Spinner } from 'react-bootstrap';
import { z } from 'zod';
import { formSchema } from 'lib/types/formSchema';
import {
	AmountInput,
	AmountTypeSelect,
	DateInput,
	DescriptionInput,
	UsageInput,
} from './formInputs';
import axios from 'axios';
import { Col, Row, Container } from 'react-bootstrap';

export default function KortingscodeForm() {
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { formData, resetForm } = useFormStore();
	const navigate = useNavigate();

	const validateForm = () => {
		try {
			formSchema.parse(formData);
			setFormErrors({});
			return true;
		} catch (e) {
			if (e instanceof z.ZodError) {
				const errors: Record<string, string> = {};

				e.errors.forEach(
					error => (errors[error.path[0]] = error.message)
				);

				setFormErrors(errors);
				console.log('Form errors:', errors);
			}
			return false;
		}
	};

	useEffect(() => {
		if (hasTriedToSubmit) {
			validateForm();
		}
	}, [formData, hasTriedToSubmit]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setHasTriedToSubmit(true);

		if (isSubmitting) return;

		setIsSubmitting(true);
		const isValid = validateForm();

		if (isValid) {
			try {
				const response = await axios.post(
					'https://66d8747f37b1cadd8054b943.mockapi.io/api/DiscountItem',
					formData
				);
				console.log('Form submission successful:', response.data);
				resetForm();
				navigate('/management/kortingscodes');
			} catch (error) {
				console.error('Form submission error:', error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			console.log('Form contains errors. Submission aborted.');
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		resetForm();
		navigate('/management/kortingscodes');
	};

	return (
		<Container className="border p-4">
			<Form onSubmit={handleSubmit}>
				<Row>
					<Col md={5}>
						<div className="d-flex gap-3">
							<InfoIcon width={24} height={24} />
							<h5 className="text-dark fw-bold">Informatie</h5>
						</div>
						<hr className="py-2 " />
						<Col md={12} xl={12}>
							<DescriptionInput formErrors={formErrors} />
						</Col>
					</Col>
					<Col md={5}>
						<div className="d-flex gap-3">
							<SlidersIcon width={24} height={24} />
							<h5 className="text-dark fw-bold">Instellingen</h5>
						</div>
						<hr className="py-2 " />
						<Col md={12} xl={12}>
							<div className="mb-5 bg-input-bg p-4 ">
								<AmountTypeSelect formErrors={formErrors} />
								<hr />
								<AmountInput formErrors={formErrors} />
							</div>
							<div className="mb-5 bg-input-bg p-4 ">
								<DateInput formErrors={formErrors} />
							</div>
							<div className="mb-5 bg-input-bg p-4 ">
								<UsageInput formErrors={formErrors} />
							</div>
						</Col>
					</Col>
				</Row>
				<hr className="py-2 " />
				<div className="d-flex gap-2">
					<Button onClick={() => handleCancel()} variant="muted">
						Annuleren
					</Button>
					<Button
						type="submit"
						variant="secondary"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								Bezig...{' '}
								<Spinner animation="border" size="sm" />
							</>
						) : (
							'Opslaan'
						)}
					</Button>
				</div>
			</Form>
		</Container>
	);
}
