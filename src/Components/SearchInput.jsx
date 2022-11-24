const SearchInput = ({ query, setQuery }) => {
	return (
		<input
			type='text'
			onChange={(s) => setQuery(s.target.value)}
			className='rounded-lg border-transparent appearance-none border border-gray-300 dark:border-gray-800 w-full py-4 px-4 dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-sm focus:outline-none duration-300 mt-12'
			placeholder='Search for a title...'
			value={query}
		/>
	)
}

export default SearchInput
