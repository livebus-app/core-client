import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

import 'maplibre-gl/dist/maplibre-gl.css';
import localFont from 'next/font/local'

const Inter = localFont({
	src: [
		{
			path: '../font/InterVariable.woff2',
			style: 'normal',
		},
	],
})

export const metadata: Metadata = {
	title: "Livebus",
	description: "Livebus is a real-time bus tracking system.",
	authors: [{ name: "Livebus Inc." }],
	keywords: ["livebus", "bus", "tracking", "real-time", "system", "transport", "public", "transportation", "transporte", "público", "rastreamento", "tempo", "real", "sistema"],
	applicationName: "Livebus",
	robots: "index,follow",
	colorScheme: "dark light",
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className={"grid grid-rows-[auto] w-screen h-screen p-8 " + Inter.className}>

					{children}




					{/* <div className="p-8 h-screen flex flex-col">
						<header className="flex items-center w-full justify-between">
							<h1 className="text-2xl font-semibold">
								live<span className="text-yellow-400">bus</span>
							</h1>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Companhia" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Livebus inc.</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
						</header>
						<Separator className="my-8" orientation="horizontal" />
						<main className="h-full">{children}</main>
						<Toaster />
					</div> */}
				</body>
				<Toaster />
			</ThemeProvider>
		</html>
	);
}
