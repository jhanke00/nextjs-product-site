import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/auth/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches a user based on the given user ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *   put:
 *     summary: Update a user by ID
 *     description: Updates the details of a user given their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 updatedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Prisma error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Prisma error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the database by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       400:
 *         description: Prisma error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Prisma error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (user) {
        res.status(200).json({ message: 'User retrieved successfully', user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
  } else if (req.method === 'PUT') {
    const { name, email, role } = req.body;
    const data: { name?: string; email?: string; role?: string } = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (role) data.role = role;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data,
      });
      res.status(200).json({
        message: 'User updated successfully',
        updatedUser: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
      });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ message: `Prisma error: ${error.message}` });
      } else {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({ message: `Prisma error: ${error.message}` });
      } else {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
