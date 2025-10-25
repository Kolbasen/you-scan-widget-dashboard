import { CreateWidgetBody } from '../schemas/widget/widget.schema';
import { WidgetRepository } from '../repositories/widget.repository';
import { NotFoundError } from '../errors/custom-errors';

export class WidgetService {
  private widgetRepository: WidgetRepository;

  constructor(widgetRepository: WidgetRepository) {
    this.widgetRepository = widgetRepository;
  }

  create(widgetData: CreateWidgetBody) {
    return this.widgetRepository.createWidget(widgetData);
  }

  getAllWidgetsIds() {
    return this.widgetRepository.getAllWidgetsIds();
  }

  getWidgetById(id: number) {
    return this.widgetRepository.findWidgetById(id);
  }

  async updateById(id: number, widgetData: Partial<CreateWidgetBody>) {
    const widgetToUpdate = await this.widgetRepository.findWidgetById(id);

    if (!widgetToUpdate) {
      throw new NotFoundError(`Widget with id ${id} not found`);
    }

    return this.widgetRepository.updateWidgetbyId(id, widgetData);
  }

  async deleteById(id: number) {
    const widgetToDelete = await this.widgetRepository.findWidgetById(id);

    if (!widgetToDelete) {
      throw new NotFoundError(`Widget with id ${id} not found`);
    }
    return this.widgetRepository.deleteWidgetById(id);
  }
}
