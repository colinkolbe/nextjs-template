import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";

export default function ResendEmail() {
	const t = useTranslations("Auth.ResendEmail");
	const [loading, setLoading] = useState<boolean>(false);
	const [formValues, setFormValues] = useState({
		email: "",
	});
	const [info, setInfo] = useState({ text: "", isError: false });

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setFormValues({ email: "" });
			const res = null;
			if (res) {
				setInfo({
					text: `${res} Could not resend email.`,
					isError: true,
				});
			} else {
				setInfo({
					text: t("title"),
					isError: false,
				});
			}
		} catch (error: any) {
			setInfo({ text: error.message, isError: true });
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	return (
		<>
			<p className="mt-16 text-center text-lg">{t("title")}</p>
			<form className="m-auto my-2 mt-2 w-2/3" onSubmit={onSubmit}>
				{info.text && (
					<p
						className={`mb-2 rounded py-4 text-center ${info.isError ? "bg-warning text-warning-content" : "bg-accent-content text-white"}`}
					>
						{info.text}
					</p>
				)}
				<div className="mb-2">
					<input
						required
						type="email"
						name="email"
						value={formValues.email}
						onChange={handleChange}
						maxLength={50}
						placeholder="email@email.com"
						className="form-control bg-base-100 text-base-content block w-full rounded-lg px-1 py-1"
					/>
				</div>
				<button
					type="submit"
					className="btn-black btn-lg! w-full! rounded-lg"
					disabled={loading}
				>
					{loading ? "loading..." : "Resend Email"}
				</button>
			</form>
		</>
	);
}
