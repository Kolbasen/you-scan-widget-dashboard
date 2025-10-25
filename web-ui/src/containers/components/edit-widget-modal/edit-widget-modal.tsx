import { Loading } from '@/components/loading/loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Widget } from '@/types/widget.types';
import { useState } from 'react';

type EditWidgetModalProps = {
  isEditModalOpen: boolean;
  widgetId: Widget['id'];
  initialText: Widget['content'];
  handleOpenChange: (open: boolean) => void;
  onSave: (id: Widget['id'], content: Widget['content']) => Promise<void>;
};

export const EditWidgetModal = ({ initialText, widgetId, isEditModalOpen, handleOpenChange, onSave }: EditWidgetModalProps) => {
  const [text, setText] = useState<string>(initialText ?? '');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(widgetId, text);
      handleOpenChange(false);
    }
    catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
    finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Text Widget</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={text}
              onChange={e => setText(e.target.value)}
              className="min-h-[200px] resize-none focus-visible:ring-green-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">
              Error:
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
          <Button disabled={isSaving} onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Loading isLoading={isSaving}>
              Save
            </Loading>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
