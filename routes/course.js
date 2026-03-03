const courseRouter = Router();
import { userMiddleware } from '../middleware/user.middleware.js'
import { CourseModel } from "../db.js";
import { PurchasesModel } from "../db.js";
import { TokenExpiredError } from 'jsonwebtoken';

courseRouter.post('/purchase', userMiddleware, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await PurchasesModel.create({
        userId,
        courseId,
    });

    res.json({
        message: "You have successfully bought the course"
    })
});

// Don't have to use userMiddleware here, couse everyone can see the courses preview without buying it
courseRouter.get('/preview', async function (req, res) {
    const course = CourseModel.find({});

    res.json({
        message: "all the courses",
        course,
    })
});

export { 
    courseRouter,
    CourseModel
}
