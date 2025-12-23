import express, { Request, Response } from "express";
import { Types } from "mongoose";

import blogModel from "../../Models/Blog/Blog";
import userModel from "../../Models/User/User";

const router = express.Router();


interface AuthRequest extends Request {
  user?: {
    email : user.email,
    _id: Types.ObjectId;
  };
}


router.post("/writeblog", async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }

    const { blogTitle, description,content} = req.body;

    const blog = {
      blogTitle:String,
      description :String,
      content: String,
      user_id:user._id
    };

    await blogModel.insertOne(blog);

    return res.status(200).json({ msg: "blog created" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/allblogs/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const blogs = await blogModel.find({ userId: id });

    return res.status(200).json({ blogs });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.put("/updateblog/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const userInput = req.body;

    await blogModel.updateOne({ _id: id }, { $set: userInput });

    return res.status(200).json({ msg: "blog updated successfully" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});


router.delete("/deleteallblog", async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }

    await blogModel.deleteMany({ userId: user._id });

    return res.status(200).json({ msg: "blogs deleted successfully" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});


router.get(
  "/user-details",
  async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }

      const details = await userModel.findOne(
        { email: user.email },
        { fullName: 1, age: 1, _id: 0 }
      );

      return res.status(200).json({ msg: details });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
);


router.put(
  "/user-update",
  async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }

      const userInput = req.body;

      await userModel.updateOne(
        { email: user.email },
        { $set: userInput },
        { new: true }
      );

      return res.status(200).json({ msg: "user updated successfully" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
);


router.delete(
  "/user-delete",
  async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }

      await userModel.updateOne(
        { email: user.email },
        { $set: { isActive: false } },
        { new: true }
      );

      return res.status(200).json({ msg: "user deleted successfully" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
);

export default router;
