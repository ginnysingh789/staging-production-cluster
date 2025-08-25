import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {  client } from "@repo/db/client";





export default async function Home() {
  try {
    const user = await client.user.findFirst();
    return (
      <div>
        <h1>User Data</h1>
        <p>Username: {user?.username || "No user found"}</p>
        <p>Password: {user?.password || "N/A"}</p>
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div>
        <h1>Database Connection Error</h1>
        <p>Unable to fetch user data. Please check your database connection.</p>
      </div>
    );
  }
}
