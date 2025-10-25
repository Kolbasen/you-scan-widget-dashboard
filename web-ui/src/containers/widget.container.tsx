import { Spinner } from '@/components/ui/spinner';
import { WidgetList } from './components/widget-list/widget-list';
import { useWidgetData } from './hooks/use-widget-data';

export const WidgetContainer = () => {
  const { widgetIds, isLoading, error, addWidget, removeWidget, updateWidgeContentById } = useWidgetData();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-lg text-red-600">
            Error loading widgets:
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-xl text-muted-foreground">Add and customize your widgets</p>
        </div>
        {
          isLoading
            ? (
                <div className="min-h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Spinner />
                    <p className="mt-4 text-lg text-muted-foreground">Loading widgets...</p>
                  </div>
                </div>
              )
            : (
                <WidgetList
                  widgetIds={widgetIds}
                  addWidget={addWidget}
                  updateWidgeContentById={updateWidgeContentById}
                  removeWidget={removeWidget}
                />
              )
        }

      </div>
    </div>
  );
};
