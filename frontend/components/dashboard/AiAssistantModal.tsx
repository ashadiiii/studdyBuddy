
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AiAssistantModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  // Simulate a response (replace with real API call later)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse("This is an example response from the AI Assistant. It can help you organize tasks, explain concepts, or suggest a schedule.");
      setLoading(false);
      toast({
        title: "AI Assistant",
        description: "Your request was processed!",
      });
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md animate-enter">
        <DialogHeader>
          <DialogTitle>Ask the AI Assistant</DialogTitle>
          <DialogDescription>
            Get study insights, explanations, or planning advice!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Textarea
            required
            value={value}
            disabled={loading}
            className="resize-none"
            placeholder="Type your question or request..."
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading || !value.trim()}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 animate-spin" size={18} />}
            Send
          </Button>
        </form>
        {response && (
          <div className="bg-muted rounded p-3 mt-2 text-sm animate-fade-in text-left">
            <span className="font-medium text-muted-foreground">AI:</span> {response}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiAssistantModal;
