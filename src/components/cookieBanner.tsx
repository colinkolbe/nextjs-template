"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function CookieBanner() {
	const t = useTranslations("CookieBanner");
	const [cookiesAccepted, setCookiesStatus] = useState<boolean | null>(null);

	const acceptCookies = () => {
		localStorage.setItem("cookies-accepted", "true");
		setCookiesStatus(true);
	};

	useEffect(() => {
		const localStorageCookies = localStorage.getItem("cookies-accepted");
		setCookiesStatus(!!localStorageCookies);
	}, []);

	if (cookiesAccepted === null || cookiesAccepted) {
		return null;
	}

	return (
		<section className="bg-neutral border-neutral-content fixed right-12 bottom-16 z-20 mx-auto max-w-md rounded-2xl border p-4">
			<h2 className="text-neutral-content font-semibold">{t("title")}</h2>
			<p className="text-neutral-content mt-4 text-sm">
				{t("message")}{" "}
				<Link
					href="/about/cookie-policy"
					className="text-info hover:underline"
				>
					{t("cookie-policy")}
				</Link>
				.{" "}
			</p>
			<div className="mt-4 flex shrink-0 items-center justify-between gap-x-4">
				<button className="text-neutral-content hover:text-info text-xs underline transition-colors duration-300 focus:outline-none">
					{t("manage-preferences")}
				</button>
				<button
					className="btn-black btn-sm! float-right"
					onClick={acceptCookies}
				>
					{t("acknowledge")}
				</button>
			</div>
		</section>
	);
}
