import { ApiService } from '@service/ApiService';
import { NextFunction, Request, Response } from 'express';

export type getGenresParams = {
  language?: 'en-US' | 'pt-BR';
};

export type Genre = {
  id: number;
  name: string;
};

export class GenreController {
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
  }

  async list(req: Request<unknown, unknown, unknown, getGenresParams>, res: Response, next: NextFunction) {
    try {
      const result = await this.apiService.getGenres({
        language: req.query.language,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
