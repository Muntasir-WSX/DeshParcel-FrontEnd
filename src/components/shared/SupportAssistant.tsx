"use client";

import { Bot, BotIcon, Send, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
	sender: "bot" | "user";
	text: string;
}

export default function SupportAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			sender: "bot",
			text: "Hello! I am Anthony, DeshParcel AI Assistant. I can help you with tracking, coverage, or delivery charges.",
		},
	]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || loading) return;

		const userText = input;
		setMessages((prev) => [...prev, { sender: "user", text: userText }]);
		setInput("");
		setLoading(true);

		try {
			const response = await fetch("/api/support", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userText }),
			});
			const data = (await response.json()) as {
				reply?: string;
				error?: string;
			};

			if (!response.ok || !data.reply) {
				throw new Error(data.error ?? "The AI service returned no reply.");
			}

			const reply = data.reply;
			setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
		} catch (error) {
			console.error("Gemini API Error:", error);
			setMessages((prev) => [
				...prev,
				{
					sender: "bot",
					text: "Sorry, I am having trouble connecting to the server. Please contact our hotline.",
				},
			]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{!isOpen && (
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-2xl transition-all cursor-pointer transform hover:scale-105"
				>
					<BotIcon className="h-5 w-5" />
					<span className="font-bold text-sm">Ask Anthony</span>
				</button>
			)}

			{isOpen && (
				<div className="w-80 sm:w-96 bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col h-[480px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
					<div className="bg-red-600 text-white p-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="p-1.5 bg-white/20 rounded-full">
								<BotIcon className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-bold text-sm flex items-center gap-1.5">
									Anthony AI <Sparkles className="h-3 w-3 text-yellow-300" />
								</h3>
								<span className="text-[10px] text-red-100 flex items-center gap-1">
									<span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />{" "}
									Gemini Online
								</span>
							</div>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="text-white/80 hover:text-white cursor-pointer"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-[#070b19]">
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`flex gap-2 max-w-[85%] ${
									msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
								}`}
							>
								<div
									className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
										msg.sender === "user"
											? "bg-red-600 text-white"
											: "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white"
									}`}
								>
									{msg.sender === "user" ? (
										<User className="h-3.5 w-3.5" />
									) : (
										<Bot className="h-3.5 w-3.5" />
									)}
								</div>
								<div
									className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
										msg.sender === "user"
											? "bg-red-600 text-white rounded-tr-none"
											: "bg-white dark:bg-[#111c44] text-slate-800 dark:text-gray-200 shadow-sm border border-slate-100 dark:border-white/5 rounded-tl-none"
									}`}
								>
									{msg.text}
								</div>
							</div>
						))}
						{loading && (
							<div className="flex gap-2 items-center text-xs text-slate-500 italic p-2">
								<Bot className="h-4 w-4 animate-spin text-red-600" /> Anthony is
								thinking...
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					<form
						onSubmit={handleSend}
						className="p-3 bg-white dark:bg-[#0b132b] border-t border-slate-200 dark:border-white/10 flex gap-2"
					>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Write your query..."
							disabled={loading}
							className="flex-1 bg-slate-100 dark:bg-[#070b19] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-600 disabled:opacity-50"
						/>
						<button
							type="submit"
							disabled={loading}
							className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl cursor-pointer transition-all disabled:opacity-50"
						>
							<Send className="h-4 w-4" />
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
