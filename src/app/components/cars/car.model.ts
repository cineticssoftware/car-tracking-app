export interface ICar {
  id?: any;
  plate?: string | null;
  brand?: string | null;
  model?: string | null;
}

export class Car implements ICar {
  constructor(public id?: number, public plate?: string | null, public brand?: string | null, public model?: string | null) {}
}

export function getCarIdentifier(car: ICar): number | undefined {
  return car.id;
}
  