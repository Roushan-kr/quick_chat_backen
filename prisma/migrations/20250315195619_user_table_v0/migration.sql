/*
  Warnings:

  - You are about to drop the column `name` on the `chat_groups` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `provider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_groups" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "updated_at",
ADD COLUMN     "provider" TEXT NOT NULL;
