export class RouteModel {
}
export class Route {
  constructor(
    public id: number,
    public name: string,
    public routeTypeId: number,
    public miles: number,
    notes: string
  ) { }
}
