import { Request, Response } from 'express';

import { 
  getAllCodes as getAllCodesService,
  getCodeById as getCodeByIdService,
  editCodeById as editCodeByIdService,
  deleteCodeById as deleteCodeByIdService,
  revokeCode as revokeCodeService,
  createCode as createCodeService,
} from '@/services/codes.service.ts';

// Single code routes

export const getAllCodes = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const codes = await getAllCodesService(populate);
    return res.status(200).json(codes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getCodeById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const code = await getCodeByIdService(req.params.id, populate);
    return res.status(200).json(code);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const editCodeById = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const code = await editCodeByIdService(req.params.id, req.body, populate);
    return res.status(200).json(code);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const deleteCodeById = async (req: Request, res: Response) => {
  try {
    const code = await deleteCodeByIdService(req.params.id);
    return res.status(200).json(code);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const revokeCode = async (req: Request, res: Response) => {
  try {
    const { populate = false } = req.query;
    const code = await revokeCodeService(req.params.id, populate);
    return res.status(200).json(code);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const createCode = async (req: Request, res: Response) => {
  try {
    const code = await createCodeService(req.body);
    return res.status(201).json(code);
  } catch (error) {
    return res.status(500).json(error.message);
  }
} 

