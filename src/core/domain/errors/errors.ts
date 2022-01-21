export class Failure extends Error {
  public readonly code: number;

  constructor(error: string, code?: number) {
    super(error);
    this.name = "Failure";
    this.code = code ?? 418;
  }
}

export class NotFoundFailure extends Failure {
  constructor(data: string) {
    super(`${data} não encontrado(a).`, 404);
    this.name = "NotFoundFailure";
  }
}

export class InvalidTokenFailure extends Failure {
  constructor() {
    super(`Token não informado`, 403);
    this.name = "InvalidTokenFailure";
  }
}
