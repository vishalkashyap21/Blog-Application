import { handleError } from "../helper/handleError.js";

import BlogLike from "../models/bloglike.model.js";

export const doLike = async (req, res, next) => {
    try {
        const { user, blogid } = req.body;

        if (!user || !blogid) {
            return res.status(400).json({ message: "Missing user or blogid" });
        }

        let like = await BlogLike.findOne({ user, blogid });

        if (!like) {
            like = await new BlogLike({ user, blogid }).save();
        } else {
            await BlogLike.findByIdAndDelete(like._id);
        }

        const likecount = await BlogLike.countDocuments({ blogid });

        res.status(200).json({ likecount });
    } catch (error) {
        console.error("doLike error:", error);
        next(handleError(500, error.message));
    }
};




export const likeCount = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const { userid } = req.query;

        const likecount = await BlogLike.countDocuments({ blogid });

        let isUserliked = false;
        if (userid) {
            const getuserlike = await BlogLike.countDocuments({ blogid, user: userid });
            if (getuserlike > 0) {
                isUserliked = true;
            }
        }

        res.status(200).json({
            likecount,
            isUserliked
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
