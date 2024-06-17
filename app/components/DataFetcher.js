'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataFetcher() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenList, setTokenList] = useState([]);

  let newLetter = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of JSON files from the API route
        const fileListResponse = await axios.get('/api/list-files');
        const fileList = fileListResponse.data;

        console.log(fileList);
        // Fetch and combine data from all JSON files
        const dataPromises = fileList.map(file => {
          // console.log(file)
            const tempTokenList = fileList.map(file => file.split('.')[0]);
            setTokenList(tempTokenList);
        }
        // axios.get(`/res/202420/${file}`).then(response => ({ [file]: response.data }))
        );

        // const fileDataArray = await Promise.all(dataPromises);
        // const combinedData = fileDataArray.reduce((acc, fileData) => {
        //   return { ...acc, ...fileData };
        // }, {});

        // setData(combinedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // console.log(tokenList);
  // console.log(tokenList.length);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-4/5 mx-auto">
      <h1>Combined JSON Data</h1>
      <div className="grid grid-cols-12 gap-4 ">

        {tokenList.filter(file => file !== 'subjects')
        .map(file => {
          if (newLetter !== file.charAt(0)) {
            newLetter = file.charAt(0);
            return (
              <div className="p-2 text-center bg-purple-500
              ">
                {file}
              </div>
            )
          }
          
          else {
            return (
              <div className="p-2 text-center bg-blue-500">
                {file}
              </div>
            )
          
          }

        })}
      </div>
    </div>
  )};
