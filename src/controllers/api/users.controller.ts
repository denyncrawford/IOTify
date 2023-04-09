import { Request, Response } from "express";
import { IUser } from "@/interfaces/users.interface.ts";
import {
  createUser as createUserService,
  deleteUserById as deleteUserByIdService,
  editUserById as editUserByIdService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
} from "@/services/users.service.ts";

import { 
  createUserGroup as createUserGroupService,
  deleteUserGroupById as deleteUserGroupByIdService,
  editUserGroupById as editUserGroupByIdService,
  getAllUserGroups as getAllUserGroupsService,
  getUserGroupById as getUserGroupByIdService,
  getUsersFromUserGroup as getUsersFromUserGroupService,
  addUserToUserGroup as addUserToUserGroupService,
} from "@/services/userGroups.service.ts";

// Single user routes

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const editUserById = async (req: Request, res: Response) => {
  try {
    const user = await editUserByIdService(req.params.id, req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserByIdService(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getMyProfile = (req: Request, res: Response) => {
  try {
    const { password: _p, ...user } = req.user?._doc as IUser;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// User groups routes

export const createUserGroup = async (req: Request, res: Response) => {
  try {
    const userGroup = await createUserGroupService(req.body);
    return res.status(201).json(userGroup);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getAllUserGroups = async (req: Request, res: Response) => {
  try {
    const { populate } = req.query;
    const userGroups = await getAllUserGroupsService(populate);
    return res.status(200).json(userGroups);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUserGroupById = async (req: Request, res: Response) => {
  try {
    const { populate } = req.query;
    const userGroup = await getUserGroupByIdService(req.params.id, populate);
    return res.status(200).json(userGroup);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const editUserGroupById = async (req: Request, res: Response) => {
  try {
    const { populate } = req.query;
    const userGroup = await editUserGroupByIdService(
      req.params.id,
      req.body,
      populate,
    );
    return res.status(200).json(userGroup);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteUserGroupById = async (req: Request, res: Response) => {
  try {
    const userGroup = await deleteUserGroupByIdService(req.params.id);
    return res.status(200).json(userGroup);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getUsersFromUserGroup = async (req: Request, res: Response) => {
  try {
    const users = await getUsersFromUserGroupService(req.params.id);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const addUserToUserGroup = async (req: Request, res: Response) => {
  try {
    const user = await addUserToUserGroupService(
      req.params.id,
      req.body,
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
