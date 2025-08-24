import { Form } from 'react-bootstrap';
import { useFormStore } from 'lib/store/useDiscountFormStore';
import axios from 'axios';
import RefreshIcon from 'components/common/svg/RefreshIcon';
import { Row, Col } from 'react-bootstrap';

interface DescriptionInputProps {
	formErrors: { [key: string]: string };
}

export default function DescriptionInput({
	formErrors,
}: DescriptionInputProps) {
	const { formData, setFormValue } = useFormStore();

	const callRandomCode = async () => {
		const transformUppercase = (str: string) => {
			return str.toUpperCase();
		};
		const res = await axios.get(
			'https://random-word-api.herokuapp.com/word'
		);
		setFormValue('code', transformUppercase(res.data[0]));
	};

	return (
		<>
			<Row className="mb-2 align-items-center">
				<Col md={4}>
					<Form.Label
						className="fw-bold"
						htmlFor="title"
						aria-label="Title"
					>
						Title
					</Form.Label>
				</Col>
				<Col md={8}>
					<Form.Control
						type="text"
						id="title"
						value={formData.title}
						onChange={e => setFormValue('title', e.target.value)}
						isInvalid={!!formErrors.title}
					/>
					<Form.Control.Feedback type="invalid">
						{formErrors.title}
					</Form.Control.Feedback>
				</Col>
			</Row>

			<Row className="mb-2 align-items-center">
				<Col md={4}>
					<Form.Label
						className="fw-bold"
						htmlFor="code"
						aria-label="Code"
					>
						Code
					</Form.Label>
				</Col>
				<Col md={8} className="position-relative">
					<Form.Control
						type="text"
						id="code"
						value={formData.code}
						placeholder="SPRING20"
						onChange={e => setFormValue('code', e.target.value)}
						isInvalid={!!formErrors.code}
					/>
					<RefreshIcon
						className="position-absolute end-25 top-50 translate-middle-y text-gray-light cursor-pointer"
						onClick={() => {
							callRandomCode();
						}}
					/>
					<Form.Control.Feedback type="invalid">
						{formErrors.code}
					</Form.Control.Feedback>
				</Col>
			</Row>
			<Row className="mb-2">
				<Col md={4} className="mt-2">
					<Form.Label
						className="fw-bold"
						aria-label="Description"
						htmlFor="description"
					>
						Description
					</Form.Label>
				</Col>
				<Col md={8}>
					<Form.Control
						as="textarea"
						rows={5}
						id="description"
						value={formData.description}
						placeholder="Describe the discount action here. What is the discount intended for?"
						onChange={e =>
							setFormValue('description', e.target.value)
						}
						isInvalid={!!formErrors.description}
					/>
					<Form.Control.Feedback type="invalid">
						{formErrors.description}
					</Form.Control.Feedback>
				</Col>
			</Row>
		</>
	);
}
