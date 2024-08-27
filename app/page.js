"use client";
import { useState } from "react";
import { Box, Button, Stack, TextField, Typography, AppBar, Toolbar, Container } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme({
  palette: { mode: 'dark', background: { default: '#121212', paper: '#1E1E1E' }, text: { primary: '#FFFFFF' }, primary: { main: '#BB86FC' } },
  typography: { fontFamily: '"Inter", "Arial", sans-serif' },
});

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  padding: '10px 20px',
}));

const ChatBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '80vh',
  borderRadius: '15px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
}));

const MessageBubble = styled(Box)(({ theme, role }) => ({
  backgroundColor: role === 'assistant' ? theme.palette.background.default : theme.palette.primary.main,
  color: theme.palette.text.primary,
  borderRadius: '15px',
  padding: '12px 20px',
  maxWidth: '80%',
  marginBottom: '10px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
}));

const InputContainer = styled(Stack)(({ theme }) => ({
  padding: '12px',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: "" }]);
    setInput("");

    if (isStreaming) return;
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input }) });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages(prev => [...prev.slice(0, -1), { role: "assistant", content: text }]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" display="flex" flexDirection="column" bgcolor={theme.palette.background.default}>
        <Header position="static">
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>AI Rate My Professor</Typography>
          </Toolbar>
        </Header>

        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" p={2}>
          <ChatBox direction="column" spacing={2}>
            <Stack direction="column" spacing={2} flexGrow={1} overflow="auto" p={2}>
              {messages.map((msg, idx) => (
                <Box key={idx} display="flex" justifyContent={msg.role === "assistant" ? "flex-start" : "flex-end"}>
                  <MessageBubble role={msg.role}>{msg.content}</MessageBubble>
                </Box>
              ))}
            </Stack>
            <InputContainer direction="row" spacing={2}>
              <TextField
                label="Type a message"
                fullWidth
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                sx={{ bgcolor: 'background.paper' }}
              />
              <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
            </InputContainer>
          </ChatBox>
        </Box>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="textSecondary" align="center">© {new Date().getFullYear()} AI Rate My Professor. All rights reserved.</Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

