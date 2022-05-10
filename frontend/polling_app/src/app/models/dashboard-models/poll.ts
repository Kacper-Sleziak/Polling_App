export class Poll {
  id: number;
  title: string;
  description: string;
  slug: string;
  startDate: string | null;
  endDate: string | null;
  createDate: string;
  filled: number;
  sent: number;
  status: number;
  author: number;

  constructor(
    id: number,
    title: string,
    description: string,
    slug: string,
    startDate: string | null,
    endDate: string | null,
    createDate: string,
    filled: number,
    sent: number,
    status: number,
    author: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createDate = createDate;
    this.filled = filled;
    this.sent = sent;
    this.status = status;
    this.author = author;
  }
}

export namespace Poll {
  export enum Status {
    open = 0,
    close = 1,
    editing = 2,
  }
}
