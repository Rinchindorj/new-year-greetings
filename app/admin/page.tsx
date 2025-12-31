"use client";
import { useState } from 'react';
import { Copy, Check, Send, Sparkles } from 'lucide-react';

export default function AdminPage() {
  const [name, setName] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [cheering, setCheering] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    // This gets your website URL (localhost or your vercel link)
    const baseUrl = window.location.origin;

    if (!name || !conclusion || !cheering) {
      alert("Please fill in all fields!");
      return;
    }

    // IMPORTANT: 'c' must match searchParams.get('c') in the Greeting page
    // IMPORTANT: 's' must match searchParams.get('s') in the Greeting page
    const personalUrl = `${baseUrl}/greeting/${encodeURIComponent(name.trim())}?c=${encodeURIComponent(conclusion.trim())}&s=${encodeURIComponent(cheering.trim())}`;
    
    setGeneratedUrl(personalUrl);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center">
      <div className="max-w-xl w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-red-500" />
          <h1 className="text-2xl font-bold">New Year Link Creator</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Friend's Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 outline-none focus:border-red-500 transition-all"
              placeholder="e.g. Marcus"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">2024 Conclusion (Page 1)</label>
            <textarea 
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 h-24 outline-none focus:border-red-500 transition-all resize-none"
              placeholder="How was their year?"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">2025 Cheering (Page 2)</label>
            <textarea 
              value={cheering}
              onChange={(e) => setCheering(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 h-24 outline-none focus:border-red-500 transition-all resize-none"
              placeholder="Success wishes..."
            />
          </div>

          <button 
            onClick={generateLink}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} /> Generate Link
          </button>

          {generatedUrl && (
            <div className="mt-6 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
              <p className="text-emerald-400 text-xs mb-2 font-bold uppercase tracking-wider">Link Generated!</p>
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value={generatedUrl}
                  className="w-full bg-black/40 rounded-lg p-2 text-[10px] font-mono text-slate-300 border border-white/5"
                />
                <button 
                  onClick={copyToClipboard}
                  className="bg-white text-black px-3 rounded-lg hover:bg-slate-200"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}