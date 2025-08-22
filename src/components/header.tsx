"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { JSX } from "react";

import ThemeToggle from "@/components/themeToggle";

import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
	const { status }: any = useSession();
	const locale_de_regex = new RegExp("/de/|/de$");
	const topPath: string = usePathname()
		.replace(locale_de_regex, "/")
		.split("/")[1];
	const allPaths: any = {
		"": "",
		PAGE_NAME: "",
	};
	allPaths[topPath] = "text-success hover:text-white";
	const t = useTranslations("Header");
	const publicPages: string[] = [""];
	const allMenuPages: string[] = [""];
	const currMenuPages: string[] =
		status === "unauthenticated" ? publicPages : allMenuPages;

	const menuElements: JSX.Element = currMenuPages
		.map((s: any) => {
			return (
				<>
					<li>
						<Link
							className={`text-lg font-semibold ${allPaths[s]}`}
							href={`/${s}`}
						>
							{t(s)}
						</Link>
					</li>
				</>
			);
		})
		.reduce((a, b) => (
			<>
				{b}
				{a}
			</>
		));

	return (
		<div className="navbar">
			<div className="navbar-start">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					className="stroke-base-content float-left mr-[6px] hidden h-7 w-7 duration-1000 hover:rotate-180 sm:flex"
				>
					<path
						// strokeLinecap="round"
						// strokeLinejoin="round"
						d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
					/>
				</svg>
				<Link className="text-base-content left-0 text-3xl" href="/">
					{t("title")}
				</Link>
			</div>
			<div className="navbar-end flex md:hidden">
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu dropdown-content rounded-box menu-sm bg-base-300 z-[1] mt-3 w-52 p-2 shadow"
					>
						{menuElements}
						<li className="">
							<LocaleSwitcher isBurgerMenu={true} />
						</li>
						<li>
							<ThemeToggle />
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-end hidden md:flex">
				<ul className="menu menu-horizontal px-1">
					{menuElements}
					<li>
						<LocaleSwitcher isBurgerMenu={false} />
					</li>
					<li>
						<ThemeToggle />
					</li>
				</ul>
			</div>
		</div>
	);
}
