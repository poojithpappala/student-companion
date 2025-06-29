
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useConnectStore } from '@/hooks/use-connect-store';

interface GroupUpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GroupUpModal({ isOpen, onOpenChange }: GroupUpModalProps) {
  const { clearPeerSelection } = useConnectStore();
  const [groupName, setGroupName] = useState('');
  const { toast } = useToast();

  const handleStartChat = () => {
    if (!groupName.trim()) {
        toast({
            variant: "destructive",
            title: "Group Name Required",
            description: "Please enter a name for your group.",
        });
        return;
    }
    toast({
      title: "Group Created! (Stub)",
      description: `You started a chat with your new group: "${groupName}".`,
    });
    setGroupName('');
    clearPeerSelection();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Group</DialogTitle>
          <DialogDescription>
            Give your new collaboration group a name to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="e.g., AI Hackathon Warriors"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleStartChat}>
            <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
