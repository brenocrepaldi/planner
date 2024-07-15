import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { Button } from '../../../../components/button';

interface InviteGuestsStepProps {
	emailsToInvite: string[];
	handleGuestsModal: () => void;
	handleConfirmTripModal: () => void;
}

export function InviteGuestsStep({
	emailsToInvite,
	handleConfirmTripModal,
	handleGuestsModal,
}: InviteGuestsStepProps) {
	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<button
				type="button"
				onClick={handleGuestsModal}
				className="flex items-center gap-2 flex-1 text-left"
			>
				<UserRoundPlus className="size-5 text-zinc-400" />
				{emailsToInvite.length > 0 ? (
					<span className="text-zinc-100 text-lg flex-1">
						{emailsToInvite.length} invited {emailsToInvite.length > 1 ? 'people' : 'person'}
					</span>
				) : (
					<span className="text-zinc-400 text-lg flex-1">Who will be on the trip?</span>
				)}
			</button>
			<div className="w-px h-6 bg-zinc-800"></div>
			<Button onClick={handleConfirmTripModal} variant="primary">
				Confirm trip
				<ArrowRight className="size-5" />
			</Button>
		</div>
	);
}
