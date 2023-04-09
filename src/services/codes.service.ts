import { ICode } from "@/interfaces/codes.interface.ts";
import CodeEntity from "@/entities/code.entity.ts";

export const createCode = async (codeData: ICode): Promise<ICode> => {
  try {
    if (!codeData.code) {
      codeData.code = generatePin();
    }
    const code = await CodeEntity.create(codeData);
    return code;
  } catch (error) {
    throw new Error(error);
  }
}

export const getAllCodes = async (populate = false): Promise<ICode[]> => {
  try {
    const codes = CodeEntity.find<ICode>({});
    if (populate) {
      codes.populate("user").populate("house").populate("door");
    }

    return await codes.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const getCodeById = async (
  codeId: string,
  populate = false,
): Promise<ICode | null> => {
  try {
    const code = CodeEntity.findById<ICode>(
      codeId,
    );
    if (populate) {
      code.populate("user").populate("house").populate("door");
    }
    return await code.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const editCodeById = async (
  codeId: string,
  payload: ICode,
  populate = false,
): Promise<ICode | null> => {
  try {
    const code = CodeEntity.findByIdAndUpdate<ICode>(
      codeId,
      payload,
      { new: true },
    );
    if (populate) {
      code.populate("user").populate("house").populate("door");
    }
    return await code.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteCodeById = async (
  codeId: string,
): Promise<ICode | null> => {
  try {
    const code = await CodeEntity.findByIdAndDelete(codeId);
    return code;
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteCodesByHouseId = async (
  houseId: string,
) => {
  try {
    const codes = await CodeEntity.deleteMany({ house: houseId });
    return codes;
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteCodesByUserId = async (
  userId: string,
) => {
  try {
    const codes = await CodeEntity.deleteMany({ user: userId });
    return codes;
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteCodesByDoorId = async (
  doorId: string,
) => {  
  try {
    const codes = await CodeEntity.deleteMany({ door: doorId });
    return codes;
  } catch (error) {
    throw new Error(error);
  }
}

export const revokeCode = async (
  codeId: string,
  populate = false,
): Promise<ICode | null> => {
  try {
    const code = CodeEntity.findByIdAndUpdate<ICode>(
      codeId,
      { enabled: false },
      { new: true },
    );
    if (populate) {
      code.populate("user").populate("house").populate("door");
    }
    return await code.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const isCodeExpired = (code: ICode): boolean | null => {
    const now = new Date();
    if (!code.expiresAt) return true;
    if (code.expiresAt < now) return false;
    return true;
}

export const generatePin = () => {
  const now = new Date();
  const timeInMs = now.getTime().toString();
  const pin = timeInMs.slice(-6);
  return pin;
}
