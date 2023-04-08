import { Request, Response } from "express";
import { IUser } from "@/interfaces/users.interface.ts";
import {
  createUser as createUserService,
  deleteUserById as deleteUserByIdService,
  editUserById as editUserByIdService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
} from "@/services/users.service.ts";

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
