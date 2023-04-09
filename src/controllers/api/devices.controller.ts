import { Request, Response } from "express";
import { 
  getDeviceById as getDeviceByIdService,
  getAllDevices as getAllDevicesService,
  createDevice as createDeviceService,
  editDeviceById as editDeviceByIdService,
  deleteDeviceById as deleteDeviceByIdService,
  getDevicesByDoorId as getDevicesByDoorIdService,
} from "@/services/devices.service.ts";

// Single device routes

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const devices = await getAllDevicesService(populate);
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getDeviceById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const device = await getDeviceByIdService(req.params.id, populate);
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const editDeviceById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const device = await editDeviceByIdService(req.params.id, req.body, populate);
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const deleteDeviceById = async (req: Request, res: Response) => {
  try {
    const device = await deleteDeviceByIdService(req.params.id);
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getDevicesByDoorId = async (req: Request, res: Response) => {
  try {
    const devices = await getDevicesByDoorIdService(req.params.id);
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createDevice = async (req: Request, res: Response) => {
  try {
    const device = await createDeviceService(req.body);
    return res.status(200).json(device);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}