import React, { useState } from "react";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data || "Failed to generate short URL.");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282a36] text-white px-4">
      <div className="w-full max-w-md bg-[#44475a] p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">URL Shortener 🔗</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            required
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL..."
            className="w-full p-3 rounded-lg bg-[#6272a4] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#50fa7b]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#50fa7b] text-[#282a36] font-semibold py-2 rounded-lg hover:bg-[#40c86c] transition"
          >
            {loading ? "Shortening..." : "Generate Short URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 bg-[#50fa7b] text-[#282a36] p-3 rounded-lg text-center font-mono">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-400 text-center">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}
      </div>
    </div>
  );
}
