import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Link
} from "@mui/material";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("30");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expire,setExpire]=useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/shorturls", {
        url,
        shortcode: shortcode.trim(),
      });
      setShortUrl(res.data.shortLink);
      setExpire(res.data.expiry)
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          URL Shortener
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter long URL"
            variant="outlined"
            fullWidth
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Custom shortcode (optional)"
            variant="outlined"
            fullWidth
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Validity (in minutes)"
            variant="outlined"
            fullWidth
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            type="number"
            inputProps={{ min: 1 }}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Shorten URL"}
          </Button>
        </form>

        {shortUrl && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Short URL:&nbsp;
            <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </Link>
            <br></br>
            {expire && expire}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
