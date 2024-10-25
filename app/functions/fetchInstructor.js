const baseurl = 'https://sait-sust-prd-prd1-ban-ss-ssag4.sait.ca/StudentRegistrationSsb/ssb';

export async function fetchInstructor(crn) {
  const url = `${baseurl}/searchResults/getFacultyMeetingTimes?term=202430&courseReferenceNumber=${crn}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.fmt[0].faculty[0].displayName;
}