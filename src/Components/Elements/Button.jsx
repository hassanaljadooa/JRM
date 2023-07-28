export function Button({ buttonText }) {
    return (
        <button className="w-full inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">{buttonText}</button>
    )
}