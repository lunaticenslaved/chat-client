import { IService } from '@/context/service';

export class BaseMetaService {
  protected service: IService;

  constructor(service: IService) {
    this.service = service;
  }
}
