import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { ErrorModal } from '@/components/error-modal/error-modal';
import { Loading } from '@/components/loading/loading';
import { Optional } from '@/components/optional/optional';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditWidgetModal } from '@/containers/components/edit-widget-modal/edit-widget-modal';
import { useEditModal } from '@/containers/hooks/use-edit-modal';
import type { Widget } from '@/types/widget.types';
import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { useWidget } from './hooks/use-widget';
import { WidgetCardLoader } from './widget-card-loader';

const widgetTypeToTitle: Record<string, string> = {
  line: 'Line Chart',
  bar: 'Bar Chart',
  text: 'Text Widget',
};

type Props = {
  widgetId: Widget['id'];
  onEditWidgetSave: (id: Widget['id'], content: Widget['content']) => Promise<void>;
  onRemove: (id: Widget['id']) => Promise<void>;
};

export const WidgetCard = ({ widgetId, onRemove, onEditWidgetSave }: Props) => {
  const { widget, refetchWidget, isLoadingWidget, widgetError } = useWidget(widgetId);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const { isEditModalOpen, handleModalOpenChange } = useEditModal();

  const handleRemoveWidget = async () => {
    try {
      setIsRemoving(true);
      await onRemove(widgetId);
    }
    catch (error) {
      if (error instanceof Error) {
        setRemoveError(error.message);
      }
    }
    finally {
      setIsRemoving(false);
    }
  };

  const handleEditWidgetSave = async (id: Widget['id'], content: Widget['content']) => {
    await onEditWidgetSave(id, content);
    await refetchWidget();
  };

  if (widgetError) {
    return (
      <Card className="min-h-80 space-y-0 gap-0 pb-3.5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3.5">
          <CardTitle className="text-base">Error while loading widget</CardTitle>
        </CardHeader>
        <CardContent className="grow flex flex-col">
          <p className="text-red-600">
            {widgetError}
          </p>
          <div className="grow flex items-end justify-center">
            <Button variant="outline" className="mt-4" onClick={() => refetchWidget()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoadingWidget || !widget) {
    return <WidgetCardLoader />;
  }

  const textWidgetContent = (
    <div className="min-h-[200px] rounded-md border bg-background p-3 text-sm">
      {widget.content ?? <span className="text-muted-foreground">No text yet. Click edit to add text.</span>}
    </div>
  );

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'line':
        return (
          <LineChart data={widget.data ?? []} />
        );
      case 'bar':
        return (
          <BarChart data={widget.data ?? []} />
        );
      case 'text':
        return textWidgetContent;
      default:
        return null;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3.5">
          <CardTitle className="text-base">{widgetTypeToTitle[widget.type]}</CardTitle>
          <div>
            <Optional show={widget.type === 'text'}>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleModalOpenChange(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </Optional>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleRemoveWidget}
            >
              <Loading isLoading={isRemoving}>
                <X className="h-4 w-4" />
              </Loading>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {renderWidgetContent()}
        </CardContent>
      </Card>
      {
        widget.type === 'text' && (
          <EditWidgetModal
            isEditModalOpen={isEditModalOpen}
            widgetId={widget.id}
            initialText={widget.content}
            handleOpenChange={handleModalOpenChange}
            onSave={handleEditWidgetSave}
          />
        )
      }
      <ErrorModal
        isOpen={!!removeError}
        title="Error Removing Widget"
        description="An error occurred with the following message:"
        message={removeError ?? 'An unknown error occurred.'}
        handleOpenChange={() => setRemoveError(null)}
      />
    </>
  );
};
