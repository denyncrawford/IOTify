import { Request, Response } from "express";
import {
  createHouse as createHouseService,
  deleteHouseById as deleteHouseByIdService,
  editHouseById as editHouseByIdService,
  getAllHouses as getAllHousesService,
  getHouseById as getHouseByIdService,
  getHouseUserGroups as getHouseUserGroupsService,
  getHouseDoors as getHouseDoorsService,
  addDoorToHouse as addDoorToHouseService,
  removeDoorFromHouse as removeDoorFromHouseService,
  addUserGroupToHouse as addUserGroupToHouseService,
  removeUserGroupFromHouse as removeUserGroupFromHouseService,
} from "@/services/houses.service.ts";

// Single house routes

export const getAllHouses = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const houses = await getAllHousesService(populate);
    return res.status(200).json(houses);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getHouseById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const house = await getHouseByIdService(req.params.id, populate);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createHouse = async (req: Request, res: Response) => {
  try {
    const house = await createHouseService(req.body);
    return res.status(201).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const editHouseById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const house = await editHouseByIdService(req.params.id, req.body, populate);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const deleteHouseById = async (req: Request, res: Response) => {
  try {
    const house = await deleteHouseByIdService(req.params.id);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

// House user groups routes

export const getHouseUserGroups = async (req: Request, res: Response) => {
  try {
    const userGroups = await getHouseUserGroupsService(req.params.id);
    return res.status(200).json(userGroups);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const addUserGroupToHouse = async (req: Request, res: Response) => {
  try {
    const house = await addUserGroupToHouseService(req.params.id, req.body.userGroupId);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const removeUserGroupFromHouse = async (req: Request, res: Response) => {
  try {
    const house = await removeUserGroupFromHouseService(req.params.id, req.body.userGroupId);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

// House doors routes

export const getHouseDoors = async (req: Request, res: Response) => {
  try {
    const doors = await getHouseDoorsService(req.params.id);
    return res.status(200).json(doors);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const addDoorToHouse = async (req: Request, res: Response) => {
  try {
    const house = await addDoorToHouseService(req.params.id, req.body.doorId);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const removeDoorFromHouse = async (req: Request, res: Response) => {
  try {
    const house = await removeDoorFromHouseService(req.params.id, req.body.doorId);
    return res.status(200).json(house);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}