import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { Database } from 'sqlite3';
import { CreateWidgetSchema, GetWidgetsIdsSchema, UpdateWidgetByIdSchema, DeteleWidgetByIdSchema, GetWidgetByIdSchema } from '../schemas/widget/widget.schema';
import { WidgetService } from '../services/widget.service';
import { WidgetController } from '../controllers/widget.controller';
import { WidgetRepository } from '../repositories/widget.repository';

const widgetRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const db = fastify.getDecorator<Database>('db');
  const widgetRepository = new WidgetRepository(db);
  const widgetService = new WidgetService(widgetRepository);
  const widgetController = new WidgetController(widgetService);

  fastify.post('/', { schema: CreateWidgetSchema }, widgetController.createWidget);
  fastify.get('/', { schema: GetWidgetsIdsSchema }, widgetController.getWidgetsIds);
  fastify.get('/:id', { schema: GetWidgetByIdSchema }, widgetController.getWidgetById);
  fastify.put('/:id', { schema: UpdateWidgetByIdSchema }, widgetController.updateWidget);
  fastify.delete('/:id', { schema: DeteleWidgetByIdSchema }, widgetController.deleteWidget);
};

export { widgetRoutes };
