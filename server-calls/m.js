async function fetchChat() {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "I want to sleep" }),
      });
  
      const text = await response.text();
  
      // Attempt to parse as JSON if the response is expected to be JSON
      const data = JSON.parse(text);
      console.log(data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }
  
  fetchChat();
  