import { Mail, User, X } from "lucide-react";
import { Button } from "../../../components/button";

interface ConfirmParticipationModalProps {
	handleConfirmParticipationModal: () => void;
}

export function ConfirmParticipationModal({
	handleConfirmParticipationModal,
}: ConfirmParticipationModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Confirmar participação</h2>
						<button onClick={handleConfirmParticipationModal}>
							<X className="size-5 text-zinc-400" />
						</button>
					</div>
					<p className="text-sm text-zinc-400">
						Você foi convidado(a) para participar de uma viagem para{" "}
						<strong className="font-semibold text-zinc-100">
							Florianópolis, Brasil
						</strong>{" "}
						nas datas de{" "}
						<strong className="font-semibold text-zinc-100">
							16 a 27 de Agosto de 2024
						</strong>{" "}
						.
					</p>
				</div>

				<form className="space-y-3">
					<div className="space-y-2">
						<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
							<User className="text-zinc-400 size-5" />
							<input
								type="text"
								placeholder="Seu nome completo"
								className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							/>
						</div>
						<div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
							<Mail className="text-zinc-400 size-5" />
							<input
								type="email"
								name="email"
								placeholder="Seu e-mail"
								className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
							/>
						</div>
					</div>
					<Button variant="primary" size="full">
						Confirmar minha presença
					</Button>
				</form>
			</div>
		</div>
	);
}
