import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from './User';
import { Product } from './Product';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  userId: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  orderId: number;

  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
} 