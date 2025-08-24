import React, { useState } from 'react';
import Button from '../common/buttons/Button';
import SearchIcon from '../common/svg/SearchIcon';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { PlusIcon } from '../common/svg';
import { useNavigate } from 'react-router-dom';
import { useDiscountListStore } from 'lib/store/useDiscountListStore';

export default function DiscountFilter() {
	const { setSortingOption, setSearchQuery, setShowInactiveDiscounts } =
		useDiscountListStore();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/management/discount/new');
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortingOption(e.target.value);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleShowInactive = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowInactiveDiscounts(e.target.checked);
	};

	return (
		<div className="d-flex gap-3 align-items-center flex-wrap">
			<Form.Select
				className=" fs-sm"
				onChange={handleSortChange}
				style={{ maxWidth: '300px' }}
			>
				<option value="title">Sort by title</option>
				<option value="date">Sort by valid from date</option>
			</Form.Select>
			<InputGroup
				className=""
				style={{ maxWidth: '300px' }}
				onChange={handleSearch}
			>
				<Form.Control type="text" placeholder="Search based on title" />
				<Button>
					<SearchIcon width={14} height={14} />
					Zoeken
				</Button>
			</InputGroup>
			<Form.Check
				type="checkbox"
				id="custom-switch"
				onChange={handleShowInactive}
				className="align-content-center d-flex gap-2 fs-sm"
				label={
					<span>
						Show{' '}
						<span style={{ textDecoration: 'underline' }}>all</span>{' '}
						inactive discount codes
					</span>
				}
			/>
			<Button onClick={handleClick} className="ms-xxl-auto">
				<PlusIcon width={14} height={14} />
				New Discount Code
			</Button>
		</div>
	);
}
