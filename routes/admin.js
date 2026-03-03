import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { Router } from 'express';
import { JWT_ADMIN_PASSWORD } from '../config.js';
import { adminModel, courseModel } from '../database/db.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const adminRouter = Router();
const saltRounds = 10;

adminRouter.post('/signup', async function (req, res) {
    const requiredBody = z.object({
        firstName: z.string,
        lastName: z.string,
        email: z.string,
        password: z.string,
    });

    const parseDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parseDataWithSuccess.success) {
        res.json({
            message: "Incorrect format used",
            error: parseDataWithSuccess,
        });
    };

    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);

        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });

        res.json({
            message: "You're signed up in admin page",
        });
    } catch (e) {
        res.json({
            message: "Something went wrong while signing up",
            error: e,
        });
    };
});

adminRouter.post('/signin', async function(req, res) {
    const { email, password } = req.body;

    const response = await adminModel.findOne({
        email: email,
    });

    if (!response) {
        res.json({
            message: "Admin does not exist in our DB!"
        });
    };

    const passwordMatch = bcrypt.compare(password, hashedPassword);

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString(),
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token,
        });
    } else {
        res.json({
            message: "Incorrect credentials",
        })
    }
});

adminRouter.post('/course', adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId,
    });

    res.json({
        message: "Course Created",
        creatorId: course._id,
    });
});

adminRouter.put('/course', adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        courseId: adminId,
    },
    {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
    });

    res.json({
        message: "Course Updated",
        creatorId: course._id,
    });
});

adminRouter.get('/course/bulk', adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const courses = await CourseModel.find({
        courseId: adminId,
    });

    res.json({
        message: "All the Courses",
        creatorId: courses._id,
    })
});

export {
    adminRouter,
}