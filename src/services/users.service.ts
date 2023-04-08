import UserEntity from "@/entities/user.entity.ts";
import {
  IUser,
  IUserDTO,
  IUserSafeDTO,
} from "@/interfaces/users.interface.ts";

export const createUser = async (userData: IUserDTO): Promise<IUser> => {
  try {
    const user = await UserEntity.create(userData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async (): Promise<
  IUserSafeDTO[]
> => {
  try {
    const users = await UserEntity.find<IUserSafeDTO>({}, { password: 0 })
      .exec();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (userId: string): Promise<
  IUserSafeDTO | null
> => {
  try {
    const user = await UserEntity.findById<IUserSafeDTO>(
      userId,
      { password: 0 },
    ).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export const editUserById = async (userId: string, payload: IUserDTO): Promise<
  IUserSafeDTO | null> => {
  try {
    const user = await UserEntity.findByIdAndUpdate<IUserSafeDTO>(
      userId,
      payload,
      { new: true },
    ).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUserByEmailOrUsername = async (email?: string, username?: string): Promise<IUser | null> => {
  try {
    const user = await UserEntity.findOne<IUser>({ $or: [{ email }, { username }] }).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}


export const deleteUserById = async (userId: string): Promise<
  IUserSafeDTO | null
> => {
  try {
    const user = await UserEntity.findByIdAndDelete<IUserSafeDTO>(
      userId,
    ).exec();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}