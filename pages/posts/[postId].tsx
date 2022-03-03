import { useRouter } from "next/router";
import React from "react";

export interface PostDetailProps {}

export default function PostDetail(props: PostDetailProps) {
  const router = useRouter();

  return (
    <div>
      <h1>This is detail</h1>
    </div>
  );
}
