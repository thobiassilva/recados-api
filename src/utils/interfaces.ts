export interface AuthParams {
  login: string;
  password: string;
}

export interface HttpResponse {
  body: any;
  statusCode: number;
}

export interface MessageParams {
  title: string;
  detail: string;
}
