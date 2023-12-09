import { IService } from '#/server/context/service';

export class BaseMetaService {
  protected service: IService;

  constructor(service: IService) {
    this.service = service;
  }
}
