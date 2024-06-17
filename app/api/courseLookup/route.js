const baseurl = 'https://sait-sust-prd-prd1-ban-ss-ssag4.sait.ca/StudentRegistrationSsb/ssb'; // Replace with your actual base URL



export async function POST(req) {
    
    console.log(req.method);
//   if (req.method === 'POST') {
//   if (true) {
    const { txt_term, txt_subject, pageOffset, pageMaxSize } = await req.json();

    const lookupParams = {
      'term': txt_term,
      'txt_term': txt_term,
      'txt_subject': txt_subject,
      'txt_courseNumber': '306',
      'pageOffset': pageOffset,
      "pageMaxSize": pageMaxSize
    };

    try {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'User-Agent': 'python-requests/2.32.3', 
        'Accept-Encoding': 'gzip, deflate', 
        'Accept': '*/*', 
        'Connection': 'keep-alive',
      });

        console.log(JSON.stringify(lookupParams))
//     //   Step 1: Post to term search
      const postResult = await fetch(`${baseurl}/term/search?mode=search&term=202420`, {
      // const postResult = await fetch(`${baseurl}/term/search`, {
        // credentials: 'include',  
        credentials: "same-origin",
        method: 'POST',
        headers: headers
        // body: JSON.stringify(lookupParams)
        // params: lookupParams  
      });
      // console.log(postResult);  
      console.log('Response header');
      console.log(postResult.headers);        
      // return await response.json();;

      const testResult = await fetch(`${baseurl}/searchResults/getFacultyMeetingTimes?term=202420&courseReferenceNumber=21040`, {
        // const searchResult = await fetch(`${baseurl}/searchResults/searchResults`, {
          // credentials: 'include',   
          // credentials: "same-origin",     
          method: 'GET',
          headers: headers,
          params: JSON.stringify(lookupParams)
          // params: lookupParams       
        });

        const testReturn = await testResult.json();  
        return Response.json(testReturn);

      // Step 2: Get search results
      // const searchResult = await fetch(`${baseurl}/searchResults/searchResults?txt_term=${txt_term}&txt_subject=${txt_subject}&pageOffset=0&pageMaxSize=500`, {
      // const searchResult = await fetch(`${baseurl}/classSearch/classSearch?txt_term=202420&txt_subject=CPRG&pageOffset=0&pageMaxSize=500`, {
      const searchResult = await fetch(`${baseurl}/searchResults/searchResults?txt_term=202420&txt_subject=CPRG&txt_courseNumber=306&pageOffset=0&pageMaxSize=500`, {
      // const searchResult = await fetch(`${baseurl}/searchResults/searchResults`, {
        // credentials: 'include',   
        credentials: "same-origin",     
        method: 'GET',
        headers: headers,
        params: JSON.stringify(lookupParams)
        // params: lookupParams       
      });
      // console.log(searchResult);      
      const result = await searchResult.json();
      // console.log(searchResult.headers);
      console.log(result);

      // Step 3: Post to reset data form
      await fetch(`${baseurl}/classSearch/resetDataForm`, {
        method: 'POST',
        headers: headers,
      });

      return Response.json(result);

    } catch (error) {
      console.error(error);
      return Response.json({ message: 'Internal Server Error' });
    }
  
  } 
//   else {
//     return Response.json({ message: 'Method Not Allowed' });
//   }
// }

export async function GET(req, res) {
}