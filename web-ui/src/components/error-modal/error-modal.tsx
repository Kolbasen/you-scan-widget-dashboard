import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ErrorModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  message: string;
  handleOpenChange: (open: boolean) => void;
};

export const ErrorModal = ({ isOpen, title, message, description, handleOpenChange }: ErrorModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-xl ">{description}</p>
          <p className="text-xl text-red-600">{message}</p>
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => handleOpenChange(false)}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
