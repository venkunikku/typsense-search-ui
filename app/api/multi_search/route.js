export async function POST(request) {
    try {
      const body = await request.json();
      
      const response = await fetch("http://localhost:8020/api/v1/multi_search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`Backend error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      console.error('API route error:', error);
      return new Response(
        JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  