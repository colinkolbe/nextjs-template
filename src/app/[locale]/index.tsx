"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

export default function Index({ session }: { session: Session | null }) {
	const t = useTranslations("Index");
	const locale = useLocale();

	return (
		<div className="m-auto text-center">
			<div>
				<h1>{t("title")}</h1>
				{session?.user?.name ? (
					<>
						<p>{t("loggedIn", { username: session.user.name })}</p>
						<p>
							<Link
								href={locale + "/abc"}
								className="text-info hover:text-info-content"
							>
								{t("404")}
							</Link>
						</p>
						<button
							onClick={async () => {
								console.log("h2");
								await signOut({ callbackUrl: "/" });
							}}
							className="btn-black rounded-lg"
							type="button"
						>
							{t("logout")}
						</button>
					</>
				) : (
					<>
						<p>{t("loggedOut")}</p>
						<Link
							href={locale + "/auth/login"}
							className="link-btn"
						>
							{t("login")}{" "}
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
