'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataFetcher() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of JSON files from the API route
        const fileListResponse = await axios.get('/api/list-files');
        const fileList = fileListResponse.data;

        // Fetch and combine data from all JSON files
        const dataPromises = fileList.map(file =>
          axios.get(`/res/202420/${file}`).then(response => ({ [file]: response.data }))
        );

        const fileDataArray = await Promise.all(dataPromises);
        const combinedData = fileDataArray.reduce((acc, fileData) => {
          return { ...acc, ...fileData };
        }, {});

        setData(combinedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Combined JSON Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}