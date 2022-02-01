import { Redis } from "ioredis";
import { ICacheRepository } from "../../domain/contracts/cache_repository.contract";
import { RedisConnection } from "../database/connections/redis";

export class CacheRepository implements ICacheRepository {
  private readonly redis: Redis;

  constructor() {
    this.redis = RedisConnection.getConnection();
  }

  async set(key: string, value: any): Promise<void> {
    const result = await this.redis.set(key, JSON.stringify(value), "EX", 30);

    if (result === null) {
      throw new Error("Set error");
    }
  }

  async get<T>(key: string): Promise<T> {
    const result = await this.redis.get(key);
    return result != null ? JSON.parse(result) : undefined;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
