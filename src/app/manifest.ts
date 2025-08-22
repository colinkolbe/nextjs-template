import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({
		locale: routing.defaultLocale,
		namespace: "Manifest",
	});

	return {
		name: t("name"),
		short_name: t("short_name"),
		start_url: "/",
		icons: [],
		theme_color: "#1b2337",
		background_color: "#1b2337",
		display: "standalone",
	};
}
