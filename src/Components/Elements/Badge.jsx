export function Badge({ content, type }) {
	let badgeStyle = "";

	if (type === "success") {
		badgeStyle = "rounded-md bg-green-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else if (type === "warning") {
		badgeStyle = "rounded-md bg-yellow-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else if (type === "error") {
		badgeStyle = "rounded-md bg-red-100 px-2.5 py-0.5 text-sm text-inherit font-bold"
	} else if (type === "info") {
		badgeStyle = "rounded-md bg-blue-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else {
		badgeStyle = "rounded-md bg-gray-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	}

	return (
		<>
		  <span className={`whitespace-nowrap ${badgeStyle}`}>
			{content}
		  </span>
		</>
	);
}
