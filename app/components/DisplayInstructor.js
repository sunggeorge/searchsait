import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { ratingsAtom } from '../stateAtoms.js';
import Tooltip from '@mui/material/Tooltip';

export default function DisplayInstructor({ instructor }) {
  // Access ratings data from Jotai atom
  const [ratings] = useAtom(ratingsAtom);
  const [instructorData, setInstructorData] = useState(null);
  
  // Async function to fetch instructor data
  const fetchInstructorData = async (instructor) => {
    // Simulate fetching data (if needed)
    return ratings[instructor];
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInstructorData(instructor);
      setInstructorData(data);
    };

    loadData();
  }, [instructor, ratings]);

  const hasRating = instructorData && instructorData.rating;

  // Determine Tailwind classes based on the rating
  const ratingClass = hasRating
    ? instructorData.rating < 3
      ? 'bg-red-300'
      : instructorData.rating < 4
      ? 'bg-yellow-300'
      : 'bg-green-300'
    : 'bg-gray-300'; // Default color if there's no rating

  return (
    <div>
      <span>{instructor}</span>
      {hasRating && (
        <Tooltip title={`View ${instructor} rating on Rate My Professors`} arrow>
        <a
          href={`https://www.ratemyprofessors.com/professor/${instructorData.ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block text-white px-2 py-1 ml-2 rounded ${ratingClass}`}
        >
          {instructorData.rating}
        </a>
      </Tooltip>
      )}
    </div>
  );
}