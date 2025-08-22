"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";

import ResendEmail from "./resendEmail";

export default function SignUpPage() {
	const t = useTranslations("Auth.SignUp");
	const { data: session, status }: any = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [info, setInfo] = useState({ text: "", isError: false });
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		password: "",
	});

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
			setFormValues({ username: "", email: "", password: "" });
			const res = null;
			if (res) {
				setInfo({
					text: `${t("title")} ${res}`,
					isError: true,
				});
			} else {
				setInfo({
					text: t("title"),
					isError: false,
				});
			}
		} catch (error: any) {
			setInfo({ text: error, isError: true });
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
					<p className="mb-4 text-center text-2xl">Sign up</p>
					{info.text && (
						<p
							className={`mb-2 rounded ${info.isError ? "bg-warning text-warning-content" : "bg-accent-content text-white"} py-4 text-center`}
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
							maxLength={16}
							placeholder="Username"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<div className="mb-6">
						<input
							required
							type="email"
							name="email"
							value={formValues.email}
							onChange={handleChange}
							maxLength={50}
							placeholder="email@email.com"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<div className="mb-6">
						<input
							required
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
							maxLength={16}
							placeholder="Password"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<button
						type="submit"
						className="btn-black btn-lg! w-full! rounded-lg"
						disabled={loading}
					>
						{loading ? "loading..." : "Sign Up"}
					</button>
				</form>
				<ResendEmail />
			</div>
		);
	} else {
		return <></>;
	}
}
