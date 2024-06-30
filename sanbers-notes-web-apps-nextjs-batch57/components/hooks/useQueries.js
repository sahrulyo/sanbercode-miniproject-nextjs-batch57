import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: [],
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(async ({ url = "", method = "GET" } = {}) => {
    setData((prevState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
    }));
    try {
      const response = await fetch(url, { method });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData({
        data: result,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      setData({
        data: [],
        isLoading: false,
        isError: true,
      });
    }
  }, []);

  // delete 
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${prefixUrl}/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setData((prevData) => ({
        ...prevData,
        data: Array.isArray(prevData.data) ? prevData.data.filter((item) => item.id !== id) : [],
      }));
  
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  //end delete

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl });
    }
  }, [prefixUrl, fetchingData]);

  return { ...data, setData, deleteItem };
};
