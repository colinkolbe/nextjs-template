import { useLocale } from "next-intl";

import { routing } from "@/i18n/routing";

import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher({
	isBurgerMenu,
}: {
	isBurgerMenu: boolean;
}) {
	const locale = useLocale();
	return (
		<LocaleSwitcherSelect defaultValue={locale} isBurgerMenu={isBurgerMenu}>
			{routing.locales.map((cur) => (
				<option key={cur} value={cur}>
					{cur}
				</option>
			))}
		</LocaleSwitcherSelect>
	);
}
