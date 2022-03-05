import React from "react";
import { GetStaticPropsContext, GetStaticProps } from "next";
import Link from "next/link";

export interface PostListPageProps {
  posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <h1>Post List Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
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
  return {
    props: {
      posts: data.data.map((item: any) => ({ id: item.id, title: item.title })),
    }, // will be passed to the page component as props
  };
};
