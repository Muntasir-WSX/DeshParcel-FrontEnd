const GEMINI_MODEL = "gemini-flash-latest";

interface GeminiResponse {
	candidates?: Array<{
		content?: {
			parts?: Array<{ text?: string }>;
		};
	}>;
	error?: {
		message?: string;
	};
}

export async function POST(request: Request) {
	const apiKey =
		process.env.GEMINI_API_KEY ?? process.env.NEXT_PUBLIC_GEMINI_API_KEY;

	if (!apiKey) {
		return Response.json(
			{ error: "The Gemini API key is not configured on the server." },
			{ status: 500 },
		);
	}

	let body: { message?: unknown };
	try {
		body = (await request.json()) as { message?: unknown };
	} catch {
		return Response.json({ error: "Invalid request body." }, { status: 400 });
	}

	if (typeof body.message !== "string" || !body.message.trim()) {
		return Response.json({ error: "A message is required." }, { status: 400 });
	}

	const prompt = `You are Anthony, an intelligent, friendly AI customer support assistant for "DeshParcel", a nationwide courier and parcel delivery service in Bangladesh.
- Company Info: We deliver parcels across all 64 districts in Bangladesh with 100% safety, real-time tracking, and cash-on-delivery (COD) support.
- Inside Dhaka delivery: Standard delivery charge is 60 Taka, Express delivery is 80 Taka.
- Outside Dhaka (Nationwide) delivery: Starts from 150 Taka.
- Answer the user's question accurately, concisely, and professionally in English (or Bengali if the user speaks Bengali).

User Query: ${body.message.trim()}`;

	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{ role: "user", parts: [{ text: prompt }] }],
				}),
				cache: "no-store",
			},
		);

		const data = (await response.json()) as GeminiResponse;
		const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

		if (!response.ok || !reply) {
			console.error("Gemini support request failed:", {
				status: response.status,
				message: data.error?.message,
			});
			return Response.json(
				{
					error:
						data.error?.message ??
						"Gemini returned an empty response. Please try again.",
				},
				{ status: response.ok ? 502 : response.status },
			);
		}

		return Response.json({ reply });
	} catch (error) {
		console.error("Gemini support request could not be completed:", error);
		return Response.json(
			{ error: "Unable to connect to the AI service. Please try again." },
			{ status: 502 },
		);
	}
}
