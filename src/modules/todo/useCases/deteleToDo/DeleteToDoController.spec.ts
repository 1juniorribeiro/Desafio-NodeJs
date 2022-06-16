import request from "supertest";
import { Connection } from "typeorm";

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Delete To Do Controller', () => {
  beforeAll(async () => {
    connection =await createConnection();
    await connection.runMigrations();
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it('Should be able to delete To Do', async () => {
    const responseCreate = await request(app)
      .post('/todos/create')
      .send({
        description: 'Teste',
        priority: 'low',
      });

    const IdToDelete = responseCreate.body.id;

    const response = await request(app)
      .delete(`/todos/delete`)
      .query({ Id: IdToDelete });

    expect(response.status).toBe(204);
  })

  it('Should not be able to delete To Do with invalid id', async () => {
    const response = await request(app)
      .delete('/todos/delete')
      .query({ Id: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid Id')
  })
})