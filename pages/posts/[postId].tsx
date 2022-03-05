import { useRouter } from "next/router";
import React from "react";
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from "next";

export interface PostDetailProps {
  post: any;
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();

  if (!post) return "khong co data";

  return (
    <div>
      <h1>This is detail</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
      {/* Thằng router.query gọi là path parameter or route parameter */}
      {/* Sau dấu ? ví dụ: abc?id = ... thì gọi là query */}
    </div>
  );
}
// code phần getStaticPaths with typescript
export const getStaticPaths: GetStaticPaths = async () => {
  // fetch tạm như này qua chương 3 code modules sau
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    paths: data.data.map((item: any) => ({ params: { postId: item.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };
  // Get theserver-side
  // build-time
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await response.json();
  return {
    props: {
      post: data,
    }, // will be passed to the page component as props
  };
};
//
