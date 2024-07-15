import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../lib/axios';
import axios from 'axios';
import { format } from 'date-fns';

interface Activitiy {
	date: string;
	activities: { id: string; title: string; occurs_at: string }[];
}

export function ActivityList() {
	const { tripId } = useParams();
	const [activityList, setActivitiyList] = useState<Activitiy[]>([]);

	useEffect(() => {
		try {
			api
				.get(`/trips/${tripId}/activities`)
				.then((response) => setActivitiyList(response.data.activities));
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
		<div className="space-y-8">
			{activityList.map((activity) => {
				return (
					<div key={activity.date} className="space-y-2.5">
						<div className="flex gap-2 items-baseline">
							<span className="text-xl text-zinc-300 font-semibold">
								{format(activity.date, "'Day 'd")}
							</span>
							<span className="text-xs text-zinc-500">{format(activity.date, 'eeee')}</span>
						</div>
						{activity.activities.length > 0 ? (
							<div className="space-y-2.5">
								{activity.activities.map((activityDetails) => {
									return (
										<div key={activityDetails.id}>
											<div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
												<CircleCheck className="size-5 text-lime-300" />
												<span className="text-zinc-100">{activityDetails.title}</span>
												<span className="text-zinc-400 text-sm ml-auto">
													{format(activityDetails.occurs_at, 'p')}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<p className="text-sm text-zinc-500">No activities scheduled for this date.</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
