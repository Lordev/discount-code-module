import { Col, Form, Row } from 'react-bootstrap';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import { useEffect, useRef } from 'react';

export default function AmountInput({
	formErrors,
}: {
	formErrors: Record<string, string>;
}) {
	const { formData, setFormValue, discountAmount } = useFormStore();
	const sliderUsedRef = useRef(false);

	useEffect(() => {
		if (discountAmount) {
			const [integerPart, decimalPart] = discountAmount.split(',');
			setFormValue('integerPart', integerPart);
			setFormValue('decimalPart', decimalPart);
		}
		if (
			formData.discountType === 'Number' &&
			formData.integerPart &&
			!formData.decimalPart
		) {
			setFormValue('decimalPart', '0');
		}
	}, [discountAmount, formData.discountType, formData.integerPart, formData.decimalPart, setFormValue]);

	const renderNumberInputs = () => (
		<Col lg={8} xl={5} className="d-flex">
			<Form.Group>
				<Form.Control
					aria-label="Whole Number"
					placeholder="1,000"
					type="number"
					id="integerPart"
					value={formData.integerPart}
					onChange={e => {
						const newValue = e.target.value;
						if (parseFloat(newValue) > 0) {
							setFormValue('integerPart', newValue);
						}
					}}
					isInvalid={!!formErrors.integerPart}
				/>
				<Form.Control.Feedback type="invalid">
					{formErrors.integerPart}
				</Form.Control.Feedback>
			</Form.Group>
			<span className="mx-2 mt-3">,</span>
			<Form.Group>
				<Form.Control
					aria-label="Decimal"
					placeholder="00"
					id="decimalPart"
					type="number"
					value={formData.decimalPart}
					onChange={e => {
						const newValue = e.target.value;
						if (newValue.length <= 2 && parseInt(newValue) >= 0) {
							setFormValue('decimalPart', newValue);
						}
					}}
					isInvalid={!!formErrors.decimalPart}
				/>
				<Form.Control.Feedback type="invalid">
					{formErrors.decimalPart}
				</Form.Control.Feedback>
			</Form.Group>
		</Col>
	);

	const renderPercentageInputs = () => (
		<Col lg={8}>
			<Row>
				<Col md={4}>
					<Form.Control
						aria-label="Percentage"
						id="percentage"
						min="1"
						max="99"
						value={formData.discountPercentage}
						placeholder="00"
						onChange={e => {
							setFormValue('discountPercentage', e.target.value);
							sliderUsedRef.current = true;
						}}
						isInvalid={!sliderUsedRef.current || !!formErrors.discountPercentage}
					/>
				</Col>
				<Col md={8}>
					<Form.Range
						aria-label="Percentage"
						id="percentage"
						min="1"
						max="100"
						className="col-md-4"
						value={formData.discountPercentage}
						onChange={e => {
							setFormValue('discountPercentage', e.target.value);
							sliderUsedRef.current = true;
						}}
					/>
				</Col>
				<Form.Control.Feedback type="invalid">
					{!sliderUsedRef.current
						? 'Please select a percentage using the slider.'
						: formErrors.discountPercentage}
				</Form.Control.Feedback>
			</Row>
		</Col>
	);

	return (
		<>
			<Row>
				<Col md={4}>
					<Form.Label
						aria-label="Discount Amount"
						htmlFor="discountAmount"
						className="fw-bold mt-2 "
					>
						Discount Amount
					</Form.Label>
				</Col>
				{formData.discountType === 'Number' ? renderNumberInputs() : renderPercentageInputs()}
			</Row>
		</>
	);
}
