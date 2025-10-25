import { NotFoundError } from '../errors/custom-errors';
import Value from 'typebox/value';
import { CreateWidgetBody, CreateWidgetSchema, DeteleWidgetByIdSchema, GetWidgetByIdSchema, GetWidgetsIdsSchema, UpdateWidgetBody, UpdateWidgetByIdSchema } from '../schemas/widget/widget.schema';
import { WidgetService } from '../services/widget.service';
import { FastifyReplyTypeBox, FastifyRequestTypeBox } from '../types/fastify/fastify.types';

export class WidgetController {
  private widgetService: WidgetService;

  constructor(widgetService: WidgetService) {
    this.widgetService = widgetService;
  }

  createWidget = async (
    req: FastifyRequestTypeBox<typeof CreateWidgetSchema>,
    reply: FastifyReplyTypeBox<typeof CreateWidgetSchema>,
  ) => {
    const widgetData = Value.Clean(CreateWidgetSchema.body, req.body) as CreateWidgetBody;

    const createdWidget = await this.widgetService.create(widgetData);

    reply.code(201).send(createdWidget);
  };

  getWidgetsIds = async (
    _: FastifyRequestTypeBox<typeof GetWidgetsIdsSchema>,
    reply: FastifyReplyTypeBox<typeof GetWidgetsIdsSchema>,
  ) => {
    const widgetsIds = await this.widgetService.getAllWidgetsIds();

    reply.code(200).send(widgetsIds);
  };

  getWidgetById = async (
    req: FastifyRequestTypeBox<typeof GetWidgetByIdSchema>,
    reply: FastifyReplyTypeBox<typeof GetWidgetByIdSchema>,
  ) => {
    const widget = await this.widgetService.getWidgetById(req.params.id);

    if (!widget) {
      throw new NotFoundError(`Widget with id ${req.params.id} not found`);
    }

    reply.code(200).send(widget);
  };

  updateWidget = async (
    req: FastifyRequestTypeBox<typeof UpdateWidgetByIdSchema>,
    reply: FastifyReplyTypeBox<typeof UpdateWidgetByIdSchema>,
  ) => {
    const widgetData = Value.Clean(UpdateWidgetByIdSchema.body, req.body) as UpdateWidgetBody;

    const widget = await this.widgetService.updateById(req.params.id, widgetData);
    reply.send(widget);
  };

  deleteWidget = async (
    req: FastifyRequestTypeBox<typeof DeteleWidgetByIdSchema>,
    reply: FastifyReplyTypeBox<typeof DeteleWidgetByIdSchema>,
  ) => {
    await this.widgetService.deleteById(req.params.id);
    reply.code(200).send({ success: true });
  };
}
