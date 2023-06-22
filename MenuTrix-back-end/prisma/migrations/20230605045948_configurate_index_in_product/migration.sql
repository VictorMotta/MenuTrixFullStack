-- CreateIndex
CREATE INDEX "additional_name_isAvailable_idx" ON "additional"("name", "isAvailable");

-- CreateIndex
CREATE INDEX "product_name_photoProduct_price_isAvailable_hasMeatPoint_idx" ON "product"("name", "photoProduct", "price", "isAvailable", "hasMeatPoint");
