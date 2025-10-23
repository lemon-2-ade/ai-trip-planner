"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthModalProps {
  children?: React.ReactNode;
  mode?: "signin" | "signup";
}

function AuthModal({ children, mode = "signin" }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">(mode);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="default">Get Started</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {authMode === "signin" ? (
          <SignIn
            onModeSwitch={() => setAuthMode("signup")}
            onSuccess={() => setIsOpen(false)}
          />
        ) : (
          <SignUp
            onModeSwitch={() => setAuthMode("signin")}
            onSuccess={() => setIsOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
