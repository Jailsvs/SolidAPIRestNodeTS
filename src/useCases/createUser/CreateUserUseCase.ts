import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {

  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){}

  async execute(data: ICreateUserRequestDTO){
    const userAlreadExists = await this.usersRepository.findByEmail(data.email);
    
    if (userAlreadExists) {
      throw new Error('User alread exists.')
    }
    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
          name: data.name,
          email: data.email},
      from: {
          name: "Equipe do meu App",
          email: "equipe@meuapp.com"
      },
      subject: "Seja bem vindo à plataforma",
      body: "<p>Vc já pode fazer login em nossa plataforma.</p>"    
    })
  }
}