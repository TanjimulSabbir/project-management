import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const handleLogin = async ({ data, status, router }) => {
    try {
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // });

        // const data = await response.json();
        const token = { loginEmail: data.email, tokenID: "21352359jflasdfo14" }

        if (status === "ok") {
            // Successful login
            toast.success("login successful!")
            localStorage.setItem('loginToken', JSON.stringify(token));
            router.push("/projects")
        } else {
            // Unsuccessful login
            // setError(data.error);
            toast.error("login failed!")
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error("login failed!")
    }
};
