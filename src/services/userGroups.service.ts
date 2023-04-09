import UserGroupEntity from "@/entities/userGroup.entity.ts";
import {
  IUserGroup,
  IUserGroupDTO,
} from "@/interfaces/userGroups.interface.ts";

export const createUserGroup = async (
  userGroupData: IUserGroupDTO,
): Promise<IUserGroup> => {
  try {
    const userGroup = await UserGroupEntity.create(userGroupData);
    return userGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUserGroups = async (populate = false): Promise<IUserGroup[]> => {
  try {
    const userGroups = UserGroupEntity.find<IUserGroup>({});
    if (populate) {
      userGroups.populate("users");
    }

    return await userGroups.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserGroupById = async (
  userGroupId: string,
  populate = false,
): Promise<IUserGroup | null> => {
  try {
    const userGroup = UserGroupEntity.findById<IUserGroup>(
      userGroupId,
    );
    if (populate) {
      userGroup.populate("users");
    }
    return await userGroup.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const editUserGroupById = async (
  userGroupId: string,
  payload: IUserGroupDTO,
  populate = false,
): Promise<IUserGroup | null> => {
  try {
    const userGroup = UserGroupEntity.findByIdAndUpdate<IUserGroup>(
      userGroupId,
      payload,
      { new: true },
    );
    if (populate) {
      userGroup.populate("users");
    }
    return await userGroup.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsersFromUserGroup = async (
  userGroupId: string,
): Promise<IUserGroup | null> => {
  try {
    const userGroup = await UserGroupEntity.findById<IUserGroup>(
      userGroupId,
      { users: 1 },
    ).populate("users").exec();
    return userGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserToUserGroup = async (
  userGroupId: string,
  userId: string,
): Promise<IUserGroup | null> => {
  try {
    const userGroup = await UserGroupEntity.findByIdAndUpdate<IUserGroup>(
      userGroupId,
      { $push: { users: userId } },
      { new: true },
    ).exec();
    return userGroup;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserGroupById = async (
  userGroupId: string,
): Promise<IUserGroup | null> => {
  try {
    const userGroup = await UserGroupEntity.findByIdAndDelete<IUserGroup>(
      userGroupId,
    ).exec();
    return userGroup;
  } catch (error) {
    throw new Error(error);
  }
};