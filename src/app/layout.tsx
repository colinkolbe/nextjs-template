import "@/app/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { Suspense } from "react";

import AnalyticsProviderWrapper from "@/components/analytics/AnalyticsProviderWrapper";
import SendAnalytics from "@/components/analytics/sendAnalytics";
import CookieBanner from "@/components/cookieBanner";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import ThemeClient from "@/components/ThemeClient";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PAGE_TITLE",
	description: "PAGE_DESCRIPTION",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	let { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		locale = "en";
	}

	return (
		<html lang={locale} suppressHydrationWarning>
			<head></head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-base-200 antialiased`}
			>
				<NextIntlClientProvider>
					<SessionProviderWrapper>
						<AnalyticsProviderWrapper>
							<Suspense>
								<ThemeClient>
									<SendAnalytics />
									<div className="bg-base-200 text-base-content mx-auto grid h-screen grid-rows-[min-content_1fr]">
										{children}
									</div>
									<CookieBanner />
								</ThemeClient>
							</Suspense>
						</AnalyticsProviderWrapper>
					</SessionProviderWrapper>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
