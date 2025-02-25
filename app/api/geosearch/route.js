  export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const url = new URL('http://localhost:8020/api/v1/geosearch');
      
      // Forward all query parameters
      url.search = searchParams.toString();
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Backend error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }