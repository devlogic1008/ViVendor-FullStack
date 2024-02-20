-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "rank" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "store_id" TEXT,
    "parent_id" TEXT,
    "title" TEXT,
    "handle" TEXT,
    "vendor" TEXT,
    "product_type" TEXT,
    "tags" TEXT,
    "body_html" TEXT,
    "template_suffix" TEXT,
    "published_scope" TEXT,
    "image" TEXT,
    "images" TEXT,
    "option1" TEXT,
    "option2" TEXT,
    "option3" TEXT,
    "options" TEXT,
    "site_url" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "variant_id" TEXT,
    "parent_variant_id" TEXT,
    "title" TEXT,
    "sku" TEXT,
    "cost" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "compare_at_price" DOUBLE PRECISION,
    "position" INTEGER,
    "inventory_policy" TEXT,
    "fulfillment_service" TEXT,
    "inventory_management" TEXT,
    "option1" TEXT,
    "option2" TEXT,
    "option3" TEXT,
    "taxable" BOOLEAN,
    "barcode" TEXT,
    "weight" DOUBLE PRECISION,
    "weight_unit" TEXT,
    "inventory_item_id" TEXT,
    "inventory_quantity" INTEGER,
    "requires_shipping" BOOLEAN,
    "image_id" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_id_key" ON "Subcategory"("id");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
