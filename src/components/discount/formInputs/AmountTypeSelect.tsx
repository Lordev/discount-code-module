import { Form } from 'react-bootstrap';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import { Row, Col } from 'react-bootstrap';

interface TypeInputProps {
	formErrors: { [key: string]: string };
}

export default function Typeinput({ formErrors }: TypeInputProps) {
	const { formData, setFormValue } = useFormStore();
	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col lg={4}>
					<Form.Label
						aria-label="Discount Type"
						htmlFor="discountType"
						className="fw-bold"
					>
						Discount Type
					</Form.Label>
				</Col>
				<Col lg={8}>
					<Form.Select
						className="form-select"
						id="discountType"
						value={formData.discountType}
						onChange={e =>
							setFormValue('discountType', e.target.value)
						}
						isInvalid={!!formErrors.discountType}
					>
						<option value="Number">Number</option>
						<option value="Percentage">Percentage</option>
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{formErrors.discountType}
					</Form.Control.Feedback>
				</Col>
			</Row>
		</>
	);
}
