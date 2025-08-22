"use client";

import { Analytics } from "analytics";

export type GenericObject = { [key: string]: any };

export type PagePropsT = {
	title: string;
	url: string;
	path: string;
	hash: string;
	search: string;
	width: number;
	height: number;
	referrer: string;
};

export type AnalyticsPayloadT = {
	type:
		| "initializeStart"
		| "identifyStart"
		| "pageStart"
		| "trackStart"
		| "sessionEnd";
	meta: {
		ts: number;
		rid?: string;
		hasCallback?: boolean;
	};
	event?: string;
	userId?: string;
	traits?: GenericObject;
	options?: GenericObject;
	anonymousId?: string;
	properties?: PagePropsT | GenericObject;
	plugins?: string[];
	userAgent?: string;
	window?: {
		innerHeight: number;
		innerWidth: number;
		outerHeight: number;
		outerWidth: number;
	};
};

function customAnalyticsPlugin(_config: any) {
	const handleData = (payload: AnalyticsPayloadT) => {
		if (typeof window !== "undefined" && window) {
			payload.userAgent = navigator.userAgent;
			payload.window = {
				innerHeight: window.innerHeight,
				innerWidth: window.innerWidth,
				outerHeight: window.outerHeight,
				outerWidth: window.outerWidth,
			};
			if (
				!process.env.NODE_ENV ||
				process.env.NODE_ENV === "development"
			) {
				console.log("analytics", payload);
			}
			const analyticsData: string | null =
				localStorage.getItem("analyticsData");
			if (typeof analyticsData === "string") {
				let data: AnalyticsPayloadT[] = JSON.parse(analyticsData);
				data.push(payload);
				localStorage.setItem("analyticsData", JSON.stringify(data));
			} else {
				localStorage.setItem(
					"analyticsData",
					JSON.stringify([payload]),
				);
			}
		}
	};

	return {
		name: "analytics-plugin-custom-PAGE_TITLE",
		config: Object.assign({}, _config),
		initializeStart: ({ payload }: { payload: AnalyticsPayloadT }) => {
			handleData(payload);
		},
		pageStart: ({ payload }: { payload: AnalyticsPayloadT }) => {
			handleData(payload);
		},
		identifyStart: ({ payload }: { payload: AnalyticsPayloadT }) => {
			handleData(payload);
		},
		trackStart: ({ payload }: { payload: AnalyticsPayloadT }) => {
			handleData(payload);
		},
	};
}
export const analyticsInstance = Analytics({
	app: "APP_NAME",
	plugins: [customAnalyticsPlugin({})],
});
