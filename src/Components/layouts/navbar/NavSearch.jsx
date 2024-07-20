import React, { useEffect, useState } from 'react'
import userApi from '../../../api/axiosconfig';

const NavSearch = ({academy}) => {
  const customFocusRingColor = academy ? 'focus:ring-indigo-500' : 'focus:ring-gblue-500'

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(['hai']);

  useEffect(() => {
      if (query.length > 1) {
          const fetchSuggestions = async () => {
              try {
                  const response = await userApi.get(`/api/search/?q=${query}`);
                  setSuggestions(response.data);
              } catch (error) {
                  console.error('Error fetching suggestions:', error);
              }
          };
          fetchSuggestions();
      } else {
          setSuggestions([]);
      }
  }, [query]);

  const handleChange = (e) => {
      setQuery(e.target.value);
  };

  return (
    <div className="ml-6 bg-gray-100 rounded-md flex items-center border">
    <div className="relative w-32 md:w-48 lg:w-64">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        type="search"
        name="search"
        id="search"
        className={`block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 ${customFocusRingColor}`}
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
    </div>
    {suggestions.length > 0 && (
      <div className="absolute left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                      {suggestion}
                  </li>
              ))}
          </ul>
      </div>
    )}
  </div>
  )
}

export default NavSearch
