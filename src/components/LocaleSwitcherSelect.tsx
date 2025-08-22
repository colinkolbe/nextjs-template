"use client";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcherSelect({
	children,
	defaultValue,
	isBurgerMenu,
}: {
	children: ReactNode;
	defaultValue: string;
	isBurgerMenu: boolean;
}) {
	const t = useTranslations("LocaleSwitcher");
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement> | string) {
		const nextLocale =
			typeof event === "string" || event instanceof String
				? (event as Locale)
				: (event.target.value as Locale);
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				{ pathname, params },
				{ locale: nextLocale },
			);
			router.refresh();
		});
	}

	if (isBurgerMenu) {
		return (
			<label className="swap text-lg font-semibold hover:text-white">
				<input type="checkbox" />
				{routing.locales.map((cur) => {
					const s =
						cur === defaultValue
							? "swap-off text-pink-600"
							: "swap-on";
					return (
						<div
							className={s}
							key={cur}
							onClick={() => onSelectChange(cur)}
						>
							{t(cur)}
						</div>
					);
				})}
			</label>
		);
		/// The <select/> works as well but the dropdown was somehow weirdly positioned, for two languages the <swap/> works fine though.
		// <select
		// 	className="elect-lg select-ghost flex-auto border-0 pr-0.5"
		// 	defaultValue={defaultValue}
		// 	disabled={isPending}
		// 	onChange={onSelectChange}
		// >
		// 	{children}
		// </select>
	} else {
		return (
			<select
				className="select-lg select-ghost hover:bg-base-content/10 flex-auto border-0 pr-0.5 font-semibold hover:text-white"
				defaultValue={defaultValue}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
		);
	}
}
