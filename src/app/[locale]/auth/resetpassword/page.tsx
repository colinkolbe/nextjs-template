"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";

export default function ResetPasswordPage() {
	const t = useTranslations("Auth.ResetPassword");
	const { data: session, status }: any = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
	});
	const [info, setInfo] = useState({ text: "", isError: false });

	useEffect(() => {
		if (session) {
			router.prefetch("/");
			router.push("/");
		}
	}, [router, session]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setFormValues({ username: "", email: "" });
			const res = null;
			if (res) {
				setInfo({
					text: `Could not reset your password. ${res}`,
					isError: true,
				});
			} else {
				router.prefetch("/auth/login");
				router.push("/auth/login");
			}
		} catch (error: any) {
			setInfo({
				text: error.message,
				isError: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};
	if (status === "unauthenticated") {
		return (
			<div className="mx-auto h-2/3 w-full px-4 pt-20 sm:w-1/3">
				<form onSubmit={onSubmit}>
					<p className="mb-4 text-center text-2xl">{t("title")}</p>
					{info.text && (
						<p
							className={`mb-2 rounded py-4 text-center ${info.isError ? "bg-warning text-warning-content" : "bg-accent-content text-white"}`}
						>
							{info.text}
						</p>
					)}
					<div className="mb-6">
						<input
							required
							type="text"
							name="username"
							value={formValues.username}
							onChange={handleChange}
							placeholder="Username"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<div className="mb-6">
						<input
							required
							type="text"
							name="email"
							value={formValues.email}
							onChange={handleChange}
							placeholder="Email"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<button
						type="submit"
						className="btn-black btn-lg! w-full! rounded-lg"
						disabled={loading}
					>
						{loading ? "loading..." : "Reset Password"}
					</button>
				</form>
			</div>
		);
	} else {
		return <></>;
	}
}
