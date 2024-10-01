'use client';
import { getCookie } from "cookies-next";
import axios from "axios";
import getInfo from "@/hooks/getInfo";
import { useState, useEffect, use } from "react";
export default function Adopt_Detail() 
{
    const jtw = getCookie("jwt");
    const [account, setAccount] = useState<any>();
    const fetchData = async () => {
        const getAccount = await getInfo();
        setAccount(getAccount);
    }
    useEffect(() => {
        if (jtw) {
            fetchData();
        }
    }, []);
    console.log(account);
    // console.log(account.email);


    return (
        <div>Hello Dinh So</div>
    )
       
}