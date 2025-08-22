"use client";
import { AnalyticsProvider } from "use-analytics";

import { analyticsInstance } from "@/components/analytics/analytics";

export default function AnalyticsProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AnalyticsProvider instance={analyticsInstance}>
			{children}
		</AnalyticsProvider>
	);
}
