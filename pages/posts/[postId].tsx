import { useRouter } from "next/router";
import React from "react";

export interface PostDetailProps {}

export default function PostDetail(props: PostDetailProps) {
  const router = useRouter();

  return (
    <div>
      <h1>This is detail</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
      {/* Thằng router.query gọi là path parameter or route parameter */}
      {/* Sau dấu ? ví dụ: abc?id = ... thì gọi là query */}
    </div>
  );
}
