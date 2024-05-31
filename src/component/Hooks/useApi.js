import { useState, useEffect } from "react";

const useApi = (url) => {
  const [Emails, setEmails] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          const emailData = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setEmails(emailData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();

    return () => {
      
    };
  }, [url]);
 
  return [Emails];
};

export default useApi;