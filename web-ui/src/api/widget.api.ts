import { type WidgetOnlyId, type Widget, type CreateWidgetBody, type UpdateWidgetBody } from '@/types/widget.types';
import { makeBackendRequest } from './make-backend-request';

export const getWidgetsIds = async () => {
  return makeBackendRequest<WidgetOnlyId[]>('widgets');
};

export const getWidgetById = async (id: Widget['id']) => {
  return makeBackendRequest<Widget>(`widgets/${id}`);
};

export const createWidget = async (body: CreateWidgetBody) => {
  return makeBackendRequest<Widget>('widgets', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateWidgetbyId = async (id: Widget['id'], body: UpdateWidgetBody) => {
  return makeBackendRequest<Widget>(`widgets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteWidgetById = async (id: Widget['id']) => {
  return makeBackendRequest<void>(`widgets/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({}),
  });
};
