import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchQuery } from "../component/Homepage/store/action";

const suggestions = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Honeydew',
    'fast',
    'fiim',
    'fist'
];
const AutoComplete = () => {

    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if (query) {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setIsSuggestionsVisible(true);
        } else {
            setFilteredSuggestions([]);
            setIsSuggestionsVisible(false);
        }
    }, [query, suggestions]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setFilteredSuggestions([]);
        setIsSuggestionsVisible(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
            );
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1
            );
        } else if (e.key === 'Enter') {
            setQuery(filteredSuggestions[activeSuggestionIndex]);
            setFilteredSuggestions([]);
            setIsSuggestionsVisible(false);
        }
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) => (
            <span
                key={index}
                style={
                    part.toLowerCase() === highlight.toLowerCase()
                        ? { fontWeight: 'bold', backgroundColor: '#9874FF', color: '#fff' }
                        : {}
                }
            >
                {part}
            </span>
        ));
    };

    const handleSearchClick = () => {
        if (query) dispatch(addSearchQuery(query))
    };

    return (
        <div className="flex items-center gap-2.5 sm:gap-1.5">
            <div className="relative w-full">
                <input
                    className="w-full rounded-lg border-[0.7px] border-grey5 bg-white p-4 font-ms text-xl font-normal leading-6 text-black outline-none placeholder:text-grey5 sm:p-2.5 sm:text-[0.625rem] sm:leading-3"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                />
                {isSuggestionsVisible && filteredSuggestions.length ? (
                    <div className="absolute left-0 top-[57px] bg-white shadow rounded p-4 max-h-60 overflow-auto z-10 w-full">
                        {filteredSuggestions.map((suggestion, index) => (
                            <p
                                key={suggestion}
                                className={`${index === activeSuggestionIndex ? 'bg-purple-100' : ''} p-3 rounded`}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {getHighlightedText(suggestion, query)}
                            </p>
                        ))}
                    </div>
                ) : null}
            </div>
            <button onClick={() => handleSearchClick()} className="rounded-[1.25rem] bg-purple-500 px-6 py-2 sm:px-4 sm:py-1">
                <span className="font-ms text-xl font-normal leading-6 text-white sm:text-sm">Search</span>
            </button>
        </div>

    )
}

export default AutoComplete;