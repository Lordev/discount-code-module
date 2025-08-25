import { TrashIcon } from '../common/svg';
import { Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useDiscountListStore } from 'lib/store/useDiscountListStore';
import { FetchedDataWithState } from 'lib/types/fetchedData';
import { useState, useEffect } from 'react';

export default function DiscountCodeItem({
	data,
}: {
	data: FetchedDataWithState;
}) {
	const { removeDiscount } = useDiscountListStore();

	const handleDelete = async () => {
		try {
			removeDiscount(data);
			await axios.delete(
				`https://66d8747f37b1cadd8054b943.mockapi.io/api/DiscountItem/${data.objectId}`
			);
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	const {
		isActive,
		futureActive,
		isExpired,
		code,
		discountType,
		title,
		integerPart,
		discountPercentage,
		validFrom,
		validUntil,
		decimalPart,
	} = data;

	const validFromLocal = validFrom
		? new Date(validFrom).toLocaleDateString()
		: '';

	const validUntilLocal = validUntil
		? new Date(validUntil).toLocaleDateString()
		: '';

	return (
		<Card style={{ width: '295px' }}>
			<Card.Header className="d-flex align-items-center flex-column py-5 bg-primary">
				<Card.Text className="fw-bold mb-0 fs-3 py-1 px-3 border-border-dark border-dashed mb-3 bg-foreground-dark text-dark card-code-font">
					{code}
				</Card.Text>
				<small className="d-flex align-items-center justify-content-center gap-2">
					{isActive && (
						<>
							<Badge bg="success" className="text-uppercase">
								Active
							</Badge>
							{validUntilLocal && validFromLocal}
							{validUntilLocal && <b>until</b>}
							{validUntilLocal}
							{!validUntilLocal && <b>Unlimited</b>}
						</>
					)}
					{futureActive && (
						<>
							{!validUntilLocal && <b>From</b>}
							{validFromLocal}
							{validUntilLocal && <b>until</b>}
							{validUntilLocal}
						</>
					)}
					{isExpired && (
						<Badge bg="danger" className="text-uppercase">
							Expired
						</Badge>
					)}
				</small>
			</Card.Header>
			<Card.Body
				className="bg-foreground d-flex justify-content-between align-items-center 
			"
			>
				<div>
					<Card.Title className="custom-card-title">
						{title}
					</Card.Title>
					<Card.Text className="fs-xs text-muted">
						{discountType === 'Number'
							? `€${integerPart},${decimalPart.padEnd(
								2,
								'0'
							)} discount`
							: discountType === 'Percentage'
							? `${discountPercentage}% discount`
							: 'Unknown'}
					</Card.Text>
				</div>
				<TrashIcon
					data-testid="delete-button"
					width={14}
					height={15}
					className="hover-text-secondary cursor-pointer"
					onClick={handleDelete}
				/>
			</Card.Body>
		</Card>
	);
}
