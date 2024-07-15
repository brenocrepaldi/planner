import { Mail, User, X } from 'lucide-react';
import { Button } from '../../../components/button';

interface ConfirmParticipationModalProps {
	handleConfirmParticipationModal: () => void;
}

export function ConfirmParticipationModal({
	handleConfirmParticipationModal,
}: ConfirmParticipationModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Confirm Participation</h2>
						<button onClick={handleConfirmParticipationModal}>
							<X className="size-5 text-zinc-400" />
						</button>
					</div>
					<p className="text-sm text-zinc-400">
						You have been invited to participate in a trip to{' '}
						<strong className="font-semibold text-zinc-100">Florianópolis, Brazil</strong> from{' '}
						<strong className="font-semibold text-zinc-100">August 16 to 27, 2024</strong> .
					</p>
				</div>

				<form className="space-y-3">
					<div className="space-y-2">
						<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
							<User className="text-zinc-400 size-5" />
							<input
								type="text"
								placeholder="Your full name"
								className="bg-transparent placeholder-zinc-400 outline-none flex-1"
							/>
						</div>
						<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
							<Mail className="text-zinc-400 size-5" />
							<input
								type="email"
								name="email"
								placeholder="Your email"
								className="bg-transparent placeholder-zinc-400 outline-none flex-1"
							/>
						</div>
					</div>
					<Button variant="primary" size="full">
						Confirm my participation
					</Button>
				</form>
			</div>
		</div>
	);
}
