"use client";

import "@/app/globals.css";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { ChangeEvent, useEffect, useState } from "react";

export default function Login() {
	const t = useTranslations("Auth.Login");
	const { data: session, status }: any = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [formValues, setFormValues] = useState({
		username: "",
		password: "",
	});
	const searchParams = useSearchParams();
	const [info, setInfo] = useState({
		text:
			searchParams.get("signUpInfo") ||
			searchParams.get("successOnSignUp") ||
			"",
		isError: searchParams.get("signUpInfo") ? true : false,
	});

	useEffect(() => {
		if (session) {
			const callBackUrl: string | null = searchParams.get("callbackUrl");
			if (typeof callBackUrl === "string") {
				router.prefetch(callBackUrl);
				router.push(callBackUrl);
			} else {
				router.prefetch("/");
				router.push("/");
			}
		}
	}, [router, searchParams, session]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			setFormValues({ username: "", password: "" });
			const res = await signIn("credentials", {
				redirect: false,
				username: formValues.username,
				password: formValues.password,
			});
			if (!res?.error) {
				const callBackUrl: string | null =
					searchParams.get("callbackUrl");
				if (typeof callBackUrl === "string") {
					router.prefetch(callBackUrl);
					router.push(callBackUrl);
				} else {
					router.prefetch("/");
					router.push("/");
				}
			} else {
				setInfo({
					text: t("invalidLoginData"),
					isError: true,
				});
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
					<p className="mb-4 text-center text-2xl">Login</p>
					{info.text && (
						<p
							className={`mb-2 rounded-lg py-4 text-center ${info.isError ? "bg-warning text-warning-content" : "bg-accent-content text-white"}`}
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
							type="password"
							name="password"
							value={formValues.password}
							onChange={handleChange}
							placeholder="Password"
							className="form-control bg-base-100 text-base-content block w-full rounded-lg px-4 py-5"
						/>
					</div>
					<button
						type="submit"
						className="btn-black btn-lg! w-full! rounded-lg"
						disabled={loading}
					>
						{loading ? "loading..." : t("signIn")}
					</button>
					<Link href="/auth/signup" className="link-btn">
						{t("signUp")}
					</Link>
					<Link href="/auth/resetpassword" className="link-btn">
						{t("resetPW")}
					</Link>
				</form>
			</div>
		);
	} else {
		return <></>;
	}
}
