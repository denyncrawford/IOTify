import { Request, Response } from 'express';
import {
  createDoor as createDoorService,
  getAllDoors as getAllDoorsService,
  getDoorById as getDoorByIdService,
  editDoorById as editDoorByIdService,
  deleteDoorById as deleteDoorByIdService,
  addDeviceToDoor as addDeviceToDoorService,
} from '@/services/doors.service.ts';
import { addDoorToHouse } from '../../services/houses.service.ts';

// Single door routes

export const getAllDoors = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const doors = await getAllDoorsService(populate);
    return res.status(200).json(doors);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getDoorById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const door = await getDoorByIdService(req.params.id, populate);
    return res.status(200).json(door);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const editDoorById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const door = await editDoorByIdService(req.params.id, req.body, populate);
    return res.status(200).json(door);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const deleteDoorById = async (req: Request, res: Response) => {
  try {
    const door = await deleteDoorByIdService(req.params.id);
    return res.status(200).json(door);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const addDeviceToDoor = async (req: Request, res: Response) => {
  try {
    const door = await addDeviceToDoorService(req.params.id, req.body.deviceId);
    return res.status(200).json(door);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createDoor = async (req: Request, res: Response) => {
  try {
    const door = await createDoorService(req.body);
    if (req.body.houseId) await addDoorToHouse(req.body.houseId, door._id);
    return res.status(201).json(door);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}