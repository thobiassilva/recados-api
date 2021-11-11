export default class Message {
  constructor(
    public uid: string,
    public title: string,
    public detail: string,
    public userUid: string
  ) {}
}
