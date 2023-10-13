import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { searchText } = await req.json();

    try {
        await connectToDB();

        const users = await User.find({ username: { $regex: '.*' + searchText + '.*' } });
        const userIds = users.map(user => user._id);

        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: '.*' + searchText + '.*' } },
                { tag: { $regex: '.*' + searchText + '.*' } },
                { creator: { $in: userIds } }
            ]
        }).populate('creator');

        return new Response(JSON.stringify(prompts, { status: 200 }));
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompt", { status: 500 })
    }
}