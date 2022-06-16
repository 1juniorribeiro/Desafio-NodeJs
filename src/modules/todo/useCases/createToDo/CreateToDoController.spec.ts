import request from "supertest";
import { Connection } from "typeorm";

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Create To Do Controller', () => {

  beforeAll(async () => {
    connection =await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to create To Do', async () => {
    const response = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'low',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty(['description'], 'Teste');
    expect(response.body).toHaveProperty(['priority'], 'low');
    expect(response.body).toHaveProperty(['done'], false);
    expect(response.body).toHaveProperty('created_at');
  })

  it('Should not be able to create To Do with invalid priority', async () => {
    const response = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'superhigh',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Priority is invalid, only low, medium or high')
  })

  it('Should not be able to create To Do with invalid description', async () => {
    const response = await request(app)
      .post('/todos/create')
      .send({
        description: '',
        priority: 'low',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Description is required')
  })
})