import request from "supertest";
import { Connection } from "typeorm";

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('List To Dos Controller', () => {
  beforeAll(async () => {
    connection =await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to list To Dos', async () => {
    const todo1 = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'low',
      });

      const todo2 =await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste2',
        priority: 'medium',
      });

      const todo3 = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste3',
        priority: 'high',
      });

    const response = await request(app).get('/todos/list')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(3)
    expect(response.body[0]).toHaveProperty(['id'], todo1.body.id)
    expect(response.body[0]).toHaveProperty(['description'], 'Teste')
    expect(response.body[0]).toHaveProperty(['priority'], 'low')
    expect(response.body[0]).toHaveProperty(['done'], false)
    expect(response.body[0]).toHaveProperty(['created_at'], todo1.body.created_at)
    expect(response.body[0]).toHaveProperty(['finished_at'], null)
    expect(response.body[1]).toHaveProperty(['id'], todo2.body.id)
    expect(response.body[1]).toHaveProperty(['description'], 'Teste2')
    expect(response.body[1]).toHaveProperty(['priority'], 'medium')
    expect(response.body[1]).toHaveProperty(['done'], false)
    expect(response.body[1]).toHaveProperty(['created_at'], todo2.body.created_at)
    expect(response.body[1]).toHaveProperty(['finished_at'], null)
    expect(response.body[2]).toHaveProperty(['id'], todo3.body.id)
    expect(response.body[2]).toHaveProperty(['description'], 'Teste3')
    expect(response.body[2]).toHaveProperty(['priority'], 'high')
    expect(response.body[2]).toHaveProperty(['done'], false)
    expect(response.body[2]).toHaveProperty(['created_at'], todo3.body.created_at)
    expect(response.body[2]).toHaveProperty(['finished_at'], null)

  })
})
