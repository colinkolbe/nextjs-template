"use client";

import { useEffect, useRef } from "react";

import { AnalyticsPayloadT } from "@/components/analytics/analytics";

export default function SendAnalytics() {
	const effectRan = useRef(false);

	useEffect(() => {
		if (!effectRan.current) {
			if (window) {
				window.addEventListener("beforeunload", async () => {
					const analyticsData: string | null =
						localStorage.getItem("analyticsData");
					if (analyticsData) {
						let data: AnalyticsPayloadT[] =
							JSON.parse(analyticsData);
						const bodyData: string = JSON.stringify({
							data: data,
							sessionEnd: {
								type: "sessionEnd",
								meta: {
									ts: Date.now(),
								},
							},
						});
						const url: string = "/api/analytics";
						if (navigator.sendBeacon) {
							navigator.sendBeacon(url, bodyData);
						} else {
							fetch(url, {
								body: bodyData,
								method: "POST",
								keepalive: true,
							});
						}
						localStorage.removeItem("analyticsData");
					}
				});
			}

			return () => {
				effectRan.current = true;
			};
		}
	}, []);

	return <></>;
}
