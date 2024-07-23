import React, { useEffect, useState } from 'react';
import Navbar from '../../../layouts/navbar/Navbar';
import SideBarLayout from '../SideBarLayout';
import userApi from '../../../../api/axiosconfig';
import { baseUrl } from '../../../../api/api';
import { useNavigate } from 'react-router-dom';

const SentRequest = () => {
    const [sentRequests, setSentRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await userApi.get('sent_request_list');
            console.log(response);
            setSentRequests(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelRequest = async (id) => {
        try {
            const response = await userApi.post(`cancel_request/${id}`);
            console.log(response);
            // Refresh the friend requests list
            fetchFriendRequests();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(sentRequests);

    return (
        <>
            <Navbar />
            <SideBarLayout>
                <div className="container mx-auto p-4 font-kanit">
                    <div className="bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Sent requests</h2>
                            {/* <a href="#" className="text-blue-500 hover:underline">See all</a> */}
                        </div>
                        {
                            sentRequests.length > 0 ?
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                                    {sentRequests.map((request) => (
                                        <div key={request.id} className="bg-gray-100 rounded-lg overflow-hidden flex flex-col items-center">
                                            <div className="w-32 h-32 sm:w-48 sm:h-48">
                                                <img
                                                    src={request?.to_user?.profile_photo ? baseUrl + request?.to_user?.profile_photo : "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"}
                                                    alt={request.to_user.name}
                                                    className="w-full h-full object-cover rounded- cursor-pointer"
                                                    onClick={() => navigate(`/profile/${request.to_user?.id}`)}
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="font-semibold">{request.to_user.username}</h3>
                                                <button
                                                    onClick={() => handleCancelRequest(request.to_user.id)}
                                                    className="w-full bg-gray-200 text-black py-2 px-1 rounded mt-2 hover:bg-gray-300 border border-gblue-100"
                                                >
                                                    Cancel Request
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className='p-4'>No pending request</div>
                        }
                    </div>
                </div>
            </SideBarLayout>
        </>
    );
};

export default SentRequest;
