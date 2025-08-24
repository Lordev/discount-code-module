import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Col, Tab, Row, Spinner, Container } from 'react-bootstrap';

const Management = lazy(() => import('./pages/management'));
const Discountcodes = lazy(() => import('./pages/management/discount'));
const DiscountcodesNew = lazy(
	() => import('./pages/management/discount/new')
);

const App: React.FC = () => {
	return (
		<>
			<Tab.Container>
				<Row className="no-gutter-row">
					<Col sm={10} lg={10} xl={11} className="no-gutter-row mx-auto">
						<Container
							fluid={'xxl'}
							className="mt-5 px-sm-5 px-3 min-vh-75"
						>
							<Suspense fallback={<Spinner animation="border" />}>
								<Routes>
									<Route
										path="/management"
										element={<Management />}
									>
										<Route
											path="discount"
											element={<Discountcodes />}
										>
											<Route
												path="new"
												element={<DiscountcodesNew />}
											/>
										</Route>
									</Route>
									{/* Redirect default to /management/Discountcodes */}
									<Route
										path="*"
										element={
											<Navigate
												to="/management/discount"
												replace
											/>
										}
									/>
								</Routes>
							</Suspense>
						</Container>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default App;
