import DiscountList from '../../../components/discount/DiscountList';
import DiscountHeader from '../../../components/discount/DiscountHeader';
import { Outlet, useLocation } from 'react-router';

export default function Discount() {
	const location = useLocation();
	return (
		<>
			{location.pathname === '/management/discount' ? (
				<>
					<DiscountHeader />
					<DiscountList />
				</>
			) : (
				<>
					<Outlet />
				</>
			)}
		</>
	);
}
