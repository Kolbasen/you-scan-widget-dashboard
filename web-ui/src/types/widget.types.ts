type WidgetType = 'line' | 'bar' | 'text';

type WidgetData = {
  name: string;
  value: number;
};

type Widget = {
  id: number;
  type: WidgetType;
  content: string | null;
  data: WidgetData[];
};

type WidgetOnlyId = Pick<Widget, 'id'>;

type CreateWidgetBody = Pick<Widget, 'type'>;

type UpdateWidgetBody = Partial<Omit<Widget, 'id'>>;

export {
  type Widget,
  type WidgetType,
  type WidgetData,
  type WidgetOnlyId,
  type CreateWidgetBody,
  type UpdateWidgetBody,
};
