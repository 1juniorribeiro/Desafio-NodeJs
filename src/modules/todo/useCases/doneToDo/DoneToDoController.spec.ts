import request from "supertest";
import { Connection } from "typeorm";

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Done To Do Controller', () => {
  
  beforeAll(async () => {
    connection =await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to done To Do', async () => {
    const responseCreate = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'medium',
      });

    const IdToDone = responseCreate.body.id;
    const createAt = responseCreate.body.created_at;

    const response = await request(app)
      .put(`/todos/done`)
      .query({ id: IdToDone });

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty(['id'], IdToDone);
    expect(response.body).toHaveProperty(['description'], 'Teste');
    expect(response.body).toHaveProperty(['priority'], 'medium');
    expect(response.body).toHaveProperty(['done'], true);
    expect(response.body).toHaveProperty(['created_at'], createAt);
    expect(response.body).toHaveProperty('finished_at');
  })

  it('Should not be able to done To Do with invalid id', async () => {
    const response = await request(app)
      .put('/todos/done')
      .query({ id: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Id')
  })
})