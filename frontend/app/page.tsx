"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/baseline")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <main
      className={`min-h-screen p-10 transition-colors duration-300 ${
        dark
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-white to-slate-100 text-black"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          🚀 BidWise RTB Dashboard
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black"
        >
          Toggle Theme
        </button>
      </div>

      {!data ? (
        <p className="mt-6">Loading simulation...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <Card title="Clicks" value={data.clicks} />
          <Card title="Conversions" value={data.conversions} />
          <Card title="Score" value={data.score} />
          <Card title="Remaining Budget" value={data.remaining_budget} />

        </div>
      )}
    </main>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  const formattedValue =
    typeof value === "number"
      ? value.toFixed(2)
      : value ?? "0";

  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white dark:bg-slate-800 transition">
      <h2 className="text-lg opacity-70">{title}</h2>
      <p className="text-3xl font-bold mt-2">{formattedValue}</p>
    </div>
  );
}

