import request from 'supertest';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connections/connection';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { Message, User } from '../../../../../src/core/infra/database/entities';
import {
  UserEntityBuilder,
  MessageEntityBuilder,
} from '../../../../core/infra/database/entities';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { DeleteMessageUseCase } from '../../../../../src/features/messages/domain/usecases/delete_message.usecase';

describe('RedisConnection', () => {
  test('Deve retornar um Error se nao for iniciado a conexao antes do get', async () => {
    try {
      await RedisConnection.getConnection();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
