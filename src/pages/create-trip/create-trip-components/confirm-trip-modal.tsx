import { Mail, User, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../../components/button';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface ConfirmTripModalProps {
	handleConfirmTripModal: () => void;
	createTrip: (event: FormEvent<HTMLFormElement>) => void;
	setOwnerName: (name: string) => void;
	setOwnerEmail: (email: string) => void;
	destination: string;
	dateRange: DateRange | undefined;
}

export function ConfirmTripModal({
	handleConfirmTripModal,
	createTrip,
	setOwnerName,
	setOwnerEmail,
	destination,
	dateRange,
}: ConfirmTripModalProps) {
	const displayedDate =
		dateRange && dateRange.from && dateRange.to
			? `${format(dateRange.from, 'MMMM d')} to ${format(dateRange.to, 'MMMM d')}`
			: null;
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Confirm trip creation</h2>
						<button onClick={handleConfirmTripModal}>
							<X className="size-5 text-zinc-400" />
						</button>
					</div>
					{destination && displayedDate ? (
						<p className="text-sm text-zinc-400">
							To complete trip's creation to{' '}
							<strong className="font-semibold text-zinc-100">{destination}</strong> on{' '}
							<strong className="font-semibold text-zinc-100">{displayedDate}</strong>, please fill
							in your details below:
						</p>
					) : (
						<p className="text-sm text-zinc-400">Fill in the trip details to confirm.</p>
					)}
				</div>

				{destination && displayedDate && (
					<form onSubmit={createTrip} className="space-y-3">
						<div className="space-y-2">
							<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
								<User className="text-zinc-400 size-5" />
								<input
									type="text"
									placeholder="Your full name"
									className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
									onChange={(event) => setOwnerName(event.target.value)}
								/>
							</div>

							<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
								<Mail className="text-zinc-400 size-5" />
								<input
									type="email"
									name="email"
									placeholder="Your best email"
									className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
									onChange={(event) => setOwnerEmail(event.target.value)}
								/>
							</div>
						</div>
						<Button type="submit" variant="primary" size="full">
							Confirm trip creation
						</Button>
					</form>
				)}
			</div>
		</div>
	);
}
