import { Toaster } from "react-hot-toast";
import Login from "./login";


export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <Login/>
      <Toaster position="top-center"/>
    </main>
  );
}
