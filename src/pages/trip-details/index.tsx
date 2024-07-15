import { Plus } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { CreateActivityModal } from './trip-details-components/create-activity-modal';
import { ImportantLinks } from './trip-details-components/important-links';
import { GuestList } from './trip-details-components/guest-list';
import { ActivityList } from './trip-details-components/activity-list';
import { DestinationAndDateHeader } from './trip-details-components/destination-and-date-header';
import { Button } from '../../components/button';
import { CreateLinkModal } from './trip-details-components/create-link-modal';
import { ConfirmParticipationModal } from './trip-details-components/confirm-participation-modal';
import { useNavigate } from 'react-router-dom';

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

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader changeDestinationOrData={changeDestinationOrData} />
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
				/>
			)}
		</div>
	);
}
