interface IUser {
  _id: string;
}

declare namespace Express {
  interface Request {
    user: IUser;
  }
}
