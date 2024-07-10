import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./trip-details-components/create-activity-modal";
import { ImportantLinks } from "./trip-details-components/inportant-links";
import { GuestList } from "./trip-details-components/guest-list";
import { ActivityList } from "./trip-details-components/activity-list";
import { DestinationAndDateHeader } from "./trip-details-components/destination-and-date-header";

export function TripDetailsPage() {
	const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
		useState(false);

	const handleCreateArtivityModal = () => {
		isCreateActivityModalOpen
			? setIsCreateActivityModalOpen(false)
			: setIsCreateActivityModalOpen(true);
	};

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader />
			<main className="flex gap-16 px-4">
				<div className="flex-1 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-semibold">Atividades</h2>
						<button
							onClick={handleCreateArtivityModal}
							className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
						>
							<Plus className="size-5" />
							Cadastrar atividade
						</button>
					</div>
					<ActivityList />
				</div>

				<div className="w-80 space-y-6">
					<ImportantLinks />
					<div className="w-full h-px bg-zinc-800" />
					<GuestList />
				</div>
			</main>

			{isCreateActivityModalOpen && (
				<CreateActivityModal
					handleCreateArtivityModal={handleCreateArtivityModal}
				/>
			)}
		</div>
	);
}
