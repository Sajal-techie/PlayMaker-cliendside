import React, { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';
import FriendSidebar from '../FriendSidebar';
import Navbar from '../../../layouts/navbar/Navbar';
import SideBarLayout from '../SideBarLayout';
import userApi from '../../../../api/axiosconfig';
import BottomNavbar from '../../../layouts/navbar/BottomNavbar';

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchFriendsAndSuggestions();
    }, []);

    const fetchFriendsAndSuggestions = async () => {
        try {
            const response = await userApi.get('friends');
            const suggestionResponse = await userApi.get('friend_suggestion');
            console.log(suggestionResponse, 'suggestion response');
            console.log(response, 'friends response');
            setFriends(response.data);
            setSuggestions(suggestionResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(friends);
    console.log(suggestions);

    return (
        <>
            <Navbar />
            <SideBarLayout>
                <div className="flex-grow p-8 bg-gray-100 font-kanit">
                    <h1 className="text-2xl font-bold mb-4">Friends</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {friends.length > 0 ? (
                        <div>
                            {friends.map((friend, index) => (
                                <FriendListItem
                                    key={index}
                                    name={friend.username}
                                    bio={friend.bio}
                                    id={friend.id}
                                    profileImage={friend.profile_photo}
                                    type={'player'}
                                    fetchData={fetchFriendsAndSuggestions}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='flex items-center p-4 bg-white shadow-md rounded-lg mb-4'>
                            No Friends
                        </div>
                    )}
                    <h2 className="text-xl font-bold mt-8 mb-4">Friend Suggestions</h2>
                    {suggestions.length > 0 ? (
                        <div>
                            {suggestions.map((suggestion, index) => (
                                <FriendListItem
                                    key={index}
                                    name={suggestion.username}
                                    bio={suggestion.bio}
                                    id={suggestion.id}
                                    profileImage={suggestion.profile_photo}
                                    type={'player'}
                                    fetchData={fetchFriendsAndSuggestions}
                                    suggestion={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='flex items-center p-4 bg-white shadow-md rounded-lg mb-4'>
                            No Suggestions
                        </div>
                    )}
                </div>
            </SideBarLayout>
            <BottomNavbar />
        </>
    );
};

export default FriendList;
