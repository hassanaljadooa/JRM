export function Badge({ content, type, pill }) {
	let badgeStyle = "";

	// decides how the badges corners are rounded
	let round = pill === true ? "rounded-full" : "rounded-md"

	if (type === "success") {
		badgeStyle = "bg-green-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else if (type === "warning") {
		badgeStyle = "bg-yellow-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else if (type === "error") {
		badgeStyle = "bg-red-100 px-2.5 py-0.5 text-sm text-inherit font-bold"
	} else if (type === "info") {
		badgeStyle = "bg-blue-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	} else {
		badgeStyle = "bg-gray-100 px-2.5 py-0.5 text-sm text-inherit font-bold";
	}

	return (
		<>
		  <span className={`whitespace-nowrap ${round} ${badgeStyle}`}>
			{content}
		  </span>
		</>
	);
}
