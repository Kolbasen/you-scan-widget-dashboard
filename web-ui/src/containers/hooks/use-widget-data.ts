import { useEffect, useState } from 'react';
import { type Widget, type WidgetType, type WidgetOnlyId, type CreateWidgetBody } from '@/types/widget.types';
import { createWidget, deleteWidgetById, getWidgetsIds, updateWidgetbyId } from '@/api/widget.api';

export const useWidgetData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [widgetIds, setWidgetIds] = useState<WidgetOnlyId[]>([]);

  useEffect(() => {
    const fetchWidgetIds = async () => {
      setIsLoading(true);
      try {
        const ids = await getWidgetsIds();
        setWidgetIds(ids);
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

    fetchWidgetIds();
  }, []);

  const addWidget = async (type: WidgetType) => {
    const widgetPayload: CreateWidgetBody = { type };
    const addedWidget = await createWidget(widgetPayload);
    setWidgetIds(prevIds => [...prevIds, { id: addedWidget.id }]);
  };

  const removeWidget = async (id: Widget['id']) => {
    await deleteWidgetById(id);
    setWidgetIds(prevIds => prevIds.filter(widget => widget.id !== id));
  };

  const updateWidgeContentById = async (id: Widget['id'], content: Widget['content']) => {
    await updateWidgetbyId(id, { content });
  };

  return {
    widgetIds,
    error,
    isLoading,
    addWidget,
    removeWidget,
    updateWidgeContentById,
  };
};
