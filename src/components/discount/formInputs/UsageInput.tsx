import Form from 'react-bootstrap/Form';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import { Row, Col } from 'react-bootstrap';

interface UsageInputProps {
	formErrors: { [key: string]: string };
}

export default function UsageInput({ formErrors }: UsageInputProps) {
	const { formData, setFormValue } = useFormStore();

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		setFormValue('hasUsageLimit', isChecked);
		if (!isChecked) {
			setFormValue('usageCount', '');
		}
	};

	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col lg={4}>
					<Form.Label
						aria-label="Maximum Usage"
						htmlFor="hasUsageLimit"
						className="fw-bold"
					>
						Maximum Usage
					</Form.Label>
				</Col>
				<Col lg={8}>
					<Form.Check
						type="checkbox"
						id="hasUsageLimit"
						label="Yes"
						checked={formData.hasUsageLimit}
						onChange={e => handleCheckboxChange(e)}
					/>
				</Col>
			</Row>
			<Row className="align-items-center">
				<Col lg={4}>
					<Form.Label
						aria-label="Number of Uses"
						htmlFor="usageCount"
						className="fw-bold"
					>
						Number of Uses
					</Form.Label>
				</Col>
				<Col lg={8}>
					<Form.Control
						disabled={!formData.hasUsageLimit}
						min={1}
						type="number"
						className="form-date w-25"
						id="usageCount"
						value={formData.usageCount}
						onChange={e =>
							setFormValue('usageCount', e.target.value)
						}
					/>
					<Form.Control.Feedback>
						{formErrors.usageCount}
					</Form.Control.Feedback>
				</Col>
			</Row>
		</>
	);
}
