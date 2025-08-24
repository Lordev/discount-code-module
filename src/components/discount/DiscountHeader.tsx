import DiscountcodeFilter from './DiscountFilter';
import { Container, Row } from 'react-bootstrap';

export default function DiscountHeader() {
	return (
		<div className="bg-foreground pt-5 px-4 px-md-5 pb-4">
			<h4 className="mb-4 ">Discount Codes Overview</h4>
			<Container>
				<Row lg={2}>
					<p className="no-gutter-row">
						<small className="text-muted">
							In this module, you can create discount codes and choose where (potential) members can use them. For example, a discount code for new members to earn back their trial lesson costs.
						</small>
					</p>
				</Row>
			</Container>
			<hr className="my-4" />
			<DiscountcodeFilter />
		</div>
	);
}
