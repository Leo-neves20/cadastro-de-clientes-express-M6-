import { hashSync } from "bcrypt";

export const userPasswordHashMock = {
    "name": "leonardo",
	"email": "leo@mail.com",
	"password": hashSync("1234", 10),
	"phone_number": "(21) 98888-7654"
}

export const user2PasswordHashMock = {
	"name": "Felipe",
	"email": "felipe@mail.com",
	"password": hashSync("1234", 10),
	"phone_number": "(21) 98888-7654"
}

export const userMock = {
    "name": "leonardo",
	"email": "leo@mail.com",
	"password": "1234",
	"phone_number": "(21) 98888-7654"
}

