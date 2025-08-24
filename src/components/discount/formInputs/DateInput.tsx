import { Form } from 'react-bootstrap';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import { Row, Col } from 'react-bootstrap';

interface DateInputProps {
	formErrors: Record<string, string>;
}

export default function DateInput({ formErrors }: DateInputProps) {
	const { formData, setFormValue } = useFormStore();

	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col lg={4}>
					<Form.Label
						aria-label="Valid From Date"
						htmlFor="validFrom"
						className="fw-bold"
					>
						Valid From Date
					</Form.Label>
				</Col>
				<Col lg={8}>
					<Form.Control
						type="date"
						className="form-date"
						id="validFrom"
						value={formData.validFrom}
						min={new Date().toISOString().split('T')[0]}
						onChange={e =>
							setFormValue('validFrom', e.target.value)
						}
						max={formData.validUntil || undefined}
						isInvalid={!!formErrors.validFrom}
					/>
					<Form.Control.Feedback type="invalid">
						{formErrors.validFrom}
					</Form.Control.Feedback>
				</Col>
			</Row>
			<Row className="align-items-center">
				<Col lg={4}>
					<Form.Label
						aria-label="Valid Until Date"
						htmlFor="validUntil"
						className="fw-bold"
					>
						Valid Until Date
					</Form.Label>
					<i className="d-block">(optional)</i>
				</Col>
				<Col lg={8}>
					<Form.Control
						type="date"
						className="form-date"
						id="validUntil"
						value={formData.validUntil}
						onChange={e =>
							setFormValue('validUntil', e.target.value)
						}
						min={
							formData.validFrom ||
							new Date().toISOString().split('T')[0]
						}
						isInvalid={!!formErrors.validUntil}
					/>
					<Form.Control.Feedback type="invalid">
						{formErrors.validUntil}
					</Form.Control.Feedback>
				</Col>
			</Row>
		</>
	);
}
