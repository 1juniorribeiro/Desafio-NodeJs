import request from "supertest";
import { Connection } from "typeorm";

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Update To Do Controller', () => {

  beforeAll(async () => {
    connection =await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to update To Do', async () => {
    const responseCreate = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'medium',
      });

    const responseUpdate = await request(app)
      .put('/todos/update')
      .send({
        id: responseCreate.body.id,
        description: 'Teste Update',
        priority: 'high',
      })

    expect(responseUpdate.status).toBe(201)
    expect(responseUpdate.body).toHaveProperty(['id'], responseCreate.body.id);
    expect(responseUpdate.body).toHaveProperty(['description'], 'Teste Update');
    expect(responseUpdate.body).toHaveProperty(['priority'], 'high');
    expect(responseUpdate.body).toHaveProperty(['done'], false);
    expect(responseUpdate.body).toHaveProperty(['created_at'], responseCreate.body.created_at);
    expect(responseUpdate.body).toHaveProperty(['finished_at'], null);
  })

  it('Should not be able to update To Do with invalid id', async () => {
    const response = await request(app)
      .put('/todos/update')
      .send({
        id: 'invalid',
        description: 'Teste Update',
        priority: 'high',
      })

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Id')
  })

  it('Should not be able to update To Do with invalid description', async () => {
    const responseCreate = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'medium',
      });

    const responseUpdate = await request(app)
      .put('/todos/update')
      .send({
        id: responseCreate.body.id,
        priority: 'high',
      })

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body.message).toBe('Description is required')
  })

  it('Should not be able to update To Do with invalid priority', async () => {
    const responseCreate = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'medium',
      });

    const idCreate = responseCreate.body.id;

    const responseUpdate = await request(app)
      .put('/todos/update')
      .send({
        id: idCreate,
        description: 'Teste Update',
      })

    expect(responseUpdate.status).toBe(400);
    expect(responseUpdate.body.message).toBe('Priority is invalid, only low, medium or high')
  })
})