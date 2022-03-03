export class BookingCLass {
  constructor(
    public id: string,
    public placeId: string,
    public userId: string,
    public placeTitle: string,
    public amountOfGuests: number,
    public firstName: string,
    public lastName: string,
    public startDate: Date,
    public endDate: Date
  ) {}
}
