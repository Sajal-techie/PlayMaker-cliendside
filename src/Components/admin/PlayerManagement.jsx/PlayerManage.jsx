import React, { useEffect, useState } from 'react'
import userApi from '../../../api/axiosconfig'
import ReactModal from 'react-modal';
import { baseUrl } from '../../../api/api';
import { toggleSidebar } from '../../../redux/slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from '../contents/AdminNavbar';
import AdminSidebar from '../contents/AdminSidebar';
import HandleActiveModal from './HandleActiveModal';

const PlayerManage = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage] = useState(10);
    const [current,setCurrent] = useState()
    const [isOpen,setIsOpen] = useState(false)

    const isSidebarOpen = useSelector(state=>state.admin.isSidebarOpen)
    const dispatch = useDispatch()

    // to close the modal 
    const closeModal = ()=>{
        setIsOpen(false)
    }

    //  to open modal and pass current object
    const changeStatus = (obj)=>{
        setCurrent(obj)
        setIsOpen(true)
    }

    useEffect(() => {
        // to fetch all the players from server
        fetchPlayers();
        dispatch(toggleSidebar(false)) //close side bar while opeing the page
    }, []);

    useEffect(() => {
        // to filter players according to the search input
        setFilteredPlayers(
            players.filter(player =>
                player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.profile.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                player.profile.district.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, players]);
    
    // to fetch players from server
    const fetchPlayers = async () => {
        try {
            const response = await userApi.get('list_players');
            if (response.data) {
                setPlayers(response.data.player);
                setFilteredPlayers(response.data.player);
            } else if (response.status === 204) {
                setPlayers([]);
                setFilteredPlayers([]);
            }
        } catch (error) {
            console.log(error);
        }
    }


    // to handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    //  pagination
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
        <AdminNavbar />
        <AdminSidebar />
        <br /><br /><br />
            <section className={`container mx-auto p-6 font-kanit h-full w-full bg-gray-100 relative overflow-y-auto transition-margin duration-75 ${
                    isSidebarOpen ? 'ml-64' : ''}`}>
                <div className="mb-4 flex justify-between items-center bg-gray-200 px-4 py-1">
                    <h1 className="text-2xl font-bold">Player Management</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-2 rounded px-4 py-2"
                    />
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 capitalize border-b border-gray-600">
                                    <th className="px-4 py-3">id</th>
                                    <th className="px-4 py-3">name</th>
                                    <th className="px-4 py-3">email</th>
                                    <th className="px-4 py-3">DOB</th>
                                    <th className="px-4 py-3">state <br />district</th>
                                    <th className="px-4 py-3">status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white capitalize">
                                {currentPlayers.length > 0 ? (
                                    currentPlayers.map((obj, index) => (
                                        <tr className="text-gray-700" key={index}>
                                            <td className="px-4 py-3 text-ms font-semibold border">{obj.id}</td>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative w-10 h-10 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full" src={obj?.profile?.profile_photo ? baseUrl+obj.profile.profile_photo 
                                                                    :'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'} alt="profile" loading="lazy" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-black">{obj.username}</p>
                                                        <p className="text-xs text-gray-600">{obj.sport.sport_name} Player</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm border normal-case">{obj.email}</td>
                                            <td className="px-4 py-3 text-sm border">{obj.dob}</td>
                                            <td className="px-4 py-3 text-sm border">{obj.profile.state} <br /> {obj.profile.district}</td>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div className='flex'>
                                                        {!obj.is_active ? 
                                                            <p className="font-semibold text-red-500 w-1/3">Blocked</p>
                                                            :
                                                            <p className="font-semibold text-green-500">Active</p>
                                                        }
                                                       <span onClick={()=>changeStatus(obj)} className='ml-5 bg-amber-500 p-1 text-white cursor-pointer hover:bg-amber-600 border hover:border-black ' >
                                                            update
                                                        </span>  
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <ul className="inline-flex items-center -space-x-px">
                        {[...Array(Math.ceil(filteredPlayers.length / playersPerPage)).keys()].map(number => (
                            <li key={number} className={`px-3 py-2 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* modal for changing status (block / unblock) */}
            <HandleActiveModal isOpen={isOpen} closeModal={closeModal} current={current} fetchPlayers={fetchPlayers}  />
        </>
    );
}

export default PlayerManage;
