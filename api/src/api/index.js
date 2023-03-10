import { Router } from 'express';
import { deleteOrderItemsHandler, fetchOrderItemsHandler, updateSellerAccountHandler } from './controller';
import { authenticate } from '../middleware';

const router = Router();

router.get("/order_items", fetchOrderItemsHandler);

router.put("/account", [authenticate], updateSellerAccountHandler);

router.delete("/order_items/:id", [authenticate], deleteOrderItemsHandler);

export default router;
