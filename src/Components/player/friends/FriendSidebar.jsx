import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FriendSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path) => {
    return `relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 pr-6 ${
      currentPath === path ? 'bg-gray-100 border-gblue-500 text-gblue-500' : 'border-transparent'
    }`;
  };

  return (
    <div className="fixed flex flex-col top-16 left-0 lg:w-60 md:w-52 sm:w-48 w-16 bg-white h-full border shadow-2xl font-kanit ">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link to="/friends" className={linkClass('/friends')}>
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="ml-2 tracking-wide truncate font-semibold">Friends</span>
              {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                1.2k
              </span> */}
            </Link>
          </li>
          <li>
            <Link to="/friend_request_list" className={linkClass('/friend_request_list')}>
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 11h6m-3 -3v6" />
                </svg>
              </span>
              <span className="ml-2 tracking-wide truncate">Friend Requests</span>
              {/* <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-gblue-500 bg-gblue-50 rounded-full">
                New
              </span> */}
            </Link>
          </li>
          <li>
            <Link to="/sent_request_list" className={linkClass('/sent_request_list')}>
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="h-6 w-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <line x1="19" y1="7" x2="19" y2="10" />
                  <line x1="19" y1="14" x2="19" y2="14.01" />
                </svg>
              </span>
              <span className="ml-2 tracking-wide truncate">Sent Requests</span>
            </Link>
          </li>
          <li>
            <Link to="/following" className={linkClass('/following')}>
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <span className="ml-2 tracking-wide truncate">Following</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FriendSidebar;
