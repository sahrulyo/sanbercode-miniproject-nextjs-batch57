import Layout from "@/layout ";
import { useRouter } from "next/router";
import { useQueries } from "@/components/hooks/useQueries ";
import DeleteConfirm from "@/modals/DeleteConfirm ";
import { useState } from "react";
import AddNotes from "@/modals/AddNotes ";


const Notes = () => {
    const router = useRouter();
    const { data: listNotes, deleteItem } = useQueries({ prefixUrl: "https://service.pace-unv.cloud/api/notes" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  
    const handleDelete = async (id) => {
      try {
        await deleteItem(id);
        window.alert("Berhasil dihapus!");
        setIsModalOpen(false);  // Menutup modal ketika berhasil menghapus
      } catch (error) {
        console.error("Gagal hapus:", error);
      }
    };
  
    const openModal = (id) => {
      setDeleteId(id);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setDeleteId(null);
    };
  
    const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  
    const toggleModal = () => {
      setShowAddNotesModal(!showAddNotesModal);
    };
  
    return (
      <>
        <Layout metaTitle="Notes">
          <section className="bg-white dark:bg-gray-900">
            {/* Tombol untuk membuka modal AddNotes */}
            <div className="flex justify-end m-5" style={{ width: '82%' }}>
              <button
                onClick={toggleModal}
                className="text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="button"
              > 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              > 
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
               </svg>
              </button>
            </div>
  
            {/* Daftar catatan */}
            {listNotes?.data?.map((item) => (
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16" key={item.id}>
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{item?.title}</h2>
                <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">Blogs</p>
                <dl>
                  <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                  <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{item?.description}</dd>
                </dl>
                <dl className="flex items-center space-x-6">
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Tech</dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Editor</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Author</dd>
                  </div>
                </dl>
                <div className="flex items-center space-x-4">
                  {/* Tombol Edit */}
                  <button
                    type="button"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => router.push(`/notes/edit/${item?.id}`)}
                  >
                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Edit
                  </button>
                  
                  {/* Tombol Delete */}
                  <button
                    type="button"
                    className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() => openModal(item?.id)}
                  >
                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </Layout>
  
        {/* tambah note */}
        {showAddNotesModal && <AddNotes onClose={toggleModal} />}
        
        {/* konfirmasi delete */}
        <DeleteConfirm
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={() => handleDelete(deleteId)}
        />
      </>
    );
  };
  
  export default Notes;

  export async function getStaticProps(){
    const res = await fetch ("https://service.pace-unv.cloud/api/notes/");
    const notes = await res.json();
    return {
        props:{notes}, 
        revalidate: 5
    };
} 