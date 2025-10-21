import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthHandlers } from "@/features/auth/hooks/useAuthHandlers";
import { useRef } from "react";

export default function AuthForm() {
  const { isLogin } = useAuthHandlers();

  // refs to hold input box
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  //   function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    e.preventDefault();
    //  Send to backend ()
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Backend response:", data);

    // clear inputs
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  return (
    <form>
      <div className="flex flex-col gap-6">
        {/* Email field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="dev.ataraxia7@gmail.com"
            required
            ref={emailRef}
          />
        </div>
        {/* Password field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* forgot password link */}
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:text-red-500"
            >
              {isLogin ? "Forgot your password?" : ""}
            </a>
          </div>
          <Input id="password" type="password" ref={passwordRef} required />
        </div>

        {/* auth submit button */}
        <Button type="submit" className="w-full" onSubmit={handleSubmit}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}
