import { Calendar, MapPin, Settings2 } from 'lucide-react';
import { MouseEvent } from 'react';
import { Button } from '../../../components/button';
import { Trip } from '..';

interface DestinationAndDateHeaderProps {
	changeDestinationOrData: (event: MouseEvent<HTMLButtonElement>) => void;
	trip: Trip | undefined;
	displayedDate: string | null;
}

export function DestinationAndDateHeader({
	changeDestinationOrData,
	trip,
	displayedDate,
}: DestinationAndDateHeaderProps) {
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
