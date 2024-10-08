import { mockPostList } from "@/mockdata/mockpost";
import { PostInfo } from "@/models/postInfo";

export const fetchPostList = async (): Promise<PostInfo[]> => {
  try {
    // const response = await fetch(`/api/posts`); // Replace with your actual API endpoint

    // if (!response.ok) {
    //   throw new Error("Failed to fetch user info");
    // }

    // const data: PostInfo = await response.json();
    // return data;
    const dummydata: PostInfo[] = mockPostList;
    return dummydata;
  } catch (error: any) {
    throw new Error(`Error fetching Post List: ${error.message}`);
  }
};

export const fetchPostInfo = async (postId: string): Promise<PostInfo> => {
  try {
    // const response = await fetch(`/api/posts/${postId}`); // Replace with your actual API endpoint

    // if (!response.ok) {
    //   throw new Error("Failed to fetch user info");
    // }

    // const data: PostInfo = await response.json();
    // return data;

    const dummydata: PostInfo = mockPostList.find(
      (p) => p.id === postId
    ) as PostInfo;
    return dummydata;
  } catch (error: any) {
    throw new Error(`Error fetching Post info: ${error.message}`);
  }
};
