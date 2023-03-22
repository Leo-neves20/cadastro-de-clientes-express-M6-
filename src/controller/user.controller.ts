import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { iUser } from "../interface/user.interface";
import { createUserService } from "../service/user/createUser.service";
import { deleteUserService } from "../service/user/deleteUser.service";
import { listUsersService } from "../service/user/listUser.service";
import { updateUserService } from "../service/user/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {

  const response: iUser = await createUserService(await req.body);

  return res.status(201).json(instanceToPlain(response));

};

export const updateUserController = async (req: Request, res: Response) => {

  const clientId: string = req.params.id;

  const response: iUser = await updateUserService(clientId, await req.body);

  return res.status(200).json(instanceToPlain(response));

};

export const listUsersController = async (req: Request, res: Response) => {

  const response: iUser[] = await listUsersService();

  return res.status(200).json(instanceToPlain(response));

};

export const deleteUserController = async (req: Request, res: Response) => {

  const clientId: string = req.params.id;

  const response: void = await deleteUserService(clientId);

  return res.status(204).json();

};
