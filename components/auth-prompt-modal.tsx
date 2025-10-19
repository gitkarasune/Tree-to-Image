"use client"

import { SignInButton } from "@clerk/nextjs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface AuthPromptModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthPromptModal({ open, onOpenChange }: AuthPromptModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In to Continue</DialogTitle>
          <DialogDescription>
            You have generated 3 trees. Sign in with Google to continue generating unlimited trees and unlock premium
            features like collaboration, AI generation, and more.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <SignInButton mode="modal">
            <Button className="flex-1">Sign In with Google</Button>
          </SignInButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
