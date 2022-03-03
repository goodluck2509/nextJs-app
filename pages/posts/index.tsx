import React from "react";
import { GetStaticPropsContext, GetStaticProps } from "next";

export interface PostListPageProps {}

export default function PostListPage(props: PostListPageProps) {
  return <div>Post List Page</div>;
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // Get theserver-side
  // build-time
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();
  console.log("🚀 ~ data", data);
  return {
    props: {
      posts: [],
    }, // will be passed to the page component as props
  };
};
