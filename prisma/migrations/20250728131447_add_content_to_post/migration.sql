-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
