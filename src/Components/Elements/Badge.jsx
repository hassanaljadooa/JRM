export function Badge({ content, type }) {
	let badgeStyle = "";

	if (type === "success") {
		badgeStyle = "rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-inherit font-semibold";
	} else if (type === "warning") {
		badgeStyle = "rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm text-inherit font-semibold";
	} else if (type === "error") {
		badgeStyle = "rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-inherit font-semibold"
	} else if (type === "info") {
		badgeStyle = "rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-inherit font-semibold";
	} else {
		badgeStyle = "rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-inherit font-semibold";
	}

	return (
		<>
		  <span className={`whitespace-nowrap ${badgeStyle}`}>
			{content}
		  </span>
		</>
	);
}
