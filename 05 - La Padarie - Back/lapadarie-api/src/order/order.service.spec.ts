import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a order when given correct parameters', () => {
    const order = {
      id: 1,
      client: 'Teste',
      amount: 1,
    };
    jest.spyOn(prisma.order, 'create').mockResolvedValue(order);

    expect(
      service.create({
        client: 'Teste',
        amount: 1,
      }),
    ).resolves.toEqual(order);
  });

  it('should return all orders', () => {
    const orders = [
      {
        id: 1,
        client: 'Teste',
        amount: 1,
      },
      {
        id: 2,
        client: 'Teste2',
        amount: 2,
      },
    ];
    jest.spyOn(prisma.order, 'findMany').mockResolvedValue(orders);

    expect(service.findAll()).resolves.toEqual(orders);
  });

  it('should return a order if id exists', () => {
    jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(null);

    expect(service.findOne(1)).rejects.toThrow(HttpException);
  });

  it('should return a error if id not exists', () => {
    const order = {
      id: 1,
      client: 'Teste',
      amount: 1,
    };
    jest.spyOn(prisma.order, 'findUnique').mockResolvedValue(order);

    expect(service.findOne(1)).resolves.toEqual(order);
  });
});
