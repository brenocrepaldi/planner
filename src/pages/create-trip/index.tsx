import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./create-trip-components/invite-guests-modal";
import { ConfirmTripModal } from "./create-trip-components/confirm-trip-modal";
import { DestinationAndDateStep } from "./create-trip-components/steps/destination-and-date-step";
import { InviteGuestsStep } from "./create-trip-components/steps/inveite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";
import axios from "axios";

export function CreateTripPage() {
	const navigate = useNavigate();

	const [isGuestsInputOpen, setIsGuestInputOpen] = useState(false);
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
	const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
	const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

	const [destination, setDestination] = useState("");
	const [dateRange, setDateRange] = useState<DateRange | undefined>();
	const [ownerName, setOwnerName] = useState("");
	const [ownerEmail, setOwnerEmail] = useState("");

	const handleGuestsInput = () => {
		isGuestsInputOpen ? setIsGuestInputOpen(false) : setIsGuestInputOpen(true);
	};

	const handleGuestsModal = () => {
		isGuestsModalOpen ? setIsGuestsModalOpen(false) : setIsGuestsModalOpen(true);
	};

	const handleConfirmTripModal = () => {
		isConfirmTripModalOpen ? setIsConfirmTripModalOpen(false) : setIsConfirmTripModalOpen(true);
	};

	const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const email = data.get("email")?.toString();

		if (!email) {
			return;
		}

		if (emailsToInvite.includes(email)) {
			return;
		}

		setEmailsToInvite([...emailsToInvite, email]);

		event.currentTarget.reset();
	};

	const removeEmailFromInvite = (emailToRemove: string) => {
		const newEmailList = emailsToInvite.filter((email) => email !== emailToRemove);

		setEmailsToInvite(newEmailList);
	};

	async function createTrip(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (
			!destination ||
			!dateRange?.from ||
			!dateRange?.to ||
			!emailsToInvite ||
			emailsToInvite.length == 0 ||
			!ownerName ||
			!ownerEmail
		)
			return;

		try {
			const response = await api.post("/trips", {
				destination,
				starts_at: dateRange.from,
				ends_at: dateRange.to,
				emails_to_invite: emailsToInvite,
				owner_name: ownerName,
				owner_email: ownerEmail,
			});

			const { tripId } = response.data;

			navigate(`/trips/${tripId}`);
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
	}

	return (
		<div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10 -mt-20">
				<div className="flex flex-col items-center">
					<img className="size-52 -mb-16" src="/logo.svg" alt="Logo planner" />
					<p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
				</div>

				<div className="space-y-4">
					<DestinationAndDateStep
						isGuestsInputOpen={isGuestsInputOpen}
						handleGuestsInput={handleGuestsInput}
						setDestination={setDestination}
						dateRange={dateRange}
						setDateRange={setDateRange}
					/>

					{isGuestsInputOpen && (
						<InviteGuestsStep
							emailsToInvite={emailsToInvite}
							handleGuestsModal={handleGuestsModal}
							handleConfirmTripModal={handleConfirmTripModal}
						/>
					)}
				</div>

				<p className="text-sm text-zinc-500">
					Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos{" "}
					<a href="#" className="text-zinc-300 underline">
						termos de uso
					</a>{" "}
					e
					<a href="#" className="text-zinc-300 underline">
						{" "}
						políticas de privacidade
					</a>
					.
				</p>
			</div>
			{isGuestsModalOpen && (
				<InviteGuestsModal
					handleGuestsModal={handleGuestsModal}
					emailsToInvite={emailsToInvite}
					addNewEmailToInvite={addNewEmailToInvite}
					removeEmailFromInvite={removeEmailFromInvite}
				/>
			)}
			{isConfirmTripModalOpen && (
				<ConfirmTripModal
					handleConfirmTripModal={handleConfirmTripModal}
					createTrip={createTrip}
					setOwnerName={setOwnerName}
					setOwnerEmail={setOwnerEmail}
					destination={destination}
					dateRange={dateRange}
				/>
			)}
		</div>
	);
}
