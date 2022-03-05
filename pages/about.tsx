import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import posts from "./posts";
import { useRouter } from "next/router";

// Không muốn thằng này render ở server vì lí do nào đó chỉ render ở client thôi dùng dyamic*/
// https://nextjs.org/docs/routing/dynamic-routes
const Header = dynamic(() => import("@/components/common/header"), {
  ssr: false, // false để tắt phái server còn chạy 2 bên thì bỏ thằng này
});

export interface AboutProps {}

export default function About(props: AboutProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();

  // chuyển page goi api
  const page = Number(router.query?.page) || 1;
  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();
      setPostList(data.data); // cái này demo vào dự án dùng useSWR để code
    })();
  }, [page]);
  // hàm nút chuyển page
  function handleChangePage() {
    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
      // chỉ thay đổi bên phía client thôi tắt thằng này thì sẽ gọi lại hàm getStaticProps() phía dưới
      // https://nextjs.org/docs/routing/shallow-routing
    );
  }
  return (
    <div>
      <h1>This is About</h1>

      <Header />
      <ul className="posts-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleChangePage}>Click chuyển page</button>
    </div>
  );
}

export async function getStaticProps() {
  console.log("🚀 ~ getStaticProps ~ getStaticProps");

  return {
    props: {},
  };
}

// bật thằng này là serverside rendering
// export async function getServerProps() {
//   return {
//     props: {},
//   };
// }
