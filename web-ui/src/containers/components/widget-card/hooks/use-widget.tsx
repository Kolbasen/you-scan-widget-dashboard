import { getWidgetById } from '@/api/widget.api';
import type { Widget } from '@/types/widget.types';
import { useEffect, useState } from 'react';

export const useWidget = (widgetId: Widget['id']) => {
  const [widget, setWidget] = useState<Widget | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWidget = async (id: Widget['id']) => {
    try {
      const fetchedWidget: Widget = await getWidgetById(id);
      setWidget(fetchedWidget);
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (widgetId) {
      fetchWidget(widgetId);
    }
  }, [widgetId]);

  return {
    widget,
    refetchWidget: () => fetchWidget(widgetId),
    isLoadingWidget: isLoading,
    widgetError: error,
  };
};
