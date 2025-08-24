import { Nav, Navbar } from 'react-bootstrap';
import { ShoppingIcon } from '../../components/common/svg';
import { Link, useLocation, Outlet } from 'react-router-dom';

const managementLinkTabs = [
	{
		path: '/management/discount',
		title: 'Discount Codes',
	},
];

export default function Management() {
	const location = useLocation();

	return (
		<>
			<div className="d-flex gap-3 align-items-center">
				<ShoppingIcon width={30} height={27} />
				<h1>Shop</h1>
			</div>
			<hr className="border-3" />
			<Navbar className="mt-4 p-0">
				<div className="no-gutter-row d-flex flex-wrap  g-col-2 justify-content-end">
					{managementLinkTabs.map((tab, i) => (
						<Nav.Item
							key={tab.path}
							as={Link}
							to={tab.path}
							className={`d-flex align-items-center py-2 px-3 justify-content-center text-decoration-none text-dark fw-bold hover-bg-secondary rounded-lg-top bg-input-bg flex-item 
								${location.pathname.startsWith(tab.path) ? 'bg-secondary ' : ''}`}
							style={{
								flexGrow: 1,
								flexBasis: '0',
								maxWidth: '250px',
							}}
						>
							{tab.title}
						</Nav.Item>
					))}
				</div>
			</Navbar>
			<Outlet />
		</>
	);
}
