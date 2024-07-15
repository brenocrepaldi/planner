import { CircleCheck, CircleDashed, UserCog } from 'lucide-react';
import { Button } from '../../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import axios from 'axios';

interface GuestListProps {
	handleConfirmParticipationModal: () => void;
}

interface Participant {
	id: string;
	name: string | null;
	email: string;
	is_confirmed: boolean;
}

export function GuestList({ handleConfirmParticipationModal }: GuestListProps) {
	const { tripId } = useParams();
	const [participantList, setParticipantList] = useState<Participant[]>([]);

	useEffect(() => {
		try {
			api
				.get(`/trips/${tripId}/participants`)
				.then((response) => setParticipantList(response.data.participants));
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error('Response data:', error.response.data);
					console.error('Response status:', error.response.status);
				} else if (error.request) {
					console.error('Request data:', error.request);
				} else {
					console.error('Error message:', error.message);
				}
			}
		}
	}, [tripId]);

	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Guests</h2>
			<div className="space-y-5">
				{participantList?.map((participant) => {
					return (
						<div key={participant.id} className="flex items-center justify-between gap-4">
							<div className="space-y-1.5">
								<span className="block font-medium text-zinc-100">{participant.name}</span>
								<span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
							</div>
							{participant.is_confirmed ? (
								<CircleCheck className="text-lime-300 size-5 shrink-0" />
							) : (
								<CircleDashed className="text-zinc-400 size-5 shrink-0" />
							)}
						</div>
					);
				})}
			</div>

			<Button onClick={handleConfirmParticipationModal} variant="secondary" size="full">
				<UserCog className="size-5" />
				Manage guests
			</Button>
		</div>
	);
}
