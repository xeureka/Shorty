import React, { useState, useEffect } from "react";
import { Github } from "lucide-react";
import axios from 'axios';

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/", { longUrl });

      if (response.status === 200) {
        setShortUrl(response.data.shortUrl);
        const newEntry = {
          link: response.data.shortUrl,
          date: new Date().toLocaleString(),
          status: "Active"
        };
        setHistory([newEntry, ...history]);
      } else {
        setError(response.data || "Failed to generate short URL.");
      }
    } catch (err) {
      setError(err.response?.data || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#282a36] text-white px-4">
      
    {/* Header with separate Login and Register */}
    <header className="w-full py-4 flex justify-end gap-4">
      <button className="bg-[#50fa7b] text-[#282a36] font-semibold py-2 px-4 rounded-lg hover:bg-[#40c86c] transition">
        Login
      </button>
      <button className="bg-transparent border border-[#50fa7b] text-[#50fa7b] font-semibold py-2 px-4 rounded-lg hover:bg-[#40c86c] hover:text-[#282a36] transition">
        Register
      </button>
    </header>

      {/* Main Section */}
      <div className="flex-grow flex flex-col items-center">
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

        {/* History Table */}
        <div className="w-full max-w-4xl mt-10 bg-[#44475a] p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Your History 📜</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#6272a4] text-left">
                <tr>
                  <th className="py-2 px-4">Link</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="py-2 px-4 text-[#50fa7b]">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item.link}
                        </a>
                      </td>
                      <td className="py-2 px-4">{item.date}</td>
                      <td className="py-2 px-4">
                        <span className={`font-semibold ${item.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 px-4 text-center" colSpan="3">
                      No history yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-white text-sm flex flex-col items-center gap-2 mt-10">
        <span>Made by Eureka</span>
        <a
          href="https://github.com/xeureka/URL-shortner"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <Github className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
}
