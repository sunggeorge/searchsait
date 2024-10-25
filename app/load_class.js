// import DataFetcher from './components/DataFetcher';

// export default function HomePage() {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <DataFetcher />
//     </div>
//   );
// }
'use client'
import { useState } from 'react';

export default function Home() {
  const [term, setTerm] = useState('202430');
  const [subject, setSubject] = useState('CPRG');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    event.preventDefault();
    console.log(term, subject);
    const response = await fetch('/api/courseLookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        txt_term: term,
        txt_subject: subject,
        pageOffset: 0,
        pageMaxSize: 500, // Example page max size
      }),
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        className="text-black"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Term"
      />
      <input
        type="text"
        className="text-black"        
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <button onClick={handleSearch}>Search</button>

      {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
    </div>
  );
}