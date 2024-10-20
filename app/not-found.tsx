'use client';
import React , {useState} from 'react';
import ErrorModal from "@/app/Component/Error";
export default function NotFound() {
  const [error, setError] = useState(null);
  return <ErrorModal error="PAGE_NOT_FOUND" setError={setError}></ErrorModal>;
}