import { Link2, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { useEffect, useState } from "react";
import axios from "axios";

interface ImportantLinksProps {
	handleCreateLinkModal: () => void;
}

interface Link {
	id: string;
	title: string;
	url: string;
}

export function ImportantLinks({ handleCreateLinkModal }: ImportantLinksProps) {
	const { tripId } = useParams();
	const [linkList, setLinkList] = useState<Link[]>([]);

	useEffect(() => {
		try {
			api.get(`/trips/${tripId}/links`).then((response) => setLinkList(response.data.links));
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error("Response data:", error.response.data);
					console.error("Response status:", error.response.status);
				} else if (error.request) {
					console.error("Request data:", error.request);
				} else {
					console.error("Error message:", error.message);
				}
			}
		}
	}, [tripId]);

	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Links importantes</h2>
			<div className="space-y-5">
				{linkList.map((link) => {
					return (
						<div key={link.id} className="flex items-center justify-between gap-4">
							<div className="space-y-1.5">
								<span className="block font-medium text-zinc-100">{link.title}</span>
								<a
									href={link.url}
									target="_blank"
									className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
								>
									{link.url}
								</a>
							</div>
							<Link2 className="text-zinc-400 size-5 shrink-0" />
						</div>
					);
				})}
			</div>

			<Button onClick={handleCreateLinkModal} variant="secondary" size="full">
				<Plus className="size-5" />
				Cadastrar novo link
			</Button>
		</div>
	);
}
