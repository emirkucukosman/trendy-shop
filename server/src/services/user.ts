import User, { IUser } from "../models/User";

export const findByUsername = async (username: string): Promise<IUser> => {
  return await User.findOne({ username });
};

export const create = async (username: string, email: string, password: string): Promise<IUser> => {
  return await User.create({ username, email, password });
};
