import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

import { supabase } from "./lib/supabase";

import Header from "./components/Header";
import Auth from "./components/Auth";

import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  if (!session) {
    return (
      <>
        <Header />
        <Auth />
      </>
    );
  }

  return (
    <>
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          {/* <Route path="/accounts" element={<Accounts />} /> */}
        </Routes>
      </div>
    </>
  );
}
