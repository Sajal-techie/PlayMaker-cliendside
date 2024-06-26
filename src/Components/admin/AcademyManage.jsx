import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { baseUrl } from '../../api/api'
import ReactModal from 'react-modal';

const AcademyManage = () => {
    const [academy, setAcademy] = useState([]);
    const [filteredAcademy, setFilteredAcademy] = useState([]);
    const [license, setLicense] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [academiesPerPage] = useState(12);
    const [isOpen,setIsOpen] = useState(false)
    const [current,setCurrent] = useState()

    //  to close the modal
    const closeModal = ()=>{
        setCurrent()
        setIsOpen(false)
    }

    useEffect(() => {
        fetchAcademies();
    }, []);

    useEffect(() => {
        //  to filter academies based on search input
        setFilteredAcademy(
            academy.filter(aca =>
                aca.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                aca.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                aca.profile.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                aca.profile.district.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, academy]);

    //  to fetch academies from server
    const fetchAcademies = async () => {
        try {
            const response = await userApi.get('list_academy');
            if (response.data && response.data.status === 200) {
                setAcademy(response.data.academy);
                setFilteredAcademy(response.data.academy);
            } else if (response.data && response.data.status === 204) {
                setAcademy([]);
                setFilteredAcademy([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //  to view the licence image 
    const viewLicense = (image, name) => {
        document.getElementById('my_modal_3').showModal();
        setLicense([`${baseUrl}${image}`, name]);
    }

    // to open modal and add curent object
    const changeStatusModalOpen = (obj)=>{
        setCurrent(obj)
        setIsOpen(true)
    }

    //  to handle certification status
    const handleCertication = async (data, id) => {
        try {
            const response = await userApi.post(`update_certified/${id}`, { value: data });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        fetchAcademies();
        closeModal();
    }

    // to handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    //  pagination
    const indexOfLastAcademy = currentPage * academiesPerPage;
    const indexOfFirstAcademy = indexOfLastAcademy - academiesPerPage;
    const currentAcademies = filteredAcademy.slice(indexOfFirstAcademy, indexOfLastAcademy);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    console.log(filteredAcademy);
    return (
        <>
            <section className="container mx-auto p-6 font-kanit">
                <div className="mb-4 flex justify-between items-center bg-gray-200 px-4 py-2">
                    <h1 className="text-2xl font-bold">Academy Management</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-2 rounded px-4 py-2"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentAcademies.length > 0 ? (
                        currentAcademies.map((obj) => (
                            <div key={obj.id} className="bg-white p-4 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="relative w-16 h-16 mr-4 rounded-full">
                                        <img className="object-cover w-full h-full rounded-full" src={obj?.profile?.profile_photo ? `${baseUrl}${obj.profile?.profile_photo}`
                                                        :"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" } alt="profile" loading="lazy" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-black">{obj.username}</p>
                                        <p className="text-xs text-gray-600">{obj.sport.sport_name} Academy</p>
                                    </div>
                                </div>
                                <div className="text-sm mb-1">
                                    <p><strong>Email:</strong> {obj.email}</p>
                                    <p><strong>Established:</strong> {obj.dob}</p>
                                    <p><strong>State:</strong> {obj.profile.state}</p>
                                    <p><strong>District:</strong> {obj.profile.district}</p>
                                    <p><strong>Certification:</strong> {obj.academy_data.is_certified === true ? <span>Approved</span> : <span>Denied</span>}</p>

                                </div>
                                <div className="text-center">
                                    <span className='text-cyan-500 hover:text-cyan-700 cursor-pointer' onClick={() => viewLicense(obj.academy_data.license, obj.username)}>View Certificate</span>  
                                    <button className='border-2 border-amber-400 bg-amber-500 hover:bg-amber-700 text-white px-4 py-1' onClick={()=>changeStatusModalOpen(obj)}>Change Status</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No data</div>
                    )}
                </div>
                <div className="flex justify-center mt-6">
                    <ul className="inline-flex items-center -space-x-px">
                        {[...Array(Math.ceil(filteredAcademy.length / academiesPerPage)).keys()].map(number => (
                            <li key={number} className={`px-3 py-2 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : ''}`} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <dialog id="my_modal_3" className="modal p-5">
                <div className="modal-box">
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setLicense([])}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg text-center capitalize">{license[1]} license</h3>
                    <div className="flex text-center justify-center">
                        <img className="max-w-[500px]" src={license[0]} alt="License" />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop text-center mt-2">
                    <button className="bg-red-500 px-4 py-1 rounded-lg text-white" onClick={() => setLicense([])}>
                        Close
                    </button>
                </form>
            </dialog>

            {/*  modal to change certificaton status */}
            <ReactModal isOpen={isOpen}
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
                <div className='text-center mt-4 '>Academy Name : <span className='font-semibold'>{current?.username}</span> </div>
                <div className='text-center mb-1'>current status : <b> {current?.academy_data?.is_certified ?<>Approved</>:<>Denied</>}</b></div>
                <div className='text-center w-full'>
                    {
                        current?.academy_data?.is_certified ?
                        <button className='bg-red-500 py-2 w-1/3 text-white hover:bg-red-800' onClick={() => handleCertication('deny', current?.id)}>Deny</button>
                        :
                        <button className='bg-green-500 py-2 w-1/3 hover:bg-green-700 text-white' onClick={() => handleCertication('approve', current?.id)}>Approve</button>
                    }
                </div>
                
            </ReactModal>
        </>
    );
}
export default AcademyManage;
