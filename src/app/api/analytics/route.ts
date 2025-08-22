import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import auth from "@/auth";
import { AnalyticsPayloadT } from "@/components/analytics/analytics";

export async function POST(req: NextRequest) {
	const session = await getServerSession(auth);
	if (session) {
		const {
			data,
			sessionEnd,
		}: { data: AnalyticsPayloadT[]; sessionEnd: AnalyticsPayloadT } =
			await req.json();

		sessionEnd.userId = String(session.user?.userId);
		data.push(sessionEnd);

		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
			// dev
			console.log("POST /analytics", data[data.length - 1]);
			return NextResponse.json({ status: 200 });
		} else {
			const url: string = String(process.env.BACKEND_URL).concat(
				"/api/analytics/userData",
			);
			const args = {
				method: "POST",
				cache: "no-store",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			};
			try {
				// await handleFetch(url, args, false, true, true);
				return NextResponse.json({ status: 200 });
			} catch (err) {
				return NextResponse.json(
					{ error: `Internal Server Error: ${err}` },
					{ status: 500 },
				);
			}
		}
	} else {
		return NextResponse.json({ status: 500 });
	}
}
