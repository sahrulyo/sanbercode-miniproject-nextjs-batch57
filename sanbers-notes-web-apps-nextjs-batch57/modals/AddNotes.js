import React, { useState } from 'react';
import { useMutation } from '@/components/hooks/useMutation ';

const AddNotes = ({ onClose }) => {
    const { mutate } = useMutation(); 
    const [notes, setNotes] = useState({ title: '', description: '' });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await mutate({
          url: 'https://service.pace-unv.cloud/api/notes',
          method: 'POST', 
          payload: notes,
        });
  
        if (response?.success) {
        
          setNotes({ title: '', description: '' });
         
          onClose(); 
          console.error('Gagal mengirimkan:', response.error); 
        }
      } catch (error) {
        console.error('Error submitting data:', error); 
      }
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNotes((prevNotes) => ({
        ...prevNotes,
        [name]: value,
      }));
    };
  
    return (
      <div>
        {/* Latar belakang modal */}
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          {/* Modal utama */}
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
              {/* Header modal */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Tambahkan Catatan</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Tutup modal</span>
                </button>
              </div>
              {/* Isi modal */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Judul
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={notes.title}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Masukkan judul"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Deskripsi
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={notes.description}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Tulis deskripsi..."
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddNotes;