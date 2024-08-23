<<<<<<< HEAD
"use client"; 
import { useState } from "react"; // Import React's useState hook

export default function Home() {
  // State for storing user input query and the answer received from the API
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  // State for storing the URL submitted by the user and the scrape status message
  const [url, setUrl] = useState("");
  const [scrapeMessage, setScrapeMessage] = useState("");

  // Function to handle the submission of a professor query
  const handleSubmitQuery = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Make a POST request to the /api/query endpoint with the user's query
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuery: query }),
    });

    // Get the answer from the response and update the state
    const data = await response.json();
    setAnswer(data.answer);
  };

  // Function to handle the submission of a URL for scraping
  const handleSubmitUrl = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Make a POST request to the /api/scrape endpoint with the URL
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    // Get the scrape status message from the response and update the state
    const data = await response.json();
    setScrapeMessage(data.message);
  };

  return (
    <div>
      <h1>Rate My Professor AI Assistant</h1>

      {/* Form to submit a professor query */}
      <form onSubmit={handleSubmitQuery}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about a professor..."
        />
        <button type="submit">Ask</button>
      </form>

      {/* Display the answer received from the API */}
      <div>
        <h2>Answer:</h2>
        <p>{answer}</p>
      </div>

      {/* Form to submit a URL for scraping */}
      <h2>Submit a Professor's Page URL</h2>
      <form onSubmit={handleSubmitUrl}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Rate My Professors URL..."
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display the scrape status message */}
      <div>
        <h2>Scrape Status:</h2>
        <p>{scrapeMessage}</p>
      </div>
    </div>
  );
=======
'use client'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let result = ''

    const processText = async () => {
      const { done, value } = await reader.read()
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Uint8Array(), { stream: true })
      setMessages((prevMessages) => {
        let lastMessage = prevMessages[prevMessages.length - 1]
        let otherMessages = prevMessages.slice(0, prevMessages.length - 1)
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },
        ]
      })
      await processText() // Continue reading
    }

    await processText() // Start processing
    setMessage('') // Clear the input field after sending
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={msg.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={3}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
>>>>>>> 1dcbde99f5444b08d9caa63bf2316fa71e4dd03b
}
