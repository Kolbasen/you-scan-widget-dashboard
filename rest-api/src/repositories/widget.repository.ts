import { Database } from 'sqlite3';
import { CreateWidgetBody, Widget } from '../schemas/widget/widget.schema';

export class WidgetRepository {
  readonly db;

  constructor(db: Database) {
    this.db = db;
  }

  private generateWidgetRandomData() {
    return Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
    }));
  }

  createWidget(widgetData: CreateWidgetBody): Promise<Widget> {
    const { type } = widgetData;
    const data = type === 'text' ? null : JSON.stringify(this.generateWidgetRandomData());
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO widgets (type, content, data)
        VALUES (?, ?, ?)
      `;
      this.db.run(
        query,
        [type, null, data],
        function (err) {
          if (err) {
            return reject(err);
          }
          const createdWidget: Widget = {
            id: this.lastID,
            type,
            content: null,
            data,
          };
          resolve(createdWidget);
        },
      );
    });
  }

  getAllWidgetsIds() {
    return new Promise<Widget[]>((resolve, reject) => {
      const query = `SELECT id FROM widgets ORDER BY "createdAt" ASC`;
      this.db.all<Widget>(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  findWidgetById(id: number): Promise<Widget | null> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM widgets
        WHERE id = ?
      `;
      this.db.get<Widget>(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }

        const data = row && row.data ? JSON.parse(row.data as unknown as string) : null;

        if (data) {
          return resolve({ ...row, data });
        }

        return resolve(row || null);
      });
    });
  }

  updateWidgetbyId(id: number, widgetData: Partial<CreateWidgetBody>): Promise<Widget> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(widgetData)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = Object.values(widgetData);

      const query = `
        UPDATE widgets
        SET ${fields}
        WHERE id = ?
      `;
      this.db.run(query, [...values, id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve({ id, ...widgetData } as Widget);
      });
    });
  }

  deleteWidgetById(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM widgets
        WHERE id = ?
      `;
      this.db.run(query, [id], (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}
