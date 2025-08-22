import Footer from "@/components/footer";
import Header from "@/components/header";

export default function LocaleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="col-span-full row-start-1">
				<Header />
			</div>
			{children}
			<Footer />
		</>
	);
}
