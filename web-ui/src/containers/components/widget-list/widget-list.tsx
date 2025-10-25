import { WidgetCard } from '../widget-card/widget-card';
import type { Widget, WidgetOnlyId, WidgetType } from '@/types/widget.types';
import { AddWidget } from '../add-widget/add-widget';

type Props = {
  widgetIds: WidgetOnlyId[];
  addWidget: (type: WidgetType) => Promise<void>;
  removeWidget: (id: Widget['id']) => Promise<void>;
  updateWidgeContentById: (id: Widget['id'], content: Widget['content']) => Promise<void>;
};

export const WidgetList = ({ widgetIds, addWidget, removeWidget, updateWidgeContentById }: Props) => {
  if (widgetIds.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-xl text-center text-muted-foreground">
          No widgets added yet. Start by adding a widget below.
        </h2>
        <div className="flex w-1/3 justify-center">
          <AddWidget onAddWidget={addWidget} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {widgetIds.map(({ id }) => (
          <div key={id} className="relative">
            <WidgetCard
              widgetId={id}
              onRemove={removeWidget}
              onEditWidgetSave={updateWidgeContentById}
            />
          </div>
        ))}

        <AddWidget onAddWidget={addWidget} />
      </div>
    </div>
  );
};
