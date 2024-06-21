
const baseurl = 'https://sait-sust-prd-prd1-ban-ss-ssag4.sait.ca/StudentRegistrationSsb/ssb'; // Replace with your actual base URL

async function lookupCourse(txt_term) {

  console.log('Function running....');

  const lookupParams = {
    // 'term': txt_term,
    'txt_term': txt_term,
    // 'txt_subject': txt_subject,
    // 'txt_courseNumber': '306',
    'pageOffset': 0, //pageOffset,
    "pageMaxSize": 500 //pageMaxSize
  };

  try {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'User-Agent': 'python-requests/2.32.3', 
      'Accept-Encoding': 'gzip, deflate', 
      'Accept': '*/*', 
      'Connection': 'keep-alive',
    });

    const postResult = await fetch(`${baseurl}/term/search?mode=search&term=${txt_term}`, {
      // credentials: "same-origin",
      method: 'POST',
      headers: headers
    });

    const searchResult = await fetch(`${baseurl}/searchResults/searchResults?txt_term=${txt_term}&txt_subject=CPRG&txt_courseNumber=306&pageOffset=0&pageMaxSize=500`, {
      // credentials: "same-origin",     
      method: 'GET',
      headers: headers,
      params: JSON.stringify(lookupParams)
    });

    const result = await searchResult.json();

    await fetch(`${baseurl}/classSearch/resetDataForm`, {
      method: 'POST',
      headers: headers,
    });

    return result;

  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
}

export default lookupCourse;