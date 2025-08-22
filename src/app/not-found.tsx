import "@/app/globals.css";

import Link from "next/link";
import { useTranslations } from "next-intl";

import LocaleLayout from "./[locale]/layout";

export default function NotFound() {
	const t = useTranslations("NotFound");
	return (
		<LocaleLayout>
			<div className="mt-16">
				<p className="text-base-content mb-6 text-center text-4xl">
					{t("404_message")}
				</p>
				<Link href="/" className="link-btn w-28">
					Home
				</Link>
			</div>
			{/* <Footer /> */}
		</LocaleLayout>
	);
}
