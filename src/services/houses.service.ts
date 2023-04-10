import { IHouse, IHouseDTO } from "@/interfaces/houses.interface.ts";
import HouseEntity from "@/entities/house.entity.ts";
import userGroupEntity from "@/entities/userGroup.entity.ts";
import doorEntity from "@/entities/door.entity.ts";

export const createHouse = async (houseData: IHouseDTO): Promise<IHouse> => {
  try {
    const house = await HouseEntity.create(houseData);
    return house;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllHouses = async (populate = false): Promise<IHouse[]> => {
  try {
    const houses = HouseEntity.find<IHouse>({});
    if (populate) {
      houses.populate("doors")
        .populate("userGroups");
    }

    return await houses.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getHouseById = async (
  houseId: string,
  populate = false,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findById<IHouse>(
      houseId,
    );
    if (populate) {
      house.populate("doors")
        .populate("userGroups");
    }
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const editHouseById = async (
  houseId: string,
  payload: IHouse,
  populate = false,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findByIdAndUpdate<IHouse>(
      houseId,
      payload,
      { new: true },
    );
    if (populate) {
      house.populate("doors")
        .populate("userGroups");
    }
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteHouseById = async (
  houseId: string,
): Promise<IHouse | null> => {
  try {
    const house = await HouseEntity.findByIdAndDelete<IHouse>(houseId);
    return house;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHouseUserGroups = async (
  houseId: string,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findById<IHouse>(
      houseId,
      { userGroups: 1 },
    );
    house.populate("userGroups");
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getHouseDoors = async (
  houseId: string,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findById<IHouse>(
      houseId,
      { doors: 1 },
    );
    house.populate("doors");
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const addDoorToHouse = async (
  houseId: string,
  doorId: string,
): Promise<IHouse | null> => {
  try {
    const door = await doorEntity.findById(doorId);
    if (!door) {
      throw new Error("Door not found");
    }
    return await HouseEntity.findByIdAndUpdate<IHouse>(
      houseId,
      { $push: { doors: doorId } },
      { new: true },
    ).populate("doors").exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const removeDoorFromHouse = async (
  houseId: string,
  doorId: string,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findByIdAndUpdate<IHouse>(
      houseId,
      { $pull: { doors: doorId } },
      { new: true },
    );
    house.populate("doors");
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserGroupToHouse = async (
  houseId: string,
  userGroupId: string,
): Promise<IHouse | null> => {
  try {
    const userGroup = await userGroupEntity.findById(userGroupId);
    if (!userGroup) {
      throw new Error("UserGroup not found");
    }
    return await HouseEntity.findByIdAndUpdate<IHouse>(
      houseId,
      { $push: { userGroups: userGroupId } },
      { new: true },
    ).populate("userGroups").exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUserGroupFromHouse = async (
  houseId: string,
  userGroupId: string,
): Promise<IHouse | null> => {
  try {
    const house = HouseEntity.findByIdAndUpdate<IHouse>(
      houseId,
      { $pull: { userGroups: userGroupId } },
      { new: true },
    );
    house.populate("userGroups");
    return await house.exec();
  } catch (error) {
    throw new Error(error);
  }
};
