-- CreateTable
CREATE TABLE "dumps" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(254) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dumps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reads" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dump_id" TEXT NOT NULL,

    CONSTRAINT "reads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dumps_name_key" ON "dumps"("name");

-- AddForeignKey
ALTER TABLE "reads" ADD CONSTRAINT "reads_dump_id_fkey" FOREIGN KEY ("dump_id") REFERENCES "dumps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
