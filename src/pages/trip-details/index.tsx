import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { api } from '../../lib/axios';
import { ActivityList } from './trip-details-components/activity-list';
import { ConfirmParticipationModal } from './trip-details-components/confirm-participation-modal';
import { CreateActivityModal } from './trip-details-components/create-activity-modal';
import { CreateLinkModal } from './trip-details-components/create-link-modal';
import { DestinationAndDateHeader } from './trip-details-components/destination-and-date-header';
import { GuestList } from './trip-details-components/guest-list';
import { ImportantLinks } from './trip-details-components/important-links';

export interface Trip {
	id: string;
	destination: string;
	starts_at: string;
	ends_at: string;
	is_confirmed: boolean;
}

export function TripDetailsPage() {
	const navigate = useNavigate();

	const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
	const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
	const [isConfirmParticipationModalOpen, setIsConfirmParticipationModalOpen] = useState(false);

	const handleCreateArtivityModal = () => {
		isCreateActivityModalOpen
			? setIsCreateActivityModalOpen(false)
			: setIsCreateActivityModalOpen(true);
	};

	const handleCreateLinkModal = () => {
		isCreateLinkModalOpen ? setIsCreateLinkModalOpen(false) : setIsCreateLinkModalOpen(true);
	};

	const handleConfirmParticipationModal = () => {
		isConfirmParticipationModalOpen
			? setIsConfirmParticipationModalOpen(false)
			: setIsConfirmParticipationModalOpen(true);
	};

	function changeDestinationOrData(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		navigate('/');
	}

	const { tripId } = useParams();
	const [trip, setTrip] = useState<Trip | undefined>();

	useEffect(() => {
		api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
	}, [tripId]);

	const displayedDate = trip
		? `${format(trip.starts_at, "LLLL d', 'Y")} to ${format(trip.ends_at, "LLLL d', 'Y")}`
		: null;

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader
				changeDestinationOrData={changeDestinationOrData}
				trip={trip}
				displayedDate={displayedDate}
			/>
			<main className="flex gap-16 px-4">
				<div className="flex-1 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-semibold">Activities</h2>
						<Button onClick={handleCreateArtivityModal} variant="primary">
							<Plus className="size-5" />
							Create Activity
						</Button>
					</div>
					<ActivityList />
				</div>

				<div className="w-80 space-y-6">
					<ImportantLinks handleCreateLinkModal={handleCreateLinkModal} />
					<div className="w-full h-px bg-zinc-800" />
					<GuestList handleConfirmParticipationModal={handleConfirmParticipationModal} />
				</div>
			</main>

			{isCreateActivityModalOpen && (
				<CreateActivityModal handleCreateArtivityModal={handleCreateArtivityModal} />
			)}

			{isCreateLinkModalOpen && <CreateLinkModal handleCreateLinkModal={handleCreateLinkModal} />}

			{isConfirmParticipationModalOpen && (
				<ConfirmParticipationModal
					handleConfirmParticipationModal={handleConfirmParticipationModal}
					trip={trip}
					displayedDate={displayedDate}
				/>
			)}
		</div>
	);
}
