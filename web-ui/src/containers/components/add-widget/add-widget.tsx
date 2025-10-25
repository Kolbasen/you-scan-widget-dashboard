import { ErrorModal } from '@/components/error-modal/error-modal';
import { Loading } from '@/components/loading/loading';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { WidgetType } from '@/types/widget.types';
import { BarChart3, LineChartIcon, Plus, Type } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onAddWidget: (type: WidgetType) => Promise<void>;
};

export const AddWidget = ({ onAddWidget }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddWidgetClick = async (type: WidgetType) => {
    try {
      setIsCreating(true);
      await onAddWidget(type);
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isCreating}>
          <Card className="min-h-80 grow cursor-pointer border-2 border-dashed border-muted-foreground/50 bg-muted/30 opacity-70 transition-all hover:opacity-100 hover:border-primary hover:bg-accent/70 hover:shadow-md">
            <CardContent className="flex grow flex-col items-center justify-center gap-3 p-6">
              <Loading isLoading={isCreating}>
                <>
                  <div className="rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-accent">Add Widget</p>
                </>
              </Loading>

            </CardContent>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          <DropdownMenuItem onClick={() => handleAddWidgetClick('line')} className="gap-2">
            <LineChartIcon className="h-4 w-4" />
            Line Chart
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddWidgetClick('bar')} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Bar Chart
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddWidgetClick('text')} className="gap-2">
            <Type className="h-4 w-4" />
            Text Widget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ErrorModal
        isOpen={!!error}
        title="Error Adding Widget"
        description="An error occurred with the following message:"
        message={error ?? 'An unknown error occurred.'}
        handleOpenChange={() => setError(null)}
      />
    </>
  );
};
