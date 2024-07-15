import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react';
import { Button } from '../../../../components/button';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { DatePickerModal } from './date-picker-modal';

interface DestinationAndDateStepProps {
	isGuestsInputOpen: boolean;
	handleGuestsInput: () => void;
	setDestination: (destination: string) => void;
	dateRange: DateRange | undefined;
	setDateRange: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
	isGuestsInputOpen,
	handleGuestsInput,
	setDestination,
	dateRange,
	setDateRange,
}: DestinationAndDateStepProps) {
	const initialRange: DateRange = {
		from: new Date(),
	};
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const handleDatePicker = () => {
		isDatePickerOpen ? setIsDatePickerOpen(false) : setIsDatePickerOpen(true);
	};

	const displayedDate =
		dateRange !== initialRange && dateRange && dateRange.from && dateRange.to
			? `${format(dateRange.from, 'LLL d')} to ${format(dateRange.to, 'LLL d')}`
			: null;

	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					disabled={isGuestsInputOpen}
					className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
					type="text"
					placeholder="Where are you going?"
					onChange={(event) => setDestination(event.target.value)}
				/>
			</div>

			<button
				disabled={isGuestsInputOpen}
				onClick={handleDatePicker}
				className="flex items-center gap-2 text-left w-[240px]"
			>
				<Calendar className="size-5 text-zinc-400" />
				<span className="text-lg text-zinc-400">{displayedDate || 'When?'}</span>
			</button>

			{isDatePickerOpen && (
				<DatePickerModal
					handleDatePicker={handleDatePicker}
					dateRange={dateRange}
					setDateRange={setDateRange}
				/>
			)}

			<div className="w-px h-6 bg-zinc-800"></div>

			{isGuestsInputOpen ? (
				<Button onClick={handleGuestsInput} variant="secondary">
					Change location/date
					<Settings2 className="size-5" />
				</Button>
			) : (
				<Button onClick={handleGuestsInput} variant="primary">
					Next
					<ArrowRight className="size-5" />
				</Button>
			)}
		</div>
	);
}
