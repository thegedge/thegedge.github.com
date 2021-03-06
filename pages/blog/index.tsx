import { GetStaticProps } from "next";
import React from "react";
import { PostList } from "../../lib/components/PostList";
import { Layout } from "../../lib/layouts/Layout";
import allPosts, { PostData } from "../../lib/posts";

export default function Blog(props: { posts: PostData[] }) {
  return (
    <Layout description="Jason Gedge's blog index" title="Blog">
      <PostList posts={props.posts} />
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps = async (_context) => {
  const posts = await allPosts();
  return { props: { posts } };
};
