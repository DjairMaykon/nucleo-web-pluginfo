import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

const mockedService = {
  create: jest.fn().mockResolvedValue({
    id: 1,
    client: 'teste',
    amount: 1,
  }),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      client: 'teste',
      amount: 1,
    },
    {
      id: 2,
      client: 'teste 2',
      amount: 2,
    },
  ]),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockedService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new order', () => {
    const mockCreateDto = {
      client: 'teste',
      amount: 1,
    };
    expect(controller.create(mockCreateDto)).resolves.toEqual({
      id: 1,
      ...mockCreateDto,
    });
  });

  it('should return all orders', () => {
    expect(controller.findAll()).resolves.toEqual([
      {
        id: 1,
        client: 'teste',
        amount: 1,
      },
      {
        id: 2,
        client: 'teste 2',
        amount: 2,
      },
    ]);
  });
});
