import { Failure } from "../../../../core/domain/errors/errors";

export class UpdateMessageFailure extends Failure {
  constructor() {
    super("Erro ao atualizar mensagem", 500);
    this.name = "UpdateMessageFailure";
  }
}
