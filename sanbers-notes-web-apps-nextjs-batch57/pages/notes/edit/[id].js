import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/layout ";

export default function EditNotes() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          console.log(`Fetching note with ID: ${id}`);
          const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
          const noteData = await res.json();
          if (noteData?.data) {
            setNote(noteData.data);
            console.log(`Note data fetched: `, noteData.data);
          } else {
            console.error("Failed to fetch the note data");
          }
        } catch (error) {
          console.error("Failed to fetch the note:", error);
        }
      };
      fetchNote();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      console.log(`Updating note with ID: ${id}`);
      const response = await fetch(
        `https://service.pace-unv.cloud/api/notes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: note.title, description: note.description }),
        }
      );
      const result = await response.json();
      console.log(`Update response: `, result);
      if (result?.success) {
        router.push("/notes");
      } else {
        console.error("Failed to update the note:", result?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to update the note:", error);
    }
  };

  return (
    <Layout metaTitle="Edit Note">
      <div className="m-5 p-5 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-5">Edit Notes</h1>
        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={note.title}
              onChange={(event) => setNote({ ...note, title: event.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={note.description}
              onChange={(event) => setNote({ ...note, description: event.target.value })}
              className="mt-1 block w-full px-7 py-7 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes/");
  const notes = await res.json();
  const paths = notes.data.map((item) => ({
      params: {
          id: item.id.toString() 
      }
  }));

  return {
      paths,
      fallback: true, 
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
  const notes = await res.json();

  if (!notes.data) {
      return {
          notFound: true, 
      };
  }

  return { props: { notes } };
}

