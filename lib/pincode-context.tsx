"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "stutium-pincode";

type Ctx = { pincode: string; setPincode: (p: string) => void; ready: boolean };

const PincodeContext = createContext<Ctx>({ pincode: "", setPincode: () => {}, ready: false });

export function PincodeProvider({ children }: { children: ReactNode }) {
  const [pincode, setState] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setState(saved);
    } catch {
      // storage can be blocked; the app still works without it
    }
    setReady(true);
  }, []);

  const setPincode = (p: string) => {
    setState(p);
    try {
      localStorage.setItem(KEY, p);
    } catch {
      // ignore
    }
  };

  return <PincodeContext.Provider value={{ pincode, setPincode, ready }}>{children}</PincodeContext.Provider>;
}

export const usePincode = () => useContext(PincodeContext);