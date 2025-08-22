import { useTranslations } from "next-intl";

export default function Footer() {
	const year: number = new Date().getFullYear();
	const t = useTranslations("Footer");

	return (
		<div className="col-span-full row-start-3">
			<footer className="footer footer-center text-base-content p-3">
				<aside>
					<div>
						<p className="float-left duration-1000 hover:rotate-[1080deg]">
							©
						</p>
						&nbsp;{year} - {t("info")}
						{/* - All rights reserved */}
					</div>
				</aside>
			</footer>
		</div>
	);
}
