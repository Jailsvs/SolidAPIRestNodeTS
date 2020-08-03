import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const mailtrapProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository, 
  mailtrapProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };