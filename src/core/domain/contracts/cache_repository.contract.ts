export interface ICacheRepository {
  set(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
}
