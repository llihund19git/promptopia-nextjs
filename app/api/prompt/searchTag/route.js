import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { tag } = await req.json();

    try {
        await connectToDB();

        const prompts = await Prompt.find({ tag }).populate('creator');

        return new Response(JSON.stringify(prompts, { status: 200 }));
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompt", { status: 500 })
    }
}