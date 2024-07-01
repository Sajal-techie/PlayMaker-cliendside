import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import ReactModal from 'react-modal';
import { baseUrl } from '../../api/api';

const PlayerManage = () => {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [playersPerPage] = useState(10);
    const [current,setCurrent] = useState()
    const [isOpen,setIsOpen] = useState(false)

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
            if (response.data && response.data.status === 200) {
                setPlayers(response.data.player);
                setFilteredPlayers(response.data.player);
            } else if (response.data && response.data.status === 204) {
                setPlayers([]);
                setFilteredPlayers([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // change status of a player
    const handleActive = async (data, id) => {
        try {
            await userApi.post(`toggleIsactive/${id}`, { value: data });
        } catch (error) {
            console.log(error);
        }
        fetchPlayers();
        closeModal()
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
            <section className="container mx-auto p-6 font-kanit">
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
                                                            <p className="font-semibold text-red-500 cursor-pointer w-1/3" onClick={() => handleActive('block', obj.id)}>Blocked</p>
                                                            :
                                                            <p className="font-semibold text-green-500 cursor-pointer" onClick={() => handleActive('active', obj.id)}>Active</p>
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
            <ReactModal isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
              content: {
                position: 'relative',
                margin: 'auto',
                maxWidth: '500px',
                width: '90%',
                inset: 'auto',
                //  borderRadius: '8px',
                overflow: 'auto',
                padding: '20px',
                border: 'none',
                // top: '50%',
                // transform: 'translateY(-50%)',
                backgroundColor: '#fff',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow:'auto'
              },
            }}
            >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeModal}
            >
              ✕
            </button>
                <div className='text-center font-extrabold text-2xl'>
                    Change Status
                </div>
                <div className='text-center mt-4 '>Player Name : <span className='font-semibold'>{current?.username}</span> </div>
                <div className='text-center mb-1'>current status : <b> {current?.is_active ?<>Active</>:<>Blocked</>}</b></div>
                <div className='text-center w-full'>
                    {
                        current?.is_active ?
                        <button className='bg-red-500 py-2 w-1/3 text-white hover:bg-red-800'>Block</button>
                        :
                        <button className='bg-green-500 py-2 w-1/3 hover:bg-green-700 text-white'>Activate</button>
                    }
                </div>
                
            </ReactModal>
        </>
    );
}

export default PlayerManage;
