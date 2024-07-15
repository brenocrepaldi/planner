import { Mail, X } from 'lucide-react';
import { Button } from '../../../components/button';
import { Trip } from '..';
import { FormEvent } from 'react';
import { api } from '../../../lib/axios';

interface ConfirmParticipationModalProps {
	handleConfirmParticipationModal: () => void;
	trip: Trip | undefined;
	displayedDate: string | null;
}

export function ConfirmParticipationModal({
	handleConfirmParticipationModal,
	trip,
	displayedDate,
}: ConfirmParticipationModalProps) {
	async function confirmParticipant(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const email = data.get('email')?.toString();

		await api.get(`/participants/${email}/confirm`);

		location.reload();
	}

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Manage Guests</h2>
						<button onClick={handleConfirmParticipationModal}>
							<X className="size-5 text-zinc-400" />
						</button>
					</div>
					<p className="text-sm text-zinc-400">
						Manage the guests for the trip to{' '}
						<strong className="font-semibold text-zinc-100">{trip?.destination}</strong> from{' '}
						<strong className="font-semibold text-zinc-100">{displayedDate}</strong> .
					</p>
				</div>

				<form onSubmit={confirmParticipant} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
						<Mail className="text-zinc-400 size-5" />
						<input
							type="email"
							name="email"
							placeholder="Guest email"
							className="bg-transparent placeholder-zinc-400 outline-none flex-1"
						/>
					</div>
					<Button variant="primary" size="full">
						Confirm Participation
					</Button>
				</form>
			</div>
		</div>
	);
}
