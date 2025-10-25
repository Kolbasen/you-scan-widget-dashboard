import { Array, Literal, Object, Partial, Pick, Omit, Type, Static } from '@fastify/type-provider-typebox';
import { AppErrorResponseSchema } from '../common/error.schema';

const WidgetTypeSchema = Type.Enum(['line', 'bar', 'text']);

const WidgetBaseSchema = Type.Object({
  id: Type.Number(),
  type: WidgetTypeSchema,
  content: Type.Union([Type.String(), Type.Null()]),
  data: Type.Optional(Type.Any()),
}, { additionalProperties: false });

type Widget = Static<typeof WidgetBaseSchema>;

const WidgetOnlyIdSchema = Pick(WidgetBaseSchema, ['id']);

const CreateWidgetBodySchema = Pick(WidgetBaseSchema, Literal('type'));

type CreateWidgetBody = Static<typeof CreateWidgetBodySchema>;

const UpdateWidgetBodySchema = Partial(Omit(WidgetBaseSchema, Literal('id')));

type UpdateWidgetBody = Static<typeof UpdateWidgetBodySchema>;

const CreateWidgetSchema = {
  body: CreateWidgetBodySchema,
  response: {
    '201': WidgetBaseSchema,
    '4xx': AppErrorResponseSchema,
  },
};

const GetWidgetsIdsSchema = {
  response: {
    '200': Array(WidgetOnlyIdSchema),
    '4xx': AppErrorResponseSchema,
  },
};

const GetWidgetByIdSchema = {
  params: Pick(WidgetBaseSchema, Literal('id')),
  response: {
    '200': WidgetBaseSchema,
    '4xx': AppErrorResponseSchema,
  },
};

const UpdateWidgetByIdSchema = {
  params: Pick(WidgetBaseSchema, Literal('id')),
  body: UpdateWidgetBodySchema,
  response: {
    '200': Partial(WidgetBaseSchema),
    '4xx': AppErrorResponseSchema,
  },
};

const DeteleWidgetByIdSchema = {
  params: Pick(WidgetBaseSchema, Literal('id')),
  response: {
    '200': Object({ success: Literal(true) }),
    '4xx': AppErrorResponseSchema,
  },
};

export {
  CreateWidgetSchema,
  DeteleWidgetByIdSchema,
  GetWidgetsIdsSchema,
  UpdateWidgetByIdSchema,
  GetWidgetByIdSchema,
  type Widget,
  type CreateWidgetBody,
  type UpdateWidgetBody,
};
