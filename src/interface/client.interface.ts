export interface iUser{
    id: string,
    name: string,
    email: string,
    password: string,
    phone_number: string,
    created_at: Date
}

export interface iUser_create_request{
    name: string,
    email: string,
    password: string,
    phone_number: string,
}

export interface iUser_create_response{
    id: string,
    name: string,
    email: string,
    phone_number: string,
    created_at: Date
}

export interface iUser_update{
    name?: string,
    email?: string,
    password?: string,
    phone_number?: string,
}
