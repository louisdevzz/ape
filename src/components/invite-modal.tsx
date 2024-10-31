'use client'

import { useState, useEffect } from 'react'
import { X } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function InviteModal({ 
  isOpen = false, 
  onClose = () => {}, 
  inviteLink = 'https://t.me/your_bot?start=invite'
}: { 
  isOpen?: boolean
  onClose?: () => void
  inviteLink?: string 
}) {

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      console.log('Link copied to clipboard')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleSend = () => {
    // Implement Telegram Mini App sharing functionality
    console.log('Sending invite...')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full bg-[#222222] border-0 p-0 gap-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b border-zinc-800">
          <DialogTitle className="text-white text-lg font-medium">Invite a fren</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="p-6">
          <div className="bg-white p-4 rounded-lg w-full aspect-square flex items-center justify-center">
            <QRCodeSVG
              value={inviteLink}
              size={300}
              level="L"
            />
          </div>
        </div>
        <div className="p-4 space-y-2">
          <Button 
            className="w-full bg-white text-black hover:bg-zinc-200"
            onClick={handleSend}
          >
            Send
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
            onClick={handleCopyLink}
          >
            Copy link
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-white hover:bg-zinc-800"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}