import { MapPin, Calendar, Settings2 } from 'lucide-react';
import { Button } from '../../../components/button';
import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../lib/axios';
import { format } from 'date-fns';

interface DestinationAndDateHeaderProps {
	changeDestinationOrData: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface Trip {
	id: string;
	destination: string;
	starts_at: string;
	ends_at: string;
	is_confirmed: boolean;
}

export function DestinationAndDateHeader({
	changeDestinationOrData,
}: DestinationAndDateHeaderProps) {
	const { tripId } = useParams();
	const [trip, setTrip] = useState<Trip | undefined>();

	useEffect(() => {
		api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
	}, [tripId]);

	const displayedDate = trip
		? `${format(trip.starts_at, 'LLL d')} to ${format(trip.ends_at, 'LLL d')}`
		: null;

	return (
		<div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
			<div className="flex items-center gap-2">
				<MapPin className="size-5 text-zinc-400" />
				<span className="text-lg text-zinc-100">{trip?.destination}</span>
			</div>

			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<Calendar className="size-5 text-zinc-400" />
					<span className="text-zinc-100">{displayedDate}</span>
				</div>

				<div className="w-px h-6 bg-zinc-800"></div>

				<Button onClick={changeDestinationOrData} variant="secondary">
					Change location/date
					<Settings2 className="size-5" />
				</Button>
			</div>
		</div>
	);
}
