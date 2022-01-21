import { Failure } from "../../../../core/domain/errors/errors";

export class UserAlreadyExistsFailure extends Failure {
  constructor() {
    super("Usuário já registrado. Tente outro username ou faça login", 400);
    this.name = "UserAlreadyExistsFailure";
  }
}

export class InvalidCredentialsFailure extends Failure {
  constructor() {
    super("Credenciais Invalidas", 403);
    this.name = "InvalidCredentialsFailure";
  }
}
