import { iUser } from "./user.interface";

export interface iContacts {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  registred_at: Date;
  user: iUser;
}

export interface iContacts_request {
  name: string;
  email: string;
  phone_number: string;
}

export interface iContacts_updata_request {
  name?: string;
  email?: string;
  phone_number?: string;
}
